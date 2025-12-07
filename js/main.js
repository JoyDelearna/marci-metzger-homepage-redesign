// =====================================================================
// LOAD COMPONENTS
// =====================================================================

function loadComponents() {
  return Promise.all([
    inject("navbar-container", "components/navbar.html"),
    inject("about-container", "components/about.html"),
    inject("achievement-container", "components/achievement.html"),
    inject("search-container", "components/search.html", initSearchSystem),
    inject("alliance-container", "components/alliances.html"),
    inject("contact-container", "components/contact.html"),
    inject("footer-container", "components/footer.html"),
  ]).then(() => {
    console.log("Components Loaded");

    initSwiper();
    setupGoldLineAnimation();
    setupNavbarHoverState();
    initAffiScroll();

    // Load dynamic dropdowns
    initSearchDropdowns();

    // Load listings
    displayListings(listings);

    // Attach search function
    document.getElementById("searchBtn").addEventListener("click", handleSearch);
  });
}

// Updated inject() — now supports callback!
function inject(id, url, callback) {
  return fetch(url)
    .then(res => res.text())
    .then(html => {
      document.getElementById(id).innerHTML = html;
      if (typeof callback === "function") callback(); // <-- now works
    });
}

// =====================================================================
// SEARCH ALL INITIALIZATION
// =====================================================================

function initSearchSystem() {
  displayListings(listings);

  document.getElementById("searchBtn").onclick = handleSearch;
  document.getElementById("resetBtn").onclick = resetFilters;
}

function resetFilters() {
  document.getElementById("location").value = "all";
  document.getElementById("type").value = "all";
  document.getElementById("bedrooms").value = "any";
  document.getElementById("baths").value = "any";
  document.getElementById("minPrice").value = "";
  document.getElementById("maxPrice").value = "";
  document.getElementById("sortBy").value = "default";

  displayListings(listings);
  document.getElementById("resultCount").textContent = "";
}

// =====================================================================
// DROPDOWN INITIALIZATION
// =====================================================================

function initSearchDropdowns() {
  // Location
  const locationSelect = document.getElementById("location");
  locationSelect.innerHTML = `<option value="all">All Locations</option>`;
  locations.forEach(loc => {
    locationSelect.innerHTML += `<option value="${loc}">${loc}</option>`;
  });

  // Property Type
  const typeSelect = document.getElementById("type");
  typeSelect.innerHTML = `<option value="all">All Types</option>`;
  propertyTypes.forEach(t => {
    typeSelect.innerHTML += `<option value="${t.value}">${t.text}</option>`;
  });

  // Bedrooms
  const bedSelect = document.getElementById("bedrooms");
  bedroomOptions.forEach(b => {
    bedSelect.innerHTML += `<option value="${b.value}">${b.text}</option>`;
  });

  // Bathrooms
  const bathSelect = document.getElementById("baths");
  bathroomOptions.forEach(b => {
    bathSelect.innerHTML += `<option value="${b.value}">${b.text}</option>`;
  });
}

function generateImages() {
  listings.forEach(item => {
    item.images = [];
    for (let i = 1; i <= 15; i++) {
      item.images.push(`${item.folder} (${i}).webp`);
    }
  });
}
generateImages();


// =====================================================================
// DISPLAY LISTINGS
// =====================================================================

function displayListings(items) {
  const container = document.getElementById("listingContainer");
  container.innerHTML = "";

  items.forEach(item => {
    const cover = item.images[0]; // first image is cover

    container.innerHTML += `
      <div class="col-lg-3 col-md-6 listing-item">
        <div class="card listing-card shadow-sm border-0 open-gallery" data-folder="${item.folder}">
            <img src="${cover}" class="card-img-top" alt="${item.title}">
            <div class="card-body">
                <h5 class="property-price gold-text paragraph">$${item.price.toLocaleString()}</h5>
                <p class="light-blue-text paragraph-2 mb-2">${item.address}</p>
                <p class="property-details small text-muted">${item.details}</p>
            </div>
        </div>
      </div>
    `;
  });
}

document.addEventListener("click", e => {
  if (e.target.closest(".open-gallery")) {
    const folder = e.target.closest(".open-gallery").dataset.folder;
    openGallery(folder);
  }
});

function openGallery(folder) {
  let galleryHTML = `
      <div id="galleryModal" class="gallery-modal">
        <span class="close-modal">&times;</span>
        <div class="gallery-main">
          <img id="mainImage" src="${folder} (1).webp">
        </div>
        <div class="gallery-thumb-container">
  `;

  for (let i = 1; i <= 15; i++) {
    galleryHTML += `
      <img class="thumb ${i === 1 ? 'active-thumb' : ''}" 
           src="${folder} (${i}).webp" 
           onclick="changeImage(this)">
    `;
  }

  galleryHTML += `</div></div>`;

  document.body.insertAdjacentHTML("beforeend", galleryHTML);

  document.querySelector(".close-modal").onclick = () => {
    document.getElementById("galleryModal").remove();
  };
}

function changeImage(img) {
  document.getElementById('mainImage').src = img.src;

  // Remove active from others
  document.querySelectorAll('.thumb').forEach(t => t.classList.remove('active-thumb'));

  // Add active to clicked one
  img.classList.add('active-thumb');
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

  let speed = 1.2; // adjust for faster/slower
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
// SEARCH FUNCTION
// =====================================================================

function handleSearch() {
  let results = listings.slice(); // copy

  const location = document.getElementById("location").value;
  const type = document.getElementById("type").value;
  const beds = document.getElementById("bedrooms").value; // e.g. "any", "1", "3+"
  const baths = document.getElementById("baths").value; // e.g. "any", "2", "1+"
  const minP = document.getElementById("minPrice").value;
  const maxP = document.getElementById("maxPrice").value;
  const sort = document.getElementById("sortBy").value;

  // helper: parse a field value from the item robustly
  const getNumber = v => {
    const n = Number(v);
    return Number.isNaN(n) ? 0 : n;
  };

  results = results.filter(item => {
    // location & type same as before
    if (location !== "all" && !item.address.includes(location)) return false;
    if (type !== "all" && item.type !== type) return false;

    // bedrooms: exact match for "1","2"... ; range match for "3+"
    if (beds !== "any") {
      if (beds.endsWith('+')) {
        const minBeds = parseInt(beds, 10);
        if (getNumber(item.bedrooms) < minBeds) return false;
      } else {
        const wantBeds = parseInt(beds, 10);
        if (getNumber(item.bedrooms) !== wantBeds) return false;
      }
    }

    // baths: same logic
    if (baths !== "any") {
      if (baths.endsWith('+')) {
        const minBaths = parseInt(baths, 10);
        if (getNumber(item.baths) < minBaths) return false;
      } else {
        const wantBaths = parseInt(baths, 10);
        if (getNumber(item.baths) !== wantBaths) return false;
      }
    }

    // price
    if (minP && getNumber(item.price) < parseInt(minP, 10)) return false;
    if (maxP && getNumber(item.price) > parseInt(maxP, 10)) return false;

    return true;
  });

  // Sorting
  if (sortBy === "low") results.sort((a, b) => a.price - b.price);
  if (sortBy === "high") results.sort((a, b) => b.price - a.price);
  if (sortBy === "newest") results.reverse();

  // No results
  if (!results.length) {
    document.getElementById("listingContainer").innerHTML = `<p class="text-center py-5" style="font-size:18px;color:#ccc">No Listing Found</p>`;
    document.getElementById("resultCount").innerHTML = `0 properties found`;
    return;
  }

  displayListings(results);

  // Show Result Count
  document.getElementById("resultCount").innerHTML =
    `<span class="gold-text">${results.length}</span> properties found`;
}

// =====================================================================
// DOM READY
// =====================================================================

document.addEventListener("DOMContentLoaded", loadComponents);