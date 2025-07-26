class ScrollSequence {
  constructor(container) {
    this.container = container;
    this.canvas = container.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.path = container.dataset.path;
    this.ext = container.dataset.ext || 'jpg';
    this.frameCount = parseInt(container.dataset.frames, 10);
    this.width = parseInt(container.dataset.width, 10) || 800;
    this.height = parseInt(container.dataset.height, 10) || 600;
    this.images = [];
    this.loaded = 0;
    this.lastFrame = -1;

    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.preloadImages();
    window.addEventListener('scroll', () => this.onScroll());
    window.addEventListener('resize', () => this.onScroll());
  }

  preloadImages() {
    for (let i = 1; i <= this.frameCount; i++) {
      const img = new Image();
      img.src = `${this.path}${String(i).padStart(4, '0')}.${this.ext}`;
      img.onload = () => {
        this.loaded++;
        if (this.loaded === 1) this.drawFrame(0); // Draw first frame ASAP
      };
      this.images.push(img);
    }
  }

  onScroll() {
    const rect = this.container.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const threshold = -50; // px before entering view, adjust as needed

    // Animation starts when the container is threshold px below the viewport
    const start = windowHeight - threshold;
    const end = -rect.height + threshold;

    let progress = (start - rect.top) / (start - end);
    progress = Math.max(0, Math.min(1, progress));

    const speedFactor = 2; // Adjust as needed
    let fastProgress = progress * speedFactor;
    fastProgress = fastProgress % 1;

    const frameIndex = Math.floor(fastProgress * (this.frameCount - 1));
    if (frameIndex !== this.lastFrame && this.images[frameIndex]?.complete) {
        this.drawFrame(frameIndex);
        this.lastFrame = frameIndex;
    }
  }

  drawFrame(index) {
    const img = this.images[index];
    if (!img) return;
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.drawImage(img, 0, 0, this.width, this.height);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.scroll-sequence').forEach(el => {
    new ScrollSequence(el);
  });
});