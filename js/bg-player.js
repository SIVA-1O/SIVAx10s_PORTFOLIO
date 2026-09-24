/**
 * SIVASURIYA PORTFOLIO - MOTION BACKGROUND ENGINE
 * High-performance 300 frame animation canvas system.
 * Native requestAnimationFrame, progressive streaming, cover scaling, zero flash.
 * 
 * Optimized Startup & Memory Strategy:
 * - Frame 00001 preloaded & displayed first for instant first visual paint
 * - Small initial nearby lookahead (4–6 frames)
 * - Concurrency tuned for fast progressive streaming
 * - Animation advances strictly when the next frame is ready (zero skipping, zero desync)
 * - Direct WebP utilization (all 300 frames exist as ~60KB WebP) without redundant PNG 404s
 * - Rolling memory buffer around current frame prevents memory buildup while ensuring zero stutter
 */

export class MotionBackgroundPlayer {
  constructor(canvasId = 'bg-canvas') {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) {
      this.canvas = document.createElement('canvas');
      this.canvas.id = canvasId;
      document.body.prepend(this.canvas);
    }

    this.ctx = this.canvas.getContext('2d');
    this.totalFrames = 300;

    // Performance tuning: 30 FPS on desktop, 20 FPS on mobile / touch devices
    const isMobile = window.innerWidth < 768 || (navigator.maxTouchPoints && navigator.maxTouchPoints > 1);
    this.isMobile = isMobile;
    this.targetFPS = isMobile ? 20 : 30;
    this.frameDuration = 1000 / this.targetFPS;

    this.frames = new Array(this.totalFrames).fill(null);
    this.loadedFrames = new Set();
    this.loadingFrames = new Set();
    this.currentIndex = 0;
    this.lastRenderTime = 0;
    this.isPlaying = false;
    this.animId = null;
    this.lastDrawnImage = null;
    this.frameExt = 'webp'; // Primary high-efficiency format

    this.nativeWidth = 1280;
    this.nativeHeight = 720;
    this.prefersReducedMotion = false;

    // Controlled progressive streaming & conservative rolling buffer
    this.maxConcurrentLoads = isMobile ? 4 : 6; // Standard HTTP/2 browser concurrency for streaming
    this.initialLookahead = 6; // Load 6 nearby frames initially (indices 1 to 6)
    this.lookaheadBufferSize = isMobile ? 18 : 28; // Rolling lookahead window during playback
    this.lookbackBufferSize = isMobile ? 20 : 30; // Rolling lookback window behind playback
    this.minFramesToStart = 3; // Start motion as soon as 3 frames are ready
    this.maxRetainedFrames = isMobile ? 45 : 70; // Sensible memory ceiling: flat RAM, zero stutter

    this.frameObservers = [];
    this.init();
    this.exposeDebugInstrumentation();
  }

  getFrameUrl(index, ext = this.frameExt) {
    const frameNum = String(index + 1).padStart(5, '0');
    return `assets/background/motion/${frameNum}.${ext}`;
  }

  init() {
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas(), { passive: true });
    window.addEventListener('orientationchange', () => setTimeout(() => this.resizeCanvas(), 100), { passive: true });

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.resizeCanvas(), { once: true });
    }
    window.addEventListener('load', () => this.resizeCanvas(), { once: true });

    // Handle tab visibility to conserve battery & GPU
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.stop();
      } else if (!this.prefersReducedMotion) {
        this.start();
      }
    });

    // Listen for reduced motion preference changes
    const motionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionMedia && motionMedia.addEventListener) {
      motionMedia.addEventListener('change', (e) => {
        this.prefersReducedMotion = e.matches;
        if (this.prefersReducedMotion) {
          this.stop();
        } else {
          this.start();
        }
      });
    }

    // Step 1: Preload frame 0 immediately for instant zero-flash initial render
    this.preloadInitialFrame();
  }

  exposeDebugInstrumentation() {
    window.motionBgDebug = {
      getCurrentIndex: () => this.currentIndex,
      getLoadedCount: () => this.loadedFrames.size,
      getLoadingCount: () => this.loadingFrames.size,
      isPlaying: () => this.isPlaying,
      getFPS: () => this.targetFPS,
      getCanvasSize: () => ({ width: this.canvas.width, height: this.canvas.height }),
      getPlayer: () => this
    };
  }

  resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const w = window.innerWidth || document.documentElement.clientWidth || 1280;
    const h = window.innerHeight || document.documentElement.clientHeight || 720;

    const targetW = Math.round(w * dpr);
    const targetH = Math.round(h * dpr);

    if (this.canvas.width !== targetW || this.canvas.height !== targetH) {
      this.canvas.width = targetW;
      this.canvas.height = targetH;
    }

    if (this.lastDrawnImage) {
      this.drawFrame(this.lastDrawnImage);
    } else if (this.frames[this.currentIndex]) {
      this.drawFrame(this.frames[this.currentIndex]);
    } else if (this.frames[0]) {
      this.drawFrame(this.frames[0]);
    }
  }

  /**
   * Load frame 00001 first. Once decoded, render immediately so the hero
   * and background are visually ready with zero flash and zero wait.
   */
  preloadInitialFrame() {
    const img = new Image();
    img.decoding = 'async';

    const tryLoad = (ext) => {
      img.src = this.getFrameUrl(0, ext);

      const onLoad = () => {
        this.frameExt = ext;
        this.frames[0] = img;
        this.loadedFrames.add(0);
        this.drawFrame(img);

        // Step 2: Once frame 00001 is displayed, progressively buffer next few frames
        this.startStreaming();
      };

      img.onload = () => {
        if (img.decode) {
          img.decode().then(onLoad).catch(onLoad);
        } else {
          onLoad();
        }
      };

      img.onerror = () => {
        if (ext === 'webp') {
          tryLoad('png');
        }
      };
    };

    tryLoad('webp');
  }

  /**
   * Start streaming nearby frames progressively with initial lookahead
   */
  startStreaming() {
    this.pumpQueue(this.initialLookahead);
  }

  /**
   * Controlled lookahead queue pumping.
   * Loads missing frames sequentially ahead of currentIndex up to lookahead window.
   */
  pumpQueue(customLookahead) {
    const lookahead = customLookahead || this.lookaheadBufferSize;

    for (let i = 1; i <= lookahead; i++) {
      if (this.loadingFrames.size >= this.maxConcurrentLoads) {
        break;
      }

      const targetIdx = (this.currentIndex + i) % this.totalFrames;

      if (!this.frames[targetIdx] && !this.loadingFrames.has(targetIdx)) {
        this.queueLoad(targetIdx, () => {
          // If enough frames loaded, start animation
          if (!this.isPlaying && !this.prefersReducedMotion && this.loadedFrames.size >= this.minFramesToStart) {
            this.start();
          }
          this.pumpQueue();
        });
      }
    }
  }

  queueLoad(index, onComplete) {
    if (this.frames[index]) {
      if (onComplete) onComplete();
      return;
    }
    if (this.loadingFrames.has(index)) {
      return;
    }
    if (this.loadingFrames.size >= this.maxConcurrentLoads) {
      return;
    }

    this.loadingFrames.add(index);

    const img = new Image();
    img.decoding = 'async';
    const ext = this.frameExt || 'webp';
    img.src = this.getFrameUrl(index, ext);

    const finish = () => {
      this.frames[index] = img;
      this.loadedFrames.add(index);
      this.loadingFrames.delete(index);
      if (onComplete) onComplete();
    };

    img.onload = () => {
      if (img.decode) {
        img.decode().then(finish).catch(finish);
      } else {
        finish();
      }
    };

    img.onerror = () => {
      if (ext === 'webp') {
        const fallbackImg = new Image();
        fallbackImg.decoding = 'async';
        fallbackImg.src = this.getFrameUrl(index, 'png');

        fallbackImg.onload = () => {
          this.frames[index] = fallbackImg;
          this.loadedFrames.add(index);
          this.loadingFrames.delete(index);
          if (onComplete) onComplete();
        };

        fallbackImg.onerror = () => {
          this.loadingFrames.delete(index);
          if (onComplete) onComplete();
        };
      } else {
        this.loadingFrames.delete(index);
        if (onComplete) onComplete();
      }
    };
  }

  /**
   * Conservative rolling buffer memory management:
   * Keeps frames in active lookahead & lookback window to prevent RAM accumulation,
   * without aggressive unloading that could cause stuttering or repeated downloads.
   */
  manageMemory() {
    if (this.loadedFrames.size <= this.maxRetainedFrames) {
      return;
    }

    const lookback = this.lookbackBufferSize;
    const lookahead = this.lookaheadBufferSize + 4;

    for (const idx of this.loadedFrames) {
      // Always keep frame 0 as safe visual reference
      if (idx === 0) continue;

      // Calculate cyclic distance from currentIndex
      const distForward = (idx - this.currentIndex + this.totalFrames) % this.totalFrames;
      const distBackward = (this.currentIndex - idx + this.totalFrames) % this.totalFrames;

      // Evict if outside active lookahead/lookback corridor
      if (distForward > lookahead && distBackward > lookback) {
        this.frames[idx] = null;
        this.loadedFrames.delete(idx);

        if (this.loadedFrames.size <= this.maxRetainedFrames) {
          break;
        }
      }
    }
  }

  registerFrameObserver(callback) {
    if (typeof callback === 'function') {
      this.frameObservers.push(callback);
      if (this.lastDrawnImage) {
        try {
          callback(this.lastDrawnImage, this.currentIndex);
        } catch (e) {
          // Guard against initial observer errors
        }
      }
    }
    return () => {
      this.frameObservers = this.frameObservers.filter(cb => cb !== callback);
    };
  }

  drawFrame(img) {
    if (!img) return;
    const cw = this.canvas.width;
    const ch = this.canvas.height;
    if (cw === 0 || ch === 0) return;

    const nw = img.naturalWidth || this.nativeWidth;
    const nh = img.naturalHeight || this.nativeHeight;
    if (nw === 0 || nh === 0) return;

    // Cover algorithm: preserve aspect ratio, fill entire viewport
    const scale = Math.max(cw / nw, ch / nh);
    const sw = nw * scale;
    const sh = nh * scale;
    const dx = (cw - sw) / 2;
    const dy = (ch - sh) / 2;

    this.ctx.drawImage(img, dx, dy, sw, sh);
    this.lastDrawnImage = img;

    // Notify registered frame observers (e.g. hero connect button motion canvas)
    if (this.frameObservers && this.frameObservers.length > 0) {
      for (let i = 0; i < this.frameObservers.length; i++) {
        try {
          this.frameObservers[i](img, this.currentIndex);
        } catch (err) {
          // Fail-safe: prevent any observer error from affecting background loop
        }
      }
    }
  }

  start() {
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.lastRenderTime = performance.now();
    this.animId = requestAnimationFrame((ts) => this.loop(ts));
  }

  stop() {
    this.isPlaying = false;
    if (this.animId) {
      cancelAnimationFrame(this.animId);
      this.animId = null;
    }
  }

  loop(timestamp) {
    if (!this.isPlaying) return;

    const elapsed = timestamp - this.lastRenderTime;

    if (elapsed >= this.frameDuration) {
      this.lastRenderTime = timestamp - (elapsed % this.frameDuration);

      // Only advance frame index if the next frame is loaded and complete
      const nextIndex = (this.currentIndex + 1) % this.totalFrames;
      const nextImg = this.frames[nextIndex];

      if (nextImg && nextImg.complete && nextImg.naturalWidth > 0) {
        this.currentIndex = nextIndex;
        this.drawFrame(nextImg);
      }

      // Maintain sensible memory footprint and stream upcoming frames
      this.manageMemory();
      this.pumpQueue();
    }

    this.animId = requestAnimationFrame((ts) => this.loop(ts));
  }
}
