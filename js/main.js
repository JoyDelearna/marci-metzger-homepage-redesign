// =====================================================================
// --------------- LOAD COMPONENTS --------------------------------------
// =====================================================================

function loadComponents() {
  return Promise.all([
      inject("navbar-container", "components/navbar.html"),
      inject("achievement-container", "components/achievement.html"),
      inject("contact-container", "components/contact.html"),
      inject("footer-container", "components/footer.html"),
    ])
    .then(() => {
      console.log("Components Loaded");

      // Must run AFTER components exist
      initSwiper();
      setupGoldLineAnimation();
      setupNavbarHoverState();
    })
    .catch(err => console.error("Component Load Error:", err));
}

function inject(id, url) {
  return fetch(url)
    .then(res => res.text())
    .then(html => {
      document.getElementById(id).innerHTML = html;
    });
}


// =====================================================================
// --------------- NAVBAR ACTIVE LINK ----------------------------------
// =====================================================================

function setupNavbarHoverState() {
  const navLinks = document.querySelectorAll('.nav-underline');

  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });
}


// =====================================================================
// ---------------------- ACHIEVEMENT SWIPER ----------------------------
// =====================================================================

function initSwiper() {
  const swiperElement = document.querySelector(".mySwiper");
  if (!swiperElement) {
    console.warn("Swiper container not found!");
    return;
  }

  new Swiper(".mySwiper", {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 0,
    autoplay: {
      delay: 4500,
      disableOnInteraction: true,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
}


// =====================================================================
// --------------- CTA GOLD LINE ANIMATION ------------------------------
// =====================================================================

function setupGoldLineAnimation() {
  const goldLine = document.querySelector(".gold-line");
  if (!goldLine) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        goldLine.classList.add("animate");
        observer.unobserve(goldLine);
      }
    });
  });

  observer.observe(goldLine);
}


// =====================================================================
// --------------- DOM READY → LOAD EVERYTHING --------------------------
// =====================================================================

document.addEventListener("DOMContentLoaded", () => {
  loadComponents(); // load HTML components
});