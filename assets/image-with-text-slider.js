/**
 * Image with Text Slider
 * Handles slider functionality for the image-with-text-slider section
 */

class ImageWithTextSlider {
  constructor(container) {
    this.container = container;
    this.slides = container.querySelectorAll('.slider-slide');
    this.prevButton = container.querySelector('.slider-arrow-prev');
    this.nextButton = container.querySelector('.slider-arrow-next');
    this.currentSlide = 0;
    this.totalSlides = this.slides.length;
    this.autoPlayInterval = null;
    this.autoPlayDelay = 5000; // 5 seconds

    this.init();
  }

  init() {
    if (this.totalSlides <= 1) {
      return; // Don't initialize if there's only one slide
    }

    // Add event listeners
    if (this.prevButton) {
      this.prevButton.addEventListener('click', () => this.previousSlide());
    }

    if (this.nextButton) {
      this.nextButton.addEventListener('click', () => this.nextSlide());
    }

    // Add keyboard navigation
    this.container.addEventListener('keydown', (e) => this.handleKeyboard(e));

    // Optional: Start autoplay
    // this.startAutoPlay();
  }

  showSlide(index) {
    // Remove active class from all slides
    this.slides.forEach((slide) => {
      slide.classList.remove('active');
    });

    // Add active class to current slide
    this.slides[index].classList.add('active');
    this.currentSlide = index;
  }

  nextSlide() {
    let nextIndex = this.currentSlide + 1;
    if (nextIndex >= this.totalSlides) {
      nextIndex = 0; // Loop back to first slide
    }
    this.showSlide(nextIndex);
    this.resetAutoPlay();
  }

  previousSlide() {
    let prevIndex = this.currentSlide - 1;
    if (prevIndex < 0) {
      prevIndex = this.totalSlides - 1; // Loop to last slide
    }
    this.showSlide(prevIndex);
    this.resetAutoPlay();
  }

  handleKeyboard(e) {
    if (e.key === 'ArrowLeft') {
      this.previousSlide();
    } else if (e.key === 'ArrowRight') {
      this.nextSlide();
    }
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, this.autoPlayDelay);
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }

  resetAutoPlay() {
    this.stopAutoPlay();
    // Uncomment the line below to restart autoplay after user interaction
    // this.startAutoPlay();
  }
}

// Initialize all sliders on the page
document.addEventListener('DOMContentLoaded', () => {
  const sliders = document.querySelectorAll('[data-slider-section]');
  sliders.forEach((slider) => {
    new ImageWithTextSlider(slider.closest('.image-slider-wrapper'));
  });
});

// Reinitialize on Shopify theme editor update
if (window.Shopify && window.Shopify.designMode) {
  document.addEventListener('shopify:section:load', (event) => {
    const slider = event.target.querySelector('[data-slider-section]');
    if (slider) {
      new ImageWithTextSlider(slider.closest('.image-slider-wrapper'));
    }
  });
}
