document.addEventListener("DOMContentLoaded", () => {
  function typeWriterLoop(elementId, texts, delay = 80, pause = 2000) {
    let i = 0, j = 0, isDeleting = false;
    function type() {
      const text = texts[i];
      const el = document.getElementById(elementId);
      if (!el) return;
      el.textContent = text.substring(0, j) + (isDeleting ? '' : '|');
      if (!isDeleting) {
        j++;
        if (j > text.length) {
          isDeleting = true; setTimeout(type, pause); return;
        }
      } else {
        j--;
        if (j === 0) {
          isDeleting = false; i = (i + 1) % texts.length;
        }
      }
      setTimeout(type, isDeleting ? delay / 2 : delay);
    }
    type();
  }

  typeWriterLoop("typewriterIntro", [
    "Hi, I'm Nimish Bhargav",
    "Web Developer 💻",
    "AI Explorer 🤖",
    "Creative Coder 🚀"
  ]);
  typeWriterLoop("typewriterAbout", [
    "I'm a passionate student developer exploring AI and futuristic web technologies.",
    "I love blending creativity with code to build immersive digital experiences.",
    "Welcome to my space-themed portfolio!"
  ]);

  const form = document.getElementById('contactForm');
  const message = document.getElementById('thankYouMessage');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    form.reset();
    message.style.display = 'block';
    setTimeout(() => message.style.display = 'none', 4000);
  });

  const canvas = document.getElementById('bg');
  const ctx = canvas.getContext('2d');
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const stars = [];
  for (let i = 0; i < 120; i++) {
    stars.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.5 + 0.5,
      a: Math.random() * Math.PI * 2,
      s: Math.random() * 0.002 + 0.001
    });
  }

  function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
      star.a += star.s;
      const dx = Math.cos(star.a) * 30;
      const dy = Math.sin(star.a) * 30;
      ctx.beginPath();
      ctx.arc(star.x + dx, star.y + dy, star.r, 0, Math.PI * 2);
      ctx.fillStyle = `hsl(${(star.a * 100) % 360}, 100%, 85%)`;
      ctx.fill();
    });
    requestAnimationFrame(animateStars);
  }
  animateStars();
});
document.addEventListener("DOMContentLoaded", () => {
  const headings = document.querySelectorAll("h2, h3");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.4 });

  headings.forEach(h => observer.observe(h));
});
function apply3DTiltEffect(element, sensitivity = 15) {
  element.addEventListener("mousemove", (e) => {
    const { left, top, width, height } = element.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    const centerX = width / 2;
    const centerY = height / 2;

    const rotateX = ((y - centerY) / centerY) * sensitivity;
    const rotateY = ((x - centerX) / centerX) * sensitivity;

    element.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
  });

  element.addEventListener("mouseleave", () => {
    element.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
  });

  element.style.transition = "transform 0.3s ease";
  element.style.transformStyle = "preserve-3d";
}

document.addEventListener("DOMContentLoaded", () => {
  const contact = document.querySelector("#contact");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        contact.style.opacity = "1";
        contact.style.transform = "translateY(0)";
      }
    });
  }, { threshold: 0.3 });

  observer.observe(contact);
});
document.addEventListener("DOMContentLoaded", () => {
  const footer = document.querySelector("footer");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        footer.style.opacity = "1";
        footer.style.transform = "translateY(0)";
      }
    });
  }, { threshold: 0.4 });

  observer.observe(footer);
});

