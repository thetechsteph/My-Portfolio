const menuToggle = document.getElementById('hamburger');
const navBar = document.getElementById('navbar');
const overlay = document.getElementById('overlay');
const toggleBtn = document.getElementById('theme-toggle');
const html = document.documentElement;
const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");

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

  requestAnimationFrame(animate);
}

animate();


menuToggle.addEventListener('click', () => {
  navBar.classList.toggle('active');
  overlay.classList.toggle('active');
  document.body.classList.toggle('no-scroll');
});


document.querySelectorAll('.navbar a').forEach(link => {
  link.addEventListener('click', () => {
    navBar.classList.remove('active');
    overlay.classList.remove('active');
    document.body.classList.remove('no-scroll');
  });
});


document.addEventListener('click', (e) => {
  if (!navBar.contains(e.target) && !menuToggle.contains(e.target)) {
    navBar.classList.remove('active');
    overlay.classList.remove('active');
    document.body.classList.remove('no-scroll');
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

if (prefersDarkScheme.matches) {
  html.setAttribute("data-theme", "dark");
  toggleBtn.innerHTML = moonSVG;
} else {
  html.setAttribute("data-theme", "light");
  toggleBtn.innerHTML = sunSVG;
}


// Theme toggle
toggleBtn.addEventListener("click", () => {
  const currentTheme = html.getAttribute("data-theme");
  if (currentTheme === "dark") {
    html.setAttribute("data-theme", "light");
    toggleBtn.innerHTML = sunSVG;
  } else {
    html.setAttribute("data-theme", "dark");
    toggleBtn.innerHTML = moonSVG;
  }
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

const meters = document.querySelectorAll('.meter-fill');

const skillsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const percent = entry.target.getAttribute('data-percent');
      entry.target.style.width = percent + '%';
    } 
  });
}, { threshold: 0.5 });

meters.forEach(meter => skillsObserver.observe(meter));






const form = document.querySelector("form");


form.addEventListener("submit", function (e) {
  
    setTimeout(() => {
        
        form.reset();
    }, 1000); 
});

let year  = document.getElementById('year');

year.textContent = new Date().getFullYear()