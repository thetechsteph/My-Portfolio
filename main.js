const menuToggle = document.getElementById('hamburger');
const navBar = document.getElementById('navbar');
const overlay = document.getElementById('overlay');
const toggleBtn = document.getElementById('theme-toggle');
const html = document.documentElement;
const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const stars = [];

for (let i = 0; i < 200; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 2,
    speed: Math.random() * 0.5 + 0.2,
    opacity: Math.random()
  });
}

function drawStars() {
  stars.forEach(star => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${star.opacity})`;
    ctx.fill();

    // Move downward
    star.y += star.speed;

    // Twinkle
    star.opacity += (Math.random() - 0.5) * 0.03;
    star.opacity = Math.max(0.2, Math.min(1, star.opacity));

    // Reset when off screen
    if (star.y > canvas.height) {
      star.y = -5;
      star.x = Math.random() * canvas.width;
    }
  });
}

function drawCloud(cloud) {
  ctx.fillStyle = "rgba(245, 240, 255, 0.9)";

  ctx.beginPath();

  ctx.arc(cloud.x, cloud.y, 20, 0, Math.PI * 2);
  ctx.arc(cloud.x + 20, cloud.y - 10, 25, 0, Math.PI * 2);
  ctx.arc(cloud.x + 45, cloud.y, 20, 0, Math.PI * 2);
  ctx.arc(cloud.x + 15, cloud.y + 10, 18, 0, Math.PI * 2);
  ctx.arc(cloud.x + 35, cloud.y + 10, 18, 0, Math.PI * 2);

  ctx.fill();
}

const clouds = [];

for (let i = 0; i < 8; i++) {
  clouds.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height * 0.7,
    speed: Math.random() * 0.4 + 0.2
  });
}

function drawClouds() {
  clouds.forEach(cloud => {
    drawCloud(cloud);

    cloud.x += cloud.speed;

    if (cloud.x > canvas.width + 70) {
      cloud.x = -70;
      cloud.y = Math.random() * canvas.height * 0.8;
    }
  });
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const theme = html.getAttribute("data-theme");

  if (theme === "dark") {
    drawStars();
  } else {
    drawClouds();
  }

  if (!reduceMotion) requestAnimationFrame(animate);
}

animate();


function closeMenu() {
  navBar.classList.remove('active');
  overlay.classList.remove('active');
  document.body.classList.remove('no-scroll');
  menuToggle.setAttribute('aria-expanded', 'false');
}

menuToggle.addEventListener('click', () => {
  const isOpen = navBar.classList.toggle('active');
  overlay.classList.toggle('active');
  document.body.classList.toggle('no-scroll');
  menuToggle.setAttribute('aria-expanded', isOpen);
});

document.querySelectorAll('.navbar a').forEach(link => {
  link.addEventListener('click', closeMenu);
});

document.addEventListener('click', (e) => {
  if (!navBar.contains(e.target) && !menuToggle.contains(e.target)) {
    closeMenu();
  }
});


const sunSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <circle cx="12" cy="12" r="5"/>
  <g stroke="currentColor" stroke-width="2">
    <line x1="12" y1="1" x2="12" y2="4"/>
    <line x1="12" y1="20" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="6.34" y2="6.34"/>
    <line x1="17.66" y1="17.66" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="4" y2="12"/>
    <line x1="20" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="6.34" y2="17.66"/>
    <line x1="17.66" y1="6.34" x2="19.78" y2="4.22"/>
  </g>
</svg>
`;

const moonSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
</svg>
`;

const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

function setTheme(theme) {
  html.setAttribute("data-theme", theme);
  toggleBtn.innerHTML = theme === "dark" ? moonSVG : sunSVG;
  try { localStorage.setItem("theme", theme); } catch (e) {}
}

let savedTheme = null;
try { savedTheme = localStorage.getItem("theme"); } catch (e) {}
setTheme(savedTheme || (prefersDarkScheme.matches ? "dark" : "light"));

// Theme toggle
toggleBtn.addEventListener("click", () => {
  setTheme(html.getAttribute("data-theme") === "dark" ? "light" : "dark");
});


const animatedItems = document.querySelectorAll('.animate');
const heroItems = document.querySelectorAll('#hero .animate');


window.addEventListener('DOMContentLoaded', () => {
  heroItems.forEach(item => {
    item.classList.add('show');
  });
});


const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.2 });


animatedItems.forEach(item => {
  if (!item.closest('#hero')) {
    observer.observe(item);
  }
});

const form = document.querySelector("form");
const formStatus = document.getElementById("form-status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const button = form.querySelector("button");
  button.disabled = true;
  formStatus.textContent = "Sending...";

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" }
    });

    if (response.ok) {
      form.reset();
      formStatus.textContent = "Thank you! Your message has been sent.";
    } else {
      formStatus.textContent = "Something went wrong. Please try again or email me directly.";
    }
  } catch (error) {
    formStatus.textContent = "Something went wrong. Please try again or email me directly.";
  }

  button.disabled = false;
});

let year = document.getElementById('year');

year.textContent = new Date().getFullYear();


// Header gets a soft shadow once the page is scrolled
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 10);
});
