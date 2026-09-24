/**
 * SIVASURIYA PORTFOLIO - MOTIOn BACKGROUND ENGINE
 * High-performance 300 frame animation canvas system
 * Native requestAnimationFrame, progressive streaming, cover scaling, zero flash.
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
    this.targetFPS = isMobile ? 20 : 30;
    this.frameDuration = 1000 / this.targetFPS;

    this.frames = new Array(this.totalFrames).fill(null);
    this.loadedFrames = new Set();
    this.currentIndex = 0;
    this.lastRenderTime = 0;
    this.isPlaying = false;
    this.animId = null;
    this.lastDrawnImage = null;
    this.frameExt = 'webp'; // Default to fast WebP, fallback to PNG

    this.nativeWidth = 1280;
    this.nativeHeight = 720;
    this.prefersReducedMotion = false; // Core portfolio brand signature; always active

    this.batchSize = 6;
    this.nextLoadIndex = 0;
    this.activeLoads = 0;
    this.maxConcurrentLoads = 6;
    this.windowBufferSize = isMobile ? 20 : 35; // Controlled lookahead buffer to conserve RAM

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

    // Step 1: Preload frame 0 immediately for zero-flash initial render
    this.preloadInitialFrame();
  }

  exposeDebugInstrumentation() {
    window.motionBgDebug = {
      getCurrentIndex: () => this.currentIndex,
      getLoadedCount: () => this.loadedFrames.size,
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

  preloadInitialFrame() {
    const img = new Image();
    const tryLoad = (ext) => {
      img.src = this.getFrameUrl(0, ext);
      const onLoad = () => {
        this.frameExt = ext;
        this.frames[0] = img;
        this.loadedFrames.add(0);
        this.drawFrame(img);
        this.startStreaming();
        this.start();
      };

      if (img.decode) {
        img.decode().then(onLoad).catch(() => {
          if (ext === 'webp') {
            tryLoad('png');
          } else {
            img.onload = onLoad;
          }
        });
      } else {
        img.onload = onLoad;
        img.onerror = () => {
          if (ext === 'webp') {
            tryLoad('png');
          }
        };
      }
    };

    tryLoad('webp');
  }

  startStreaming() {
    // Preload an initial buffer of frames before playing
    this.loadBatch(() => {
      // Start motion as soon as initial frames arrive for instant responsiveness
      if (this.loadedFrames.size >= 2 && !this.isPlaying && !this.prefersReducedMotion) {
        this.start();
      }
      this.pumpQueue();
    });

    // Fallback timer: ensure animation starts without stalling on slower networks
    setTimeout(() => {
      if (!this.isPlaying && !this.prefersReducedMotion && this.loadedFrames.size >= 1) {
        this.start();
      }
    }, 150);
  }

  loadBatch(onLoadedCallback) {
    const initialBatchEnd = Math.min(this.windowBufferSize, this.totalFrames);
    for (let i = 1; i < initialBatchEnd; i++) {
      this.queueLoad(i, onLoadedCallback);
    }
    this.nextLoadIndex = initialBatchEnd;
  }

  pumpQueue() {
    // Only queue up to current position + lookahead window to avoid loading all 300 frames into RAM
    const targetEnd = Math.min(this.currentIndex + this.windowBufferSize, this.totalFrames);
    if (this.nextLoadIndex < targetEnd && this.activeLoads < this.maxConcurrentLoads) {
      const idx = this.nextLoadIndex++;
      this.queueLoad(idx, () => this.pumpQueue());
    }

    // Wrap around for seamless looping
    if (this.currentIndex > this.totalFrames - this.windowBufferSize && this.nextLoadIndex >= this.totalFrames) {
      this.nextLoadIndex = 0;
    }
  }

  queueLoad(index, onComplete) {
    if (this.frames[index]) {
      if (onComplete) onComplete();
      return;
    }
    this.activeLoads++;

    const img = new Image();
    const ext = this.frameExt || 'webp';
    img.src = this.getFrameUrl(index, ext);

    const finish = () => {
      this.frames[index] = img;
      this.loadedFrames.add(index);
      this.activeLoads--;
      if (onComplete) onComplete();
    };

    if (img.decode) {
      img.decode().then(finish).catch(() => {
        if (ext === 'webp') {
          img.src = this.getFrameUrl(index, 'png');
          img.onload = finish;
          img.onerror = finish;
        } else {
          finish();
        }
      });
    } else {
      img.onload = finish;
      img.onerror = () => {
        if (ext === 'webp') {
          img.src = this.getFrameUrl(index, 'png');
          img.onload = finish;
          img.onerror = finish;
        } else {
          finish();
        }
      };
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

      // Advance frame index
      this.currentIndex = (this.currentIndex + 1) % this.totalFrames;

      const currentImg = this.frames[this.currentIndex];
      if (currentImg && currentImg.complete && currentImg.naturalWidth > 0) {
        this.drawFrame(currentImg);
      }

      // Memory-conscious lookahead queue pumping
      this.pumpQueue();
    }

    this.animId = requestAnimationFrame((ts) => this.loop(ts));
  }
}
