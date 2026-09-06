// ==========================================
// 1. Dark / Light Mode Toggle Logic
// ==========================================
const themeToggleBtn = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const htmlElement = document.documentElement;

function updateIcon() {
  if (htmlElement.classList.contains("dark")) {
    themeIcon.classList.remove("fa-moon", "text-slate-600");
    themeIcon.classList.add("fa-sun", "text-yellow-400");
  } else {
    themeIcon.classList.remove("fa-sun", "text-yellow-400");
    themeIcon.classList.add("fa-moon", "text-slate-600");
  }
}

// Check local storage for preference, default to dark
if (localStorage.getItem("color-theme") === "light") {
  htmlElement.classList.remove("dark");
} else {
  htmlElement.classList.add("dark");
}
updateIcon();

themeToggleBtn.addEventListener("click", function () {
  htmlElement.classList.toggle("dark");
  if (htmlElement.classList.contains("dark")) {
    localStorage.setItem("color-theme", "dark");
  } else {
    localStorage.setItem("color-theme", "light");
  }
  updateIcon();
});

// ==========================================
// 2. Multi-Gradient Theme Logic
// ==========================================
const gradientBtn = document.getElementById("gradient-toggle");
const bodyElement = document.getElementById("body-theme");

// Define gradient states using Tailwind utility classes
// Designed to look good in both light and dark modes
const gradients = [
  "bg-slate-50 dark:bg-sfdark", // Default Flat
  "bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-[#0b1121] dark:to-blue-950", // Ocean
  "bg-gradient-to-tr from-slate-100 to-slate-200 dark:from-[#0b1121] dark:to-slate-900", // Graphite
  "bg-gradient-to-br from-purple-50 to-fuchsia-100 dark:from-[#0b1121] dark:to-purple-950", // Cosmic
];

let currentGradient = 0;

gradientBtn.addEventListener("click", () => {
  // Strip old classes
  const oldClasses = gradients[currentGradient]
    .split(" ")
    .filter((c) => c !== "");
  oldClasses.forEach((cls) => bodyElement.classList.remove(cls));

  // Increment loop
  currentGradient = (currentGradient + 1) % gradients.length;

  // Add new classes
  const newClasses = gradients[currentGradient]
    .split(" ")
    .filter((c) => c !== "");
  newClasses.forEach((cls) => bodyElement.classList.add(cls));
});

// ==========================================
// 3. Scroll Animations (Intersection Observer)
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.15,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll(".fade-in-up");
  animatedElements.forEach((el) => observer.observe(el));
});
