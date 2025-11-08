// Particle background animation
class ParticleSystem {
  constructor() {
    this.canvas = document.getElementById('particles');
    if (!this.canvas) return;
    
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.particleCount = 80;
    
    this.resize();
    this.init();
    this.animate();
    
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  init() {
    this.particles = [];
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        color: this.getRandomColor()
      });
    }
  }

  getRandomColor() {
    const colors = [
      'rgba(74, 144, 226, 0.5)',
      'rgba(123, 104, 238, 0.5)',
      'rgba(255, 215, 0, 0.3)',
      'rgba(255, 255, 255, 0.3)'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  animate() {
    if (!storage.getSettings().particlesEnabled) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      requestAnimationFrame(() => this.animate());
      return;
    }

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Update and draw particles
    this.particles.forEach((particle, i) => {
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Bounce off edges
      if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;

      // Draw particle
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = particle.color;
      this.ctx.fill();

      // Draw connections
      this.particles.slice(i + 1).forEach(otherParticle => {
        const dx = particle.x - otherParticle.x;
        const dy = particle.y - otherParticle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          this.ctx.beginPath();
          this.ctx.moveTo(particle.x, particle.y);
          this.ctx.lineTo(otherParticle.x, otherParticle.y);
          this.ctx.strokeStyle = `rgba(74, 144, 226, ${0.2 * (1 - distance / 100)})`;
          this.ctx.lineWidth = 1;
          this.ctx.stroke();
        }
      });
    });

    requestAnimationFrame(() => this.animate());
  }
}

// Initialize particle system when settings allow
document.addEventListener('DOMContentLoaded', () => {
  new ParticleSystem();
});
