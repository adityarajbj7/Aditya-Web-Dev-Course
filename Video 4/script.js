const container = document.getElementById("bookmarkContainer");
const searchInput = document.getElementById("searchInput");
const themeSelect = document.getElementById("themeSelect");
const addBtn = document.getElementById("addBtn");

let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [
  { name: "Google", url: "https://google.com" },
  { name: "YouTube", url: "https://youtube.com" },
  { name: "Facebook", url: "https://facebook.com" },
  { name: "Instagram", url: "https://instagram.com" },
  { name: "Twitter", url: "https://twitter.com" },
  { name: "Wikipedia", url: "https://wikipedia.org" },
  { name: "Amazon", url: "https://amazon.in" },
  { name: "Netflix", url: "https://netflix.com" },
  { name: "LinkedIn", url: "https://linkedin.com" },
  { name: "GitHub", url: "https://github.com" }
];

function save() {
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

function render() {
  const searchTerm = searchInput.value.toLowerCase();
  container.innerHTML = "";

  bookmarks
    .filter(b => b.name.toLowerCase().includes(searchTerm))
    .forEach((b, index) => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <a href="${b.url}" target="_blank">${b.name}</a>
        <button class="delete-btn">X</button>
      `;

      card.querySelector(".delete-btn").onclick = () => {
        bookmarks.splice(index, 1);
        save();
        render();
      };

      container.appendChild(card);
    });
}

addBtn.onclick = () => {
  const name = document.getElementById("siteName").value;
  const url = document.getElementById("siteURL").value;

  if (!name || !url) return;

  bookmarks.push({ name, url });
  save();
  render();
};

searchInput.addEventListener("input", render);

themeSelect.onchange = () => {
  document.body.className = themeSelect.value;
  localStorage.setItem("theme", themeSelect.value);
};

const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  document.body.className = savedTheme;
  themeSelect.value = savedTheme;
}

render();

/* Particle Background */
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = Array.from({ length: 80 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  r: Math.random() * 3,
  dx: (Math.random() - 0.5),
  dy: (Math.random() - 0.5)
}));

function animate() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = "cyan";
  particles.forEach(p => {
    p.x += p.dx;
    p.y += p.dy;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
    ctx.fill();
  });
  requestAnimationFrame(animate);
}
animate();