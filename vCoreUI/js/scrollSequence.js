class ScrollSequence {
  constructor(container) {
    this.container = container;
    this.canvas = container.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.zipPath = container.dataset.zip; 
    this.frameCount = parseInt(container.dataset.frames, 10);
    this.images = [];
    this.loaded = 0;
    this.lastFrame = -1;
    this.imageWidth = null;
    this.imageHeight = null;

    if (this.zipPath) {
      this.loadZipFrames();
    } else {
      this.preloadImages();
    }

    window.addEventListener('scroll', () => this.onScroll());
    window.addEventListener('resize', () => this.onScroll());
  }

  // Unpacks Zip and Loads Frames in webp format
  async loadZipFrames() {
    const resp = await fetch(this.zipPath);
    const buf = await resp.arrayBuffer();
    const files = fflate.unzipSync(new Uint8Array(buf));
    const frameNames = Object.keys(files).sort();
    for (let i = 0; i < frameNames.length; i++) {
      const file = files[frameNames[i]];
      const blob = new Blob([file], { type: 'image/webp' });
      const url = URL.createObjectURL(blob);
      const img = new Image();
      img.src = url;
      img.onload = () => {
        this.loaded++;
        if (this.loaded === 1) {
          this.imageWidth = img.naturalWidth;
          this.imageHeight = img.naturalHeight;
          this.canvas.width = this.imageWidth;
          this.canvas.height = this.imageHeight;
          this.container.style.aspectRatio = `${this.imageWidth} / ${this.imageHeight}`;
          this.drawFrame(0);
        }
      };
      this.images.push(img);
    }
  }

  // Page Scrolling Logic
  onScroll() {
    if (!this.imageWidth || !this.imageHeight) return;
    const rect = this.container.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const threshold = 50;
    const start = windowHeight - threshold;
    const end = -rect.height + threshold;
    let progress = (start - rect.top) / (start - end);
    progress = Math.max(0, Math.min(1, progress));
    const speedFactor = 1; // Playback Speed Control
    let fastProgress = progress * speedFactor;
    fastProgress = fastProgress % 1; 
    const frameIndex = Math.floor(fastProgress * (this.frameCount - 1));
    if (frameIndex !== this.lastFrame && this.images[frameIndex]?.complete) {
      this.drawFrame(frameIndex);
      this.lastFrame = frameIndex;
    }
  }

  // Frame Drawing Logic
  drawFrame(index) {
    const img = this.images[index];
    if (!img) return;
    this.ctx.clearRect(0, 0, this.imageWidth, this.imageHeight);
    this.ctx.drawImage(img, 0, 0, this.imageWidth, this.imageHeight);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.scroll-sequence').forEach(el => {
    new ScrollSequence(el);
  });
});