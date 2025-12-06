// ---------------Navbar js start here -----------------------------//
const navLinks = document.querySelectorAll('.nav-underline');

navLinks.forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault(); // prevent default link behavior for demo

    // Remove active from all links
    navLinks.forEach(l => l.classList.remove('active'));

    // Add active to clicked link
    this.classList.add('active');
  });
});
// ---------------Navbar js end here -----------------------------//