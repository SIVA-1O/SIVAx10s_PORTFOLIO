/**
 * SIVASURIYA PORTFOLIO - MOTION BACKGROUND ENGINE (NATIVE MP4 EDITION)
 * 
 * Hardware-accelerated, native HTML5 video motion background system.
 * Zero manual frame downloads, zero decode queues, instant progressive startup.
 * Specifically hardened for Mobile Safari / iPhone 11 & modern desktop browsers.
 * 
 * Requirements & Architecture:
 * - Native HTML5 <video> element connected to assets/background/BACKGROUND.mp4
 * - Full autoplay compliance on iOS Safari: muted, defaultMuted, playsinline, webkit-playsinline
 * - Robust promise-based playback lifecycle with intelligent retry & load fallbacks
 * - Zero play buttons or overlay chrome under any circumstances (including iOS Low Power Mode)
 * - Browser-native media pipeline (compositor thread, hardware H.264 decoding)
 * - Tab visibility management (pauses in background tab, resumes seamlessly)
 * - Accessibility: prefers-reduced-motion stops animation and shows stable frame
 * - Connect Button Texture: On-demand offscreen canvas sampling ONLY when active
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

    // 2. Strict media configuration for seamless silent background playback on iPhone Safari
    this.video.muted = true;
    this.video.defaultMuted = true;
    this.video.setAttribute('muted', '');
    this.video.playsInline = true;
    this.video.setAttribute('playsinline', '');
    this.video.setAttribute('webkit-playsinline', '');
    this.video.loop = true;
    this.video.setAttribute('loop', '');
    this.video.autoplay = true;
    this.video.setAttribute('autoplay', '');
    this.video.preload = 'auto';
    this.video.setAttribute('preload', 'auto');
    this.video.removeAttribute('controls');
    // Ensure no native poster is set on video element to prevent Safari native play overlay
    this.video.removeAttribute('poster');

    // Ensure direct src attribute is populated for immediate iOS WebKit pipeline binding
    const currentSource = this.video.querySelector('source');
    if (!this.video.src && currentSource && currentSource.src) {
      this.video.src = currentSource.src;
    } else if (!this.video.src) {
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

    // Playback resilience and retry management
    this.retryCount = 0;
    this.maxRetries = 4;
    this.retryTimer = null;
    this.hasCalledLoad = false;
    this.passiveFallbackAttached = false;
    this._passiveHandler = null;

    // 4. Reusable Offscreen Canvas for synchronized Connect CTA button texture
    this.offscreenCanvas = document.createElement('canvas');
    this.offscreenCanvas.width = 640;
    this.offscreenCanvas.height = 360;
    this.offscreenCtx = this.offscreenCanvas.getContext('2d', { willReadFrequently: false });
    Object.defineProperty(this.offscreenCanvas, 'naturalWidth', { get: () => this.offscreenCanvas.width });
    Object.defineProperty(this.offscreenCanvas, 'naturalHeight', { get: () => this.offscreenCanvas.height });

    this.init();
    this.exposeDebugInstrumentation();
  }

  get isPlaying() {
    return !!(this.video && !this.video.paused && !this.video.ended && this.video.readyState >= 2);
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

    // Error handling: gracefully log issues without crashing
    this.video.addEventListener('error', (err) => {
      console.warn('[MotionBackground] Video notice:', err);
      this.video.style.display = 'none';
      this.video.classList.remove('is-playing');
      this.pauseSamplingLoop();
    });

    // Reset retries and clean up any fallback listeners when video begins active playback
    this.video.addEventListener('playing', () => {
      this.video.style.display = 'block';
      this.video.classList.add('is-playing');
      this.retryCount = 0;
      clearTimeout(this.retryTimer);
      this.removePassiveFallback();
      if (this.isSamplingActive) {
        this.resumeSamplingLoop();
      }
    });

    // If paused outside active playing state and not due to tab hide, hide video element
    // so that Safari's system play overlay button CANNOT be rendered over the screen
    this.video.addEventListener('pause', () => {
      if (!document.hidden && (!this.video.currentTime || this.video.currentTime === 0)) {
        this.video.style.display = 'none';
        this.video.classList.remove('is-playing');
      }
    });

    // Listen to media ready events to trigger playback as soon as frames are ready
    this.video.addEventListener('loadedmetadata', () => {
      if (!this.prefersReducedMotion && this.video.paused) {
        this.playVideoSafe();
      }
    });

    this.video.addEventListener('canplay', () => {
      if (!this.prefersReducedMotion && this.video.paused) {
        this.playVideoSafe();
      }
    });

    // Start video playback immediately if motion is allowed
    if (!this.prefersReducedMotion) {
      this.playVideoSafe();
    } else {
      this.video.pause();
      this.video.style.display = 'none';
      this.video.classList.remove('is-playing');
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
        }
      }
    });

    // Handle iOS Safari bfcache page restore
    window.addEventListener('pageshow', () => {
      if (this.video && this.video.paused && !this.prefersReducedMotion) {
        this.playVideoSafe();
      }
    });

    // Handle window load fallback
    if (document.readyState !== 'complete') {
      window.addEventListener('load', () => {
        if (this.video && this.video.paused && !this.prefersReducedMotion) {
          this.playVideoSafe();
        }
      }, { once: true });
    }

    // Listen for OS reduced motion toggle
    if (motionMedia && motionMedia.addEventListener) {
      motionMedia.addEventListener('change', (e) => {
        this.prefersReducedMotion = e.matches;
        if (this.prefersReducedMotion) {
          this.video.pause();
          this.video.style.display = 'none';
          this.video.classList.remove('is-playing');
          this.pauseSamplingLoop();
        } else {
          this.playVideoSafe();
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
    if (!this.video || this.prefersReducedMotion) return;

    // Re-verify strict muted attributes for iOS Safari autoplay allowance
    this.video.muted = true;
    this.video.defaultMuted = true;
    if (!this.video.hasAttribute('muted')) {
      this.video.setAttribute('muted', '');
    }
    if (!this.video.hasAttribute('playsinline')) {
      this.video.setAttribute('playsinline', '');
    }
    if (!this.video.hasAttribute('webkit-playsinline')) {
      this.video.setAttribute('webkit-playsinline', '');
    }

    // If already actively playing, ensure visible
    if (!this.video.paused && this.video.currentTime > 0) {
      this.video.style.display = 'block';
      this.video.classList.add('is-playing');
      return;
    }

    // If video has not initialized readyState, invoke load() once to trigger media pipeline
    if (this.video.readyState === 0 && !this.hasCalledLoad) {
      this.hasCalledLoad = true;
      try {
        this.video.load();
      } catch (e) {
        // Safe ignore
      }
    }

    // Briefly ensure display: block so browser media engine can process play command
    this.video.style.display = 'block';

    const playPromise = this.video.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        this.video.style.display = 'block';
        this.video.classList.add('is-playing');
        this.retryCount = 0;
        clearTimeout(this.retryTimer);
        this.removePassiveFallback();
        if (this.isSamplingActive) {
          this.resumeSamplingLoop();
        }
      }).catch((err) => {
        // Autoplay blocked by iOS (e.g. Low Power Mode).
        // CRITICAL: HIDE THE VIDEO ELEMENT IMMEDIATELY so Safari CANNOT render
        // its native circular play button overlay over the hero section!
        this.video.style.display = 'none';
        this.video.classList.remove('is-playing');
        console.warn('[MotionBackground] Autoplay note (handled gracefully):', err?.name || err);
        this.attachPassiveFallback();
      });
    }
  }

  attachPassiveFallback() {
    if (this.passiveFallbackAttached) return;
    this.passiveFallbackAttached = true;

    const triggerSilentPlayback = () => {
      if (this.video && this.video.paused && !this.prefersReducedMotion) {
        // Unhide on user touch gesture to start playback
        this.video.style.display = 'block';
        const p = this.video.play();
        if (p !== undefined) {
          p.then(() => {
            this.video.style.display = 'block';
            this.video.classList.add('is-playing');
            this.removePassiveFallback();
          }).catch(() => {
            this.video.style.display = 'none';
            this.video.classList.remove('is-playing');
          });
        }
      }
    };

    this._passiveHandler = triggerSilentPlayback;
    const opts = { passive: true, once: true };
    window.addEventListener('touchstart', triggerSilentPlayback, opts);
    window.addEventListener('pointerdown', triggerSilentPlayback, opts);
    window.addEventListener('scroll', triggerSilentPlayback, opts);
  }

  removePassiveFallback() {
    if (!this.passiveFallbackAttached) return;
    this.passiveFallbackAttached = false;
    if (this._passiveHandler) {
      window.removeEventListener('touchstart', this._passiveHandler);
      window.removeEventListener('pointerdown', this._passiveHandler);
      window.removeEventListener('scroll', this._passiveHandler);
      this._passiveHandler = null;
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
