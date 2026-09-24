/**
 * SIVASURIYA PORTFOLIO - HIGH-FIDELITY LIGHTBOX
 * Keyboard navigation, touch gestures, smooth transitions, accessible focus management.
 */

export class Lightbox {
  constructor() {
    this.images = [];
    this.currentIndex = 0;
    this.isOpen = false;
    this.previousFocusEl = null;

    this.touchStartX = 0;
    this.touchStartY = 0;

    this.buildDOM();
    this.bindEvents();
  }

  buildDOM() {
    this.overlay = document.createElement('div');
    this.overlay.className = 'lightbox-overlay';
    this.overlay.setAttribute('role', 'dialog');
    this.overlay.setAttribute('aria-modal', 'true');
    this.overlay.setAttribute('aria-label', 'Image Lightbox Preview');
    this.overlay.style.display = 'none';

    this.overlay.innerHTML = `
      <div class="lightbox-backdrop"></div>
      <div class="lightbox-header">
        <div class="lightbox-counter">
          <span class="lightbox-current">01</span>
          <span class="lightbox-slash">/</span>
          <span class="lightbox-total">01</span>
        </div>
        <div class="lightbox-caption"></div>
        <button type="button" class="lightbox-close" aria-label="Close Lightbox (ESC)">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="square">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <div class="lightbox-stage">
        <button type="button" class="lightbox-nav lightbox-prev" aria-label="Previous Image (Left Arrow)">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="square">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        <div class="lightbox-image-container">
          <img class="lightbox-image" src="" alt="" />
        </div>

        <button type="button" class="lightbox-nav lightbox-next" aria-label="Next Image (Right Arrow)">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="square">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    `;

    document.body.appendChild(this.overlay);

    this.imgEl = this.overlay.querySelector('.lightbox-image');
    this.captionEl = this.overlay.querySelector('.lightbox-caption');
    this.currentEl = this.overlay.querySelector('.lightbox-current');
    this.totalEl = this.overlay.querySelector('.lightbox-total');
    this.prevBtn = this.overlay.querySelector('.lightbox-prev');
    this.nextBtn = this.overlay.querySelector('.lightbox-next');
    this.closeBtn = this.overlay.querySelector('.lightbox-close');
    this.backdrop = this.overlay.querySelector('.lightbox-backdrop');
  }

  bindEvents() {
    this.closeBtn.addEventListener('click', () => this.close());
    this.backdrop.addEventListener('click', () => this.close());
    this.prevBtn.addEventListener('click', () => this.prev());
    this.nextBtn.addEventListener('click', () => this.next());

    // Keyboard navigation
    window.addEventListener('keydown', (e) => {
      if (!this.isOpen) return;
      if (e.key === 'Escape') {
        e.preventDefault();
        this.close();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        this.prev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        this.next();
      }
    });

    // Touch Swipe Gestures
    this.overlay.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        this.touchStartX = e.touches[0].clientX;
        this.touchStartY = e.touches[0].clientY;
      }
    }, { passive: true });

    this.overlay.addEventListener('touchend', (e) => {
      if (e.changedTouches.length === 1) {
        const dx = e.changedTouches[0].clientX - this.touchStartX;
        const dy = e.changedTouches[0].clientY - this.touchStartY;

        // Minimum swipe distance of 40px and predominantly horizontal
        if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.5) {
          if (dx > 0) {
            this.prev();
          } else {
            this.next();
          }
        }
      }
    }, { passive: true });
  }

  open(images, startIndex = 0) {
    if (!images || images.length === 0) return;
    this.images = images;
    this.currentIndex = Math.max(0, Math.min(startIndex, images.length - 1));
    this.previousFocusEl = document.activeElement;

    this.overlay.style.display = 'flex';
    document.body.classList.add('lightbox-locked');
    this.isOpen = true;

    this.updateImage();

    // Focus close button for screen reader & keyboard navigation
    requestAnimationFrame(() => {
      this.overlay.classList.add('active');
      this.closeBtn.focus();
    });
  }

  close() {
    if (!this.isOpen) return;
    this.overlay.classList.remove('active');
    document.body.classList.remove('lightbox-locked');

    setTimeout(() => {
      this.overlay.style.display = 'none';
      this.isOpen = false;
      this.imgEl.src = '';
      if (this.previousFocusEl && this.previousFocusEl.focus) {
        this.previousFocusEl.focus();
      }
    }, 250);
  }

  prev() {
    if (this.images.length <= 1) return;
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.updateImage();
  }

  next() {
    if (this.images.length <= 1) return;
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.updateImage();
  }

  updateImage() {
    const item = this.images[this.currentIndex];
    if (!item) return;

    const src = typeof item === 'string' ? item : item.src;
    const caption = typeof item === 'string' ? '' : (item.caption || item.alt || '');

    this.imgEl.style.opacity = '0.3';
    this.imgEl.src = src;
    this.imgEl.alt = caption || `Image ${this.currentIndex + 1}`;

    this.imgEl.onload = () => {
      this.imgEl.style.opacity = '1';
    };

    this.captionEl.textContent = caption;
    this.currentEl.textContent = String(this.currentIndex + 1).padStart(2, '0');
    this.totalEl.textContent = String(this.images.length).padStart(2, '0');

    // Toggle navigation buttons visibility if only one image
    const single = this.images.length <= 1;
    this.prevBtn.style.display = single ? 'none' : 'flex';
    this.nextBtn.style.display = single ? 'none' : 'flex';
  }
}
