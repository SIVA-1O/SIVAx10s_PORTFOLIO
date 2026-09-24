/**
 * SIVASURIYA PORTFOLIO - MOTION BACKGROUND ENGINE (NATIVE MP4 EDITION)
 * 
 * Hardware-accelerated, native HTML5 video motion background system.
 * Zero manual frame downloads, zero decode queues, instant progressive startup.
 * 
 * Performance & Architecture:
 * - Native HTML5 <video> element connected to assets/background/BACKGROUND.mp4
 * - Browser-native media pipeline (compositor thread, hardware H.264 decoding)
 * - Autoplay, muted, loop, playsinline, pointer-events: none, object-fit: cover
 * - Zero JS CPU work during standard background playback
 * - Tab visibility management (pauses in background tab, resumes seamlessly)
 * - Accessibility: prefers-reduced-motion stops animation and shows stable frame
 * - Connect Button Texture: On-demand offscreen canvas sampling ONLY when the
 *   hero Connect CTA is visible in the viewport and active. Zero permanent loop.
 * - Error fallback: Graceful fallback to static portfolio background with clear diagnostic log.
 */

export class MotionBackgroundPlayer {
  constructor(elementId = 'bg-video') {
    // 1. Locate existing or mount new background video element
    this.video = document.getElementById(elementId);
    if (!this.video || !(this.video instanceof HTMLVideoElement)) {
      this.video = document.getElementById('bg-video');
    }
    if (!this.video || !(this.video instanceof HTMLVideoElement)) {
      this.video = document.createElement('video');
      this.video.id = 'bg-video';
      this.video.className = 'bg-video';
      this.video.setAttribute('aria-hidden', 'true');
      this.video.tabIndex = -1;
      document.body.prepend(this.video);
    }

    // 2. Strict media configuration for seamless silent background playback
    this.video.muted = true;
    this.video.defaultMuted = true;
    this.video.playsInline = true;
    this.video.loop = true;
    this.video.autoplay = true;
    this.video.preload = 'auto';

    const currentSource = this.video.querySelector('source');
    if (!this.video.src && !currentSource) {
      this.video.src = 'assets/background/BACKGROUND.mp4';
    }

    // 3. State & Configuration
    this.totalFrames = 300;
    this.targetFPS = 30;
    this.wasPlayingBeforeHide = true;
    this.prefersReducedMotion = false;
    this.isSamplingActive = false;
    this.samplingRafId = null;
    this.frameObservers = [];

    // 4. Reusable Offscreen Canvas for synchronized Connect CTA button texture
    this.offscreenCanvas = document.createElement('canvas');
    this.offscreenCanvas.width = 640;
    this.offscreenCanvas.height = 360;
    this.offscreenCtx = this.offscreenCanvas.getContext('2d', { willReadFrequently: false });
    // Compatibility properties for observers expecting image-like dimensions
    Object.defineProperty(this.offscreenCanvas, 'naturalWidth', { get: () => this.offscreenCanvas.width });
    Object.defineProperty(this.offscreenCanvas, 'naturalHeight', { get: () => this.offscreenCanvas.height });

    this.init();
    this.exposeDebugInstrumentation();
  }

  get isPlaying() {
    return !!(this.video && !this.video.paused && !this.video.ended && this.video.readyState > 2);
  }

  get currentIndex() {
    if (!this.video || isNaN(this.video.currentTime)) return 0;
    return Math.floor(this.video.currentTime * this.targetFPS) % this.totalFrames;
  }

  getVideoElement() {
    return this.video;
  }

  init() {
    // Check initial reduced motion preference
    const motionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.prefersReducedMotion = motionMedia.matches;

    // Error handling: ensure graceful fallback if video fails to load
    this.video.addEventListener('error', (err) => {
      console.warn('[MotionBackground] BACKGROUND.mp4 playback encountered an issue; maintaining static background presentation.', err);
      this.video.style.display = 'none';
      this.stopConnectSampling();
    });

    // Start video playback immediately if motion is allowed
    if (!this.prefersReducedMotion) {
      this.playVideoSafe();
    } else {
      this.video.pause();
    }

    // Handle tab visibility changes (pause to save battery & GPU, resume seamlessly)
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.wasPlayingBeforeHide = !this.video.paused;
        this.video.pause();
        this.pauseSamplingLoop();
      } else {
        if (this.wasPlayingBeforeHide && !this.prefersReducedMotion) {
          this.playVideoSafe();
          if (this.isSamplingActive) {
            this.resumeSamplingLoop();
          }
        }
      }
    });

    // Listen for OS reduced motion toggle
    if (motionMedia && motionMedia.addEventListener) {
      motionMedia.addEventListener('change', (e) => {
        this.prefersReducedMotion = e.matches;
        if (this.prefersReducedMotion) {
          this.video.pause();
          this.pauseSamplingLoop();
        } else {
          this.playVideoSafe();
          if (this.isSamplingActive) {
            this.resumeSamplingLoop();
          }
        }
      });
    }

    // When first frame is decoded, notify observers once so Connect button has texture immediately
    const onFirstFrame = () => {
      this.sampleSingleFrame();
    };
    if (this.video.readyState >= 2) {
      onFirstFrame();
    } else {
      this.video.addEventListener('loadeddata', onFirstFrame, { once: true });
    }
  }

  playVideoSafe() {
    if (!this.video) return;
    this.video.muted = true;
    const playPromise = this.video.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        // Autoplay policy or user gesture delay
        console.warn('[MotionBackground] Video autoplay note:', err?.message || err);
      });
    }
  }

  start() {
    if (this.prefersReducedMotion) return;
    this.playVideoSafe();
    if (this.isSamplingActive) {
      this.resumeSamplingLoop();
    }
  }

  stop() {
    if (this.video) {
      this.video.pause();
    }
    this.pauseSamplingLoop();
  }

  /**
   * Sample the currently playing video frame into the reusable offscreen canvas
   * and notify registered observers.
   */
  sampleSingleFrame() {
    if (!this.video || this.video.readyState < 2) return;
    const vw = this.video.videoWidth || 1280;
    const vh = this.video.videoHeight || 720;
    if (vw === 0 || vh === 0) return;

    try {
      this.offscreenCtx.drawImage(this.video, 0, 0, this.offscreenCanvas.width, this.offscreenCanvas.height);
      const frameIdx = this.currentIndex;
      for (let i = 0; i < this.frameObservers.length; i++) {
        try {
          this.frameObservers[i](this.offscreenCanvas, frameIdx);
        } catch (e) {
          // Safeguard observer errors
        }
      }
    } catch (e) {
      // Catch possible security or readyState exception
    }
  }

  /**
   * Register a frame observer callback (used by hero Connect button motion texture).
   * Backwards-compatible signature: callback(sourceElement, frameIndex).
   */
  registerFrameObserver(callback) {
    if (typeof callback === 'function') {
      this.frameObservers.push(callback);
      // Immediately notify with initial frame if video is ready
      if (this.video && this.video.readyState >= 2) {
        this.sampleSingleFrame();
      }
    }
    return () => {
      this.frameObservers = this.frameObservers.filter(cb => cb !== callback);
    };
  }

  /**
   * Lifecycle control for Connect CTA button sampling:
   * Only samples when active (button visible on screen, tab visible, not hovered, not reduced motion).
   * Stops immediately when interaction ends. Zero permanent canvas-copy loop.
   */
  setSamplingActive(isActive) {
    if (this.isSamplingActive === !!isActive) return;
    this.isSamplingActive = !!isActive;

    if (this.isSamplingActive && !document.hidden && !this.prefersReducedMotion) {
      this.resumeSamplingLoop();
    } else {
      this.pauseSamplingLoop();
    }
  }

  resumeSamplingLoop() {
    if (this.samplingRafId) return;

    const sampleTick = () => {
      if (!this.isSamplingActive || document.hidden || this.prefersReducedMotion) {
        this.samplingRafId = null;
        return;
      }

      this.sampleSingleFrame();

      // Continue sampling while active
      if (typeof this.video.requestVideoFrameCallback === 'function') {
        this.samplingRafId = this.video.requestVideoFrameCallback(sampleTick);
      } else {
        this.samplingRafId = requestAnimationFrame(sampleTick);
      }
    };

    if (typeof this.video.requestVideoFrameCallback === 'function') {
      this.samplingRafId = this.video.requestVideoFrameCallback(sampleTick);
    } else {
      this.samplingRafId = requestAnimationFrame(sampleTick);
    }
  }

  pauseSamplingLoop() {
    if (this.samplingRafId) {
      if (typeof this.video.cancelVideoFrameCallback === 'function') {
        try {
          this.video.cancelVideoFrameCallback(this.samplingRafId);
        } catch (e) {}
      }
      cancelAnimationFrame(this.samplingRafId);
      this.samplingRafId = null;
    }
  }

  exposeDebugInstrumentation() {
    window.motionBgDebug = {
      getCurrentIndex: () => this.currentIndex,
      isPlaying: () => this.isPlaying,
      getFPS: () => this.targetFPS,
      getVideo: () => this.video,
      isSampling: () => !!(this.isSamplingActive && this.samplingRafId),
      getPlayer: () => this
    };
  }
}
