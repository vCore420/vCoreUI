// vCoreUI Cursor Effect

class vCoreCursorFlow {
  constructor(options = {}) {
    this.colorLight =
      options.colorLight ||
      getComputedStyle(document.documentElement).getPropertyValue('--dark-text');
    this.colorDark =
      options.colorDark ||
      getComputedStyle(document.documentElement).getPropertyValue('--dark-banner');

    this.particles = [];
    this.radius = options.radius || 1.6; // Particle size radius
    this.emitSpacing = options.emitSpacing || 2; // Spacing between emitted particles
    this.maxParticles = options.maxParticles || 400; // Max Particles on Screen

    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    Object.assign(this.canvas.style, {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      pointerEvents: 'none',
      zIndex: 9999,
      willChange: "transform",
      transform: "translateZ(0)"
    });
    document.body.appendChild(this.canvas);

    this.mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    this.prev = { x: this.mouse.x, y: this.mouse.y };
    this.moving = false;
    this.lastMove = 0;
    this.running = true;
    this._paused = false; // For scroll pause

    this.emitInterval = options.emitInterval || (1000 / 120); 
    this.lastEmitTime = performance.now();

    this._resize = this._resize.bind(this);
    this._onMove = this._onMove.bind(this);

    window.addEventListener('resize', this._resize);
    window.addEventListener('mousemove', this._onMove, { passive: true });
    window.addEventListener('touchmove', this._onMove, { passive: true });

    this._resize();
    this._animate();
  }

  pause() {
    this._paused = true;
  }

  resume() {
    if (this._paused) {
      this._paused = false;
      this._animate(); // Restart animation loop if paused
    }
  }

  _resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  _onMove(e) {
    let x, y;
    if (e.touches) {
      x = e.touches[0].clientX;
      y = e.touches[0].clientY;
    } else {
      x = e.clientX;
      y = e.clientY;
    }
    this.prev = { ...this.mouse };
    this.mouse = { x, y };
    this.moving = true;
    this.lastMove = performance.now();
  }

  _emitParticlesAlongPath() {
    const dx = this.mouse.x - this.prev.x;
    const dy = this.mouse.y - this.prev.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 0.1) return;

    const steps = Math.floor(dist / this.emitSpacing);
    for (let i = 0; i <= steps; i++) {
      const t = steps === 0 ? 1 : i / steps;
      const x = this.prev.x + dx * t;
      const y = this.prev.y + dy * t;

      const movementAngle = Math.atan2(dy, dx);
      const angle = movementAngle + (Math.random() - 0.5) * Math.PI;
      const speed = 0.6 + Math.random() * 1.1;

      // Choose color: 65% light, 35% dark
      const color =
        Math.random() < 0.65 ? this.colorLight.trim() : this.colorDark.trim();

      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 0.13 + Math.random() * 0.11,
        life: 12 + Math.random() * 10,
        radius: this.radius * (0.7 + Math.random() * 0.7),
        color
      });
    }
    if (this.particles.length > this.maxParticles) {
      this.particles.splice(0, this.particles.length - this.maxParticles);
    }
  }

  _animate() {
    if (!this.running || this._paused) return;
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    const now = performance.now();

    if (this.moving && now - this.lastMove < 100) {
      while (this.lastEmitTime < now) {
        this._emitParticlesAlongPath();
        this.prev = { ...this.mouse };
        this.lastEmitTime += this.emitInterval;
      }
    } else {
      this.moving = false;
      this.prev = { ...this.mouse };
      this.lastEmitTime = now;
    }

    for (let i = this.particles.length - 1; i >= 0; i--) {
      let p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life--;
      p.alpha *= 0.96;

      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI);
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 4;
      ctx.fill();
      ctx.restore();

      if (p.life <= 0 || p.alpha < 0.02) {
        this.particles.splice(i, 1);
      }
    }

    requestAnimationFrame(() => this._animate());
  }

  destroy() {
    this.running = false;
    window.removeEventListener('resize', this._resize);
    window.removeEventListener('mousemove', this._onMove);
    window.removeEventListener('touchmove', this._onMove);
    if (this.canvas.parentNode) this.canvas.parentNode.removeChild(this.canvas);
  }
}

// Only create/destroy on toggle
window.vcoreCursorFlow = null;

const toggle = document.getElementById('cursorEffectToggle');
const status = document.getElementById('cursorEffectStatus');
let isScrolling = false;
let scrollTimeout = null;

toggle.addEventListener('change', function() {
  if (this.checked) {
    window.vcoreCursorFlow = new vCoreCursorFlow();
    status.textContent = "Cursor Effect - On";
  } else {
    if (window.vcoreCursorFlow) {
      window.vcoreCursorFlow.destroy();
      window.vcoreCursorFlow = null;
    }
    status.textContent = "Cursor Effect - Off";
  }
});

// Pause effect while scrolling
window.addEventListener('scroll', () => {
  if (window.vcoreCursorFlow && !isScrolling) {
    window.vcoreCursorFlow.pause();
    isScrolling = true;
  }
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    if (window.vcoreCursorFlow && isScrolling) {
      window.vcoreCursorFlow.resume();
      isScrolling = false;
    }
  }, 50);
});
