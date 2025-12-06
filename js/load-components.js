document.addEventListener("DOMContentLoaded", () => {

    // Load Navbar
    fetch("components/navbar.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("navbar-container").innerHTML = data;
        });

    // Load Footer
    fetch("components/footer.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("footer-container").innerHTML = data;
        });

});