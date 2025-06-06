particlesJS.load('particles-js', 'particles.json', function() {
  console.log('particles.js loaded');
});

function typeAbout() {
  if (aboutIndex < aboutText.length) {
    aboutElement.textContent += aboutText.charAt(aboutIndex);
    aboutIndex++;
    setTimeout(typeAbout, 30);
  }
}
window.addEventListener('load', typeAbout);

// Logo Loop Typewriter
const logoTexts = [ "Nimish Bhargav-","Software Engineer", "Web Developer", "Tech Explorer"];
let logoIndex = 0;
let logoCharIndex = 0;
let typing = true;

const logoTyper = document.getElementById("logo-typer");

function loopLogoText() {
  const current = logoTexts[logoIndex];
  if (typing) {
    logoTyper.textContent += current.charAt(logoCharIndex);
    logoCharIndex++;
    if (logoCharIndex === current.length) {
      typing = false;
      setTimeout(loopLogoText, 1000);
    } else {
      setTimeout(loopLogoText, 100);
    }
  } else {
    logoTyper.textContent = logoTyper.textContent.slice(0, -1);
    if (logoTyper.textContent.length === 0) {
      typing = true;
      logoCharIndex = 0;
      logoIndex = (logoIndex + 1) % logoTexts.length;
    }
    setTimeout(loopLogoText, 50);
  }
}
loopLogoText();

// Testimonial Carousel
const testimonials = document.querySelectorAll('.testimonial');
let currentTestimonial = 0;

function showTestimonial(idx) {
  testimonials.forEach((t, i) => {
    t.classList.toggle('active', i === idx);
  });
}

function nextTestimonial() {
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  showTestimonial(currentTestimonial);
}

setInterval(nextTestimonial, 8000);
showTestimonial(currentTestimonial);

// Contact Form
const form = document.getElementById('contact-form');
const thankYouMsg = document.getElementById('thank-you-message');

form.addEventListener('submit', e => {
  e.preventDefault();
  form.style.display = 'none';
  thankYouMsg.classList.remove('hidden');
});
document.getElementById("contact-form").addEventListener("submit", async function (e) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);

  const response = await fetch("https://formspree.io/f/meokoveq", {
    method: "POST",
    body: formData,
    headers: { 'Accept': 'application/json' }
  });

  if (response.ok) {
    document.getElementById("form-status").textContent = "Thank you for your message!";
    document.getElementById("form-status").style.display = "block";
    form.reset();
  } else {
    document.getElementById("form-status").textContent = "Something went wrong. Please try again.";
    document.getElementById("form-status").style.display = "block";
  }
});

const aboutMeTexts = [
  "I’m Nimish Bhargav, a passionate software engineer in college.","I love building websites, apps, and smart digital solutions.",
  "Always learning, exploring new tech, and solving real-world problems.",
  "I publish projects online so others can learn too.",
  "Join me on this journey of innovation and creativity!",
  "Let’s connect and create something amazing together!",
    "Feel free to reach out for collaboration or just to chat about tech!",
    "I’m excited to share my journey and learn from others in the tech community."
];

const typewriterElement = document.getElementById("about-typewriter");
let textIndex = 0;
let charIndex = 0;

function typeLoop() {
  if (charIndex < aboutMeTexts[textIndex].length) {
    typewriterElement.textContent += aboutMeTexts[textIndex].charAt(charIndex);
    charIndex++;
    setTimeout(typeLoop, 35);
  } else {
    setTimeout(() => {
      typewriterElement.textContent = "";
      charIndex = 0;
      textIndex = (textIndex + 1) % aboutMeTexts.length;
      typeLoop();
    }, 2500);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  // Ensure fade-in CSS is visible when JS starts typing
  document.getElementById("about-typewriter").style.opacity = "1";
  typeLoop();
});

const canvas = document.getElementById("backgroundCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
let shapeTypes = ["circle", "triangle", "hexagon"];
let currentShape = "circle";
let nextShapeChange = Date.now() + 5000; // change shape every 5 seconds

const numParticles = 100;

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
    this.angle = Math.random() * Math.PI * 2;
    this.radius = Math.random() * (canvas.width / 3) + 30;
    this.speed = Math.random() * 0.01 + 0.002;
    this.size = Math.random() * 2 + 1.5;
    this.color = `hsl(${Math.random() * 360}, 70%, 60%)`;
  }

  update() {
    this.angle += this.speed;
    this.x = canvas.width / 2 + this.radius * Math.cos(this.angle);
    this.y = canvas.height / 2 + this.radius * Math.sin(this.angle);
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.beginPath();

    switch (currentShape) {
      case "circle":
        ctx.arc(0, 0, this.size, 0, Math.PI * 2);
        break;
      case "triangle":
        for (let i = 0; i < 3; i++) {
          const angle = (Math.PI * 2 / 3) * i;
          const x = this.size * Math.cos(angle);
          const y = this.size * Math.sin(angle);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        break;
      case "hexagon":
        for (let i = 0; i < 6; i++) {
          const angle = (Math.PI / 3) * i;
          const x = this.size * Math.cos(angle);
          const y = this.size * Math.sin(angle);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        break;
    }

    ctx.shadowBlur = 10;
    ctx.shadowColor = this.color;
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  }
}

function initParticles() {
  particles = [];
  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle());
  }
}

function changeShapeRandomly() {
  currentShape = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
}

function animate() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (Date.now() > nextShapeChange) {
    changeShapeRandomly();
    nextShapeChange = Date.now() + 5000;
  }

  particles.forEach((p) => {
    p.update();
    p.draw();
  });

  requestAnimationFrame(animate);
}

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
});

initParticles();
animate();
