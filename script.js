const headerNav = document.querySelector(".header__navigation");
const headerMenuBtn = document.querySelector(".header__menu-btn");
const allLinks = document.querySelectorAll("a:link");
const heroSectionEl = document.querySelector(".section-hero");
const featuredSectionEl = document.querySelector(".section-featured");
const body = document.body;
const appImages = document.querySelectorAll("img.how__img");

headerMenuBtn.addEventListener("click", (event) => {
  event.preventDefault();
  body.classList.toggle("menu-active");
});

if (window.innerWidth <= 768) {
  headerNav.addEventListener("click", (event) => {
    if (event.target.classList.contains("header__navigation")) {
      body.classList.remove("menu-active");
    }
  });
}

allLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const href = link.getAttribute("href");

    if (href === "#") {
      event.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    if (href !== "#" && href.startsWith("#")) {
      event.preventDefault();
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }
  });
});

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    ("");

    if (!ent.isIntersecting) {
      body.classList.add("sticky");
    }

    if (ent.isIntersecting) {
      body.classList.remove("sticky");
    }
  },
  {
    threshold: 0,
    rootMargin: "-96px",
  }
);

const featuredObserver = new IntersectionObserver(
  (entries) => {
    const entry = entries[0];
    entry.target
      .querySelector(".featured")
      .classList.toggle("show", entry.isIntersecting);
  },
  {
    threshold: 0.7,
  }
);

const appImgObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("show", entry.isIntersecting);
    });
  },
  {
    threshold: 0,
    rootMargin: "90px",
  }
);

featuredObserver.observe(featuredSectionEl);
obs.observe(heroSectionEl);
appImages.forEach((image) => {
  appImgObserver.observe(image);
});
