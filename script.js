// === Typewriter Effect for Intro and About ===
function typeWriterLoop(elementId, texts, delay = 80, pause = 2000) {
  let i = 0, j = 0, isDeleting = false;

  function type() {
    const text = texts[i];
    const el = document.getElementById(elementId);
    el.textContent = text.substring(0, j) + (isDeleting ? '' : '|');

    if (!isDeleting) {
      j++;
      if (j > text.length) {
        isDeleting = true;
        setTimeout(type, pause);
        return;
      }
    } else {
      j--;
      if (j === 0) {
        isDeleting = false;
        i = (i + 1) % texts.length;
      }
    }
    setTimeout(type, isDeleting ? delay / 2 : delay);
  }

  type();
}

document.addEventListener("DOMContentLoaded", () => {
  // Intro text
  typeWriterLoop("typewriterIntro", [
    "Hi, I'm Nimish Bhargav",
    "Web Developer 💻",
    "AI Enthusiast 🤖",
    "Creative Coder 🚀"
  ]);

  // About Me animated text
  typeWriterLoop("typewriterAbout", [
    "I'm a passionate student developer exploring AI and futuristic web technologies.",
    "I love blending creativity with code to build immersive digital experiences.",
    "Welcome to my space-themed portfolio!"
  ]);

  // Start background animation
  initParticles();
});


// === JavaScript Animated Particle Background ===
function initParticles() {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  document.body.appendChild(canvas);
  canvas.style.position = "fixed";
  canvas.style.top = 0;
  canvas.style.left = 0;
  canvas.style.zIndex = "-2";
  canvas.style.width = "100vw";
  canvas.style.height = "100vh";
  canvas.style.pointerEvents = "none";

  let width, height;
  let particles = [];

  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.radius = Math.random() * 2 + 1;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.speedY = (Math.random() - 0.5) * 0.3;
      this.opacity = Math.random() * 0.5 + 0.3;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
        this.reset();
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 255, 255, ${this.opacity})`;
      ctx.fill();
    }
  }

  const particleCount = 100;
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animateParticles() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animateParticles);
  }

  animateParticles();
}
  const form = document.getElementById('contactForm');
  const thankYouMessage = document.getElementById('thankYouMessage');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    try {
      const res = await fetch('https://formspree.io/f/meokoveq', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: formData,
      });

      if (res.ok) {
        form.reset();
        thankYouMessage.style.display = 'block';
        setTimeout(() => {
          thankYouMessage.style.display = 'none';
        }, 5000);
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      alert('Error submitting form.');
    }
  });

