// =====================================================================
// --------------- NAVBAR JS -------------------------------------------
// =====================================================================

document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll('.nav-underline');

  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // Load components after DOM is ready
  loadComponents();
});


// =====================================================================
// --------------- LOAD COMPONENTS (NAVBAR, CONTACT, FOOTER) ------------
// =====================================================================

function loadComponents() {
  Promise.all([
      inject("navbar-container", "components/navbar.html"),
      inject("contact-container", "components/contact.html"),
      inject("footer-container", "components/footer.html"),
    ])
    .then(() => {
      console.log("Components Loaded");
      setupGoldLineAnimation();
    })
    .catch(err => console.error("Component Load Error:", err));
}

function inject(id, url) {
  return fetch(url)
    .then(res => res.text())
    .then(html => {
      const container = document.getElementById(id);
      container.innerHTML = html;
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