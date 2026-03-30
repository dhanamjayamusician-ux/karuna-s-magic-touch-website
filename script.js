const revealItems = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
    rootMargin: "0px 0px -40px 0px"
  }
);

revealItems.forEach((item) => revealObserver.observe(item));

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const targetId = anchor.getAttribute("href");
    const target = document.querySelector(targetId);

    if (!target) {
      return;
    }

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

const reviewSlider = document.querySelector("[data-review-slider]");
const themeToggle = document.querySelector("[data-theme-toggle]");
const themeStorageKey = "karunas-magic-touch-theme";

if (themeToggle) {
  const themeLabel = themeToggle.querySelector(".theme-toggle-label");

  const applyTheme = (theme) => {
    const isDark = theme === "dark";
    document.body.classList.toggle("theme-dark", isDark);
    themeToggle.setAttribute("aria-pressed", String(isDark));

    if (themeLabel) {
      themeLabel.textContent = isDark ? "Light mode" : "Dark mode";
    }
  };

  const savedTheme = window.localStorage.getItem(themeStorageKey);
  applyTheme(savedTheme === "dark" ? "dark" : "light");

  themeToggle.addEventListener("click", () => {
    const nextTheme = document.body.classList.contains("theme-dark") ? "light" : "dark";
    window.localStorage.setItem(themeStorageKey, nextTheme);
    applyTheme(nextTheme);
  });
}

if (reviewSlider) {
  const slides = Array.from(reviewSlider.querySelectorAll(".review-slide"));
  const dots = Array.from(reviewSlider.querySelectorAll(".slider-dot"));
  let activeIndex = 0;
  let intervalId;

  const showSlide = (index) => {
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === index);
    });

    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === index);
    });

    activeIndex = index;
  };

  const startSlider = () => {
    intervalId = window.setInterval(() => {
      const nextIndex = (activeIndex + 1) % slides.length;
      showSlide(nextIndex);
    }, 4200);
  };

  const stopSlider = () => {
    window.clearInterval(intervalId);
  };

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      stopSlider();
      showSlide(index);
      startSlider();
    });
  });

  reviewSlider.addEventListener("mouseenter", stopSlider);
  reviewSlider.addEventListener("mouseleave", startSlider);

  showSlide(activeIndex);
  startSlider();
}
