document.addEventListener("DOMContentLoaded", () => {
  const mobileBtn = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");

  mobileBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });

  document.addEventListener("click", (e) => {
    if (!mobileMenu.contains(e.target) && !mobileBtn.contains(e.target)) {
      mobileMenu.classList.add("hidden");
    }
  });

  // Intersection Observer for reveal animation
  const revealElements = document.querySelectorAll(".animate-reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-reveal-active");
        }
      });
    },
    { threshold: 0.5 }
  );

  revealElements.forEach(el => observer.observe(el));
});
