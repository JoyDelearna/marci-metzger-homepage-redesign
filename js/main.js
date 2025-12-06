// =====================================================================
// --------------- LOAD COMPONENTS --------------------------------------
// =====================================================================

function loadComponents() {
  return Promise.all([
      inject("navbar-container", "components/navbar.html"),
      inject("about-container", "components/about.html"),
      inject("achievement-container", "components/achievement.html"),
      inject("search-container", "components/search.html"),
      inject("alliance-container", "components/alliances.html"),
      inject("contact-container", "components/contact.html"),
      inject("footer-container", "components/footer.html"),
    ])
    .then(() => {
      console.log("Components Loaded");

      // Run AFTER components exist
      initSwiper();
      setupGoldLineAnimation();
      setupNavbarHoverState();
      initAffiScroll();
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
// --------------- ALLIANCE SCROLL ANIMATION ----------------------------
// =====================================================================

function initAffiScroll() {
  const wrapper = document.querySelector('.affi-logo-wrapper');
  const track = document.querySelector('.affi-logo');

  if (!wrapper || !track) {
    console.warn("affi-logo not found yet.");
    return;
  }

  // Duplicate items for seamless loop
  if (!track.dataset.duplicated) {
    const items = Array.from(track.children);
    items.forEach(el => track.appendChild(el.cloneNode(true)));
    track.dataset.duplicated = "true";
  }

  let speed = 0.6; // adjust for faster/slower
  let pos = 0;
  let rafID = null;
  let lastTime = null;

  function setX(x) {
    track.style.transform = `translateX(${x}px)`;
  }

  function animate(timestamp) {
    if (!lastTime) lastTime = timestamp;
    const dt = timestamp - lastTime;
    lastTime = timestamp;

    // Move LEFT → decrease X
    pos -= (speed * dt) / 16.6667;

    const halfWidth = track.offsetWidth / 2;

    // When scrolled past half the width, loop back
    if (Math.abs(pos) >= halfWidth) {
      pos += halfWidth;
    }

    setX(pos);

    rafID = requestAnimationFrame(animate);
  }

  // Start
  track.style.willChange = "transform";
  if (!rafID) rafID = requestAnimationFrame(animate);

  // Pause on hover
  wrapper.addEventListener("mouseenter", () => {
    cancelAnimationFrame(rafID);
    rafID = null;
    lastTime = null;
  });

  wrapper.addEventListener("mouseleave", () => {
    if (!rafID) rafID = requestAnimationFrame(animate);
  });
}

// =====================================================================
// --------------- DOM READY → LOAD EVERYTHING --------------------------
// =====================================================================

document.addEventListener("DOMContentLoaded", () => {
  loadComponents(); // load HTML components
});