/**
 * SIVASURIYA PORTFOLIO - HIGH-IMPACT RESTRAINED INTERACTIVITY ENGINE
 * 
 * Features:
 * 1. Subtle Magnetic Button Behavior (Important CTAs, sound toggle, filter pills, nav links)
 * 2. Restrained 3D Card Tilt with Specular Glare (Showcase rows, Archive cards, Discipline cards)
 * 3. Motion Background Parallax Depth (Subtle mouse-position & scroll-driven GPU displacement)
 * 4. Interactive Case Study Sequential Image Hover Scrubber (For projects with multiple assets)
 * 5. Native System Cursor Preserved (Zero custom cursor, zero visual distraction)
 * 6. Responsive & Accessible: Completely disabled on touch devices and prefers-reduced-motion
 */

import { PROJECTS } from './data.js';

export class InteractivityEngine {
  constructor() {
    this.isTouch = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
    this.hasFinePointer = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    this.prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.bgVideo = document.getElementById('bg-video');

    // Parallax state
    this.mouse = { x: 0, y: 0, normX: 0, normY: 0 };
    this.scrollY = window.scrollY || 0;
    this.isParallaxPending = false;
    this.parallaxRafId = null;
    this.boundCards = new WeakSet();

    if (!this.prefersReducedMotion && this.hasFinePointer && !this.isTouch) {
      this.init();
    }
  }

  init() {
    this.initMagneticButtons();
    this.initCardTiltAndGlare();
    this.initBackgroundParallax();
    this.initHoverScrubber();
  }

  /**
   * 1. SUBTLE MAGNETIC BUTTON BEHAVIOR
   * Subtle, springy magnetic pull when cursor approaches important interactive buttons.
   * Maximum displacement: ~6-8px (restrained, editorial, non-distracting).
   */
  initMagneticButtons() {
    const magneticSelectors = [
      '#hero-connect-btn',
      '#sound-toggle',
      '.hero-download-btn',
      '.filter-pill-btn',
      '.nav-link',
      '.archive-toggle-btn',
      '.archive-card-action-btn',
      '.modal-pagination-btn'
    ];

    const attachMagnetic = (el) => {
      if (!el || el.dataset.magneticAttached) return;
      el.dataset.magneticAttached = 'true';

      let rect = null;

      const onPointerEnter = () => {
        rect = el.getBoundingClientRect();
      };

      const onPointerMove = (e) => {
        if (!rect) rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = (e.clientX - centerX) * 0.22;
        const dy = (e.clientY - centerY) * 0.22;

        // Restrain to subtle threshold
        const maxDist = 7;
        const clampedX = Math.max(-maxDist, Math.min(maxDist, dx));
        const clampedY = Math.max(-maxDist, Math.min(maxDist, dy));

        el.style.transform = `translate3d(${clampedX.toFixed(1)}px, ${clampedY.toFixed(1)}px, 0)`;
      };

      const onPointerLeave = () => {
        rect = null;
        el.style.transform = 'translate3d(0, 0, 0)';
        setTimeout(() => {
          if (!el.matches(':hover')) {
            el.style.transform = '';
          }
        }, 350);
      };

      el.addEventListener('pointerenter', onPointerEnter, { passive: true });
      el.addEventListener('pointermove', onPointerMove, { passive: true });
      el.addEventListener('pointerleave', onPointerLeave, { passive: true });
    };

    magneticSelectors.forEach(sel => {
      document.querySelectorAll(sel).forEach(attachMagnetic);
    });

    // Provide dynamic refresher for newly rendered buttons (e.g. filter pills)
    this.refreshMagnetic = () => {
      magneticSelectors.forEach(sel => {
        document.querySelectorAll(sel).forEach(attachMagnetic);
      });
    };
  }

  /**
   * 2. RESTRAINED 3D CARD TILT & SPECULAR GLARE
   * Subtle 3D perspective tilt (max ~4 degrees) with light reflection following cursor.
   */
  initCardTiltAndGlare() {
    const tiltSelectors = [
      '.archive-card',
      '.showcase-row',
      '.discipline-card',
      '.editorial-project-row'
    ];

    const attachTilt = (card) => {
      if (this.boundCards.has(card)) return;
      this.boundCards.add(card);

      let rect = null;
      let isHovered = false;
      let tiltRafId = null;

      const onPointerEnter = () => {
        isHovered = true;
        rect = card.getBoundingClientRect();
        card.style.transition = 'transform 0.15s ease-out, border-color 0.25s ease';
      };

      const onPointerMove = (e) => {
        if (!isHovered) return;
        if (!rect) rect = card.getBoundingClientRect();

        const clientX = e.clientX;
        const clientY = e.clientY;

        if (!tiltRafId) {
          tiltRafId = requestAnimationFrame(() => {
            tiltRafId = null;
            if (!isHovered || !rect) return;

            const x = clientX - rect.left;
            const y = clientY - rect.top;
            const xPct = Math.max(0, Math.min(1, x / rect.width));
            const yPct = Math.max(0, Math.min(1, y / rect.height));

            // Subtle tilt: max 4 degrees
            const tiltX = ((0.5 - yPct) * 4.5).toFixed(2);
            const tiltY = ((xPct - 0.5) * 4.5).toFixed(2);

            card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(3px)`;
            card.style.setProperty('--mouse-x', `${(xPct * 100).toFixed(1)}%`);
            card.style.setProperty('--mouse-y', `${(yPct * 100).toFixed(1)}%`);
            card.style.setProperty('--glare-opacity', '0.65');
          });
        }
      };

      const onPointerLeave = () => {
        isHovered = false;
        rect = null;
        if (tiltRafId) {
          cancelAnimationFrame(tiltRafId);
          tiltRafId = null;
        }
        card.style.transition = 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.25s ease';
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)';
        card.style.setProperty('--glare-opacity', '0');
        setTimeout(() => {
          if (!isHovered) {
            card.style.transform = '';
            card.style.transition = '';
          }
        }, 450);
      };

      card.addEventListener('pointerenter', onPointerEnter, { passive: true });
      card.addEventListener('pointermove', onPointerMove, { passive: true });
      card.addEventListener('pointerleave', onPointerLeave, { passive: true });
    };

    tiltSelectors.forEach(sel => {
      document.querySelectorAll(sel).forEach(attachTilt);
    });

    this.refreshCards = () => {
      tiltSelectors.forEach(sel => {
        document.querySelectorAll(sel).forEach(attachTilt);
      });
      this.initHoverScrubber();
      if (this.refreshMagnetic) this.refreshMagnetic();
    };
  }

  /**
   * 3. MOTION BACKGROUND PARALLAX DEPTH
   * Subtle mouse position & scroll driven optical depth.
   * Background shifts by max 8-10px; hero foreground text reacts with opposite depth.
   */
  initBackgroundParallax() {
    if (!this.bgVideo) return;

    const heroContainer = document.querySelector('.hero-editorial-grid');

    const updateParallax = () => {
      this.isParallaxPending = false;
      const normX = this.mouse.normX;
      const normY = this.mouse.normY;
      const scrollParallax = Math.min(100, (this.scrollY * 0.04));

      // Subtle background video parallax (counter-movement creates depth)
      if (this.bgVideo) {
        const bgX = (normX * -9).toFixed(1);
        const bgY = (normY * -7 + scrollParallax).toFixed(1);
        this.bgVideo.style.transform = `translate3d(${bgX}px, ${bgY}px, 0) scale(1.03)`;
      }

      // Very subtle foreground hero typography depth (only when hero in view)
      if (heroContainer && this.scrollY < 800) {
        const fgX = (normX * 4.5).toFixed(1);
        const fgY = (normY * 3.5).toFixed(1);
        heroContainer.style.transform = `translate3d(${fgX}px, ${fgY}px, 0)`;
      }
    };

    const requestTick = () => {
      if (!this.isParallaxPending) {
        this.isParallaxPending = true;
        this.parallaxRafId = requestAnimationFrame(updateParallax);
      }
    };

    window.addEventListener('pointermove', (e) => {
      this.mouse.normX = (e.clientX / window.innerWidth) - 0.5;
      this.mouse.normY = (e.clientY / window.innerHeight) - 0.5;
      requestTick();
    }, { passive: true });

    window.addEventListener('scroll', () => {
      this.scrollY = window.scrollY || 0;
      requestTick();
    }, { passive: true });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden && this.parallaxRafId) {
        cancelAnimationFrame(this.parallaxRafId);
        this.isParallaxPending = false;
      }
    });
  }

  /**
   * 4. INTERACTIVE CASE STUDY SEQUENTIAL IMAGE HOVER SCRUBBER
   * When hovering over project thumbnails in the archive grid, moving the cursor horizontally
   * smoothly scrubs through the project's genuine images array.
   */
  initHoverScrubber() {
    const cards = document.querySelectorAll('.archive-card');

    cards.forEach(card => {
      const projectId = card.getAttribute('data-open-project');
      const project = PROJECTS.find(p => p.id === projectId);
      if (!project || !project.images || project.images.length <= 1) return;

      const thumb = card.querySelector('.archive-card-thumb');
      const img = thumb ? thumb.querySelector('img') : null;
      if (!thumb || !img || thumb.dataset.scrubberInit) return;
      thumb.dataset.scrubberInit = 'true';

      const originalSrc = img.src;
      const images = project.images;
      const totalImages = images.length;

      // Build subtle scrub indicator track
      let track = thumb.querySelector('.archive-scrub-track');
      if (!track) {
        track = document.createElement('div');
        track.className = 'archive-scrub-track';
        track.setAttribute('aria-hidden', 'true');
        for (let i = 0; i < totalImages; i++) {
          const seg = document.createElement('span');
          seg.className = `archive-scrub-segment ${i === 0 ? 'active' : ''}`;
          track.appendChild(seg);
        }
        thumb.appendChild(track);
      }

      const segments = track.querySelectorAll('.archive-scrub-segment');
      let activeIndex = 0;

      const updateFrame = (idx) => {
        if (idx === activeIndex || idx < 0 || idx >= totalImages) return;
        activeIndex = idx;
        const targetImage = images[idx];
        if (targetImage && targetImage.src) {
          img.src = targetImage.src;
        }
        segments.forEach((seg, sIdx) => {
          seg.classList.toggle('active', sIdx === idx);
        });
      };

      let thumbRect = null;

      thumb.addEventListener('pointerenter', () => {
        thumbRect = thumb.getBoundingClientRect();
      }, { passive: true });

      thumb.addEventListener('pointermove', (e) => {
        if (!thumbRect) thumbRect = thumb.getBoundingClientRect();
        const width = thumbRect.width || 1;
        const x = Math.max(0, Math.min(width, e.clientX - thumbRect.left));
        const idx = Math.min(totalImages - 1, Math.floor((x / width) * totalImages));
        updateFrame(idx);
      }, { passive: true });

      thumb.addEventListener('pointerleave', () => {
        thumbRect = null;
        updateFrame(0);
        img.src = originalSrc;
      }, { passive: true });
    });
  }
}
