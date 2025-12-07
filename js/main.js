// =====================================================================
// 🛠️ CORE UTILITY FUNCTIONS
// =====================================================================

/**
 * Injects HTML content from a URL into a DOM element.
 * @param {string} id - The ID of the container element.
 * @param {string} url - The URL of the HTML component.
 * @param {function} [callback] - Optional function to run after injection.
 */
function inject(id, url, callback) {
  return fetch(url)
    .then(res => res.text())
    .then(html => {
      document.getElementById(id).innerHTML = html;
      if (typeof callback === "function") callback();
    });
}

/**
 * Pre-populates the 'images' array for each listing item
 * based on its 'folder' property.
 */
function generateImages() {
  listings.forEach(item => {
    item.images = [];
    // Assumes image names are like: folder (1).webp, folder (2).webp, ...
    for (let i = 1; i <= 15; i++) {
      item.images.push(`${item.folder} (${i}).webp`);
    }
  });
}
generateImages();


// =====================================================================
// 🖼️ LISTINGS & GALLERY DISPLAY
// =====================================================================

/**
 * Renders an array of listing items into the listing container.
 * @param {Array<Object>} items - The array of listings to display.
 */
function displayListings(items) {
  const container = document.getElementById("listingContainer");
  if (!container) return;

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

/**
 * Creates and opens the modal gallery for a given listing folder.
 * @param {string} folder - The folder name (used for image paths).
 */
function openGallery(folder) {
  let galleryHTML = `
        <div id="galleryModal" class="gallery-modal">
            <span class="close-modal">&times;</span>
            <div class="gallery-main">
                <img id="mainImage" src="${folder} (1).webp">
            </div>
            <div class="gallery-thumb-container">
    `;

  // Generate thumbnails (assuming 15 images)
  for (let i = 1; i <= 15; i++) {
    galleryHTML += `
            <img class="thumb ${i === 1 ? 'active-thumb' : ''}" 
                src="${folder} (${i}).webp" 
                onclick="changeImage(this)">
        `;
  }

  galleryHTML += `</div></div>`;

  document.body.insertAdjacentHTML("beforeend", galleryHTML);

  // Attach close listener to the new modal
  document.querySelector(".close-modal").onclick = () => {
    document.getElementById("galleryModal").remove();
  };
}

/**
 * Updates the main image in the gallery modal.
 * @param {HTMLElement} img - The clicked thumbnail element.
 */
function changeImage(img) {
  document.getElementById('mainImage').src = img.src;

  // Remove active from others and add to clicked one
  document.querySelectorAll('.thumb').forEach(t => t.classList.remove('active-thumb'));
  img.classList.add('active-thumb');
}

// Global listener for opening the gallery
document.addEventListener("click", e => {
  const galleryButton = e.target.closest(".open-gallery");
  if (galleryButton) {
    const folder = galleryButton.dataset.folder;
    openGallery(folder);
  }
});


// =====================================================================
// ⚙️ UI & ANIMATION INITIALIZATION
// =====================================================================

/**
 * Populates the dynamic dropdowns for the search form.
 */
function initSearchDropdowns() {
  // Location
  const locationSelect = document.getElementById("location");
  if (locationSelect) {
    locationSelect.innerHTML = `<option value="all">All Locations</option>`;
    locations.forEach(loc => {
      locationSelect.innerHTML += `<option value="${loc}">${loc}</option>`;
    });
  }

  // Property Type
  const typeSelect = document.getElementById("type");
  if (typeSelect) {
    typeSelect.innerHTML = `<option value="all">All Types</option>`;
    propertyTypes.forEach(t => {
      typeSelect.innerHTML += `<option value="${t.value}">${t.text}</option>`;
    });
  }

  // Bedrooms
  const bedSelect = document.getElementById("bedrooms");
  if (bedSelect) {
    bedroomOptions.forEach(b => {
      bedSelect.innerHTML += `<option value="${b.value}">${b.text}</option>`;
    });
  }

  // Bathrooms
  const bathSelect = document.getElementById("baths");
  if (bathSelect) {
    bathroomOptions.forEach(b => {
      bathSelect.innerHTML += `<option value="${b.value}">${b.text}</option>`;
    });
  }
}

/**
 * Initializes the Swiper component for the achievement section.
 */
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

/**
 * Sets up the Intersection Observer for the CTA gold line animation.
 */
function setupGoldLineAnimation() {
  const goldLine = document.querySelector(".gold-line");
  if (!goldLine) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          goldLine.classList.add("animate");
        } else {
          goldLine.classList.remove("animate");
        }
      });
    }, {
      threshold: 0.2,
    }
  );

  observer.observe(goldLine);
}

/**
 * Handles the 'active' class on navbar links upon click.
 */
function setupNavbarHoverState() {
  const navLinks = document.querySelectorAll('.nav-underline');

  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      // Prevent default hash/link jump behavior temporarily
      e.preventDefault();

      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');

      // Optional: Re-enable the link jump after setting active class
      const targetUrl = this.getAttribute('href');
      if (targetUrl && targetUrl !== '#') {
        window.location.href = targetUrl;
      }
    });
  });
}

/**
 * Initializes the seamless horizontal scroll animation for alliance logos.
 */
function initAffiScroll() {
  const wrapper = document.querySelector('.affi-logo-wrapper');
  const track = document.querySelector('.affi-logo');

  if (!wrapper || !track) {
    console.warn("affi-logo elements not found.");
    return;
  }

  // Duplicate items for seamless loop if not already done
  if (!track.dataset.duplicated) {
    const items = Array.from(track.children);
    items.forEach(el => track.appendChild(el.cloneNode(true)));
    track.dataset.duplicated = "true";
  }

  let speed = 1.2;
  let pos = 0;
  let rafID = null;
  let lastTime = null;

  const setX = (x) => {
    track.style.transform = `translateX(${x}px)`;
  };

  const animate = (timestamp) => {
    if (!lastTime) lastTime = timestamp;
    const dt = timestamp - lastTime;
    lastTime = timestamp;

    // Calculate movement normalized by time elapsed
    pos -= (speed * dt) / 16.6667;
    const halfWidth = track.offsetWidth / 2;

    // Reset position when half the track has scrolled past
    if (Math.abs(pos) >= halfWidth) {
      pos += halfWidth;
    }

    setX(pos);
    rafID = requestAnimationFrame(animate);
  };

  // Start animation
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
// 🔍 SEARCH LOGIC & HANDLERS
// =====================================================================

/**
 * Handles the main search and filtering process.
 */
function handleSearch() {
  let results = listings.slice(); // Create a shallow copy

  const location = document.getElementById("location").value;
  const type = document.getElementById("type").value;
  const beds = document.getElementById("bedrooms").value;
  const baths = document.getElementById("baths").value;
  const minP = document.getElementById("minPrice").value;
  const maxP = document.getElementById("maxPrice").value;
  const sortBy = document.getElementById("sortBy").value;

  // Helper function to robustly parse a number field from the item
  const getNumber = v => {
    const n = Number(v);
    return Number.isNaN(n) ? 0 : n;
  };

  results = results.filter(item => {
    // 1. Location & Type
    if (location !== "all" && !item.address.includes(location)) return false;
    if (type !== "all" && item.type !== type) return false;

    // 2. Bedrooms
    // Note: Simplified as options don't contain '+', assuming exact match needed if not "any"
    if (beds !== "any") {
      const wantBeds = parseInt(beds, 10);
      if (getNumber(item.bedrooms) !== wantBeds) return false;
    }

    // 3. Bathrooms
    // Note: Simplified as options don't contain '+', assuming exact match needed if not "any"
    if (baths !== "any") {
      const wantBaths = parseInt(baths, 10);
      if (getNumber(item.baths) !== wantBaths) return false;
    }

    // 4. Price Range
    const itemPrice = getNumber(item.price);
    const minPriceFilter = minP ? parseInt(minP, 10) : null;
    const maxPriceFilter = maxP ? parseInt(maxP, 10) : null;

    if (minPriceFilter !== null && itemPrice < minPriceFilter) return false;
    if (maxPriceFilter !== null && itemPrice > maxPriceFilter) return false;

    return true;
  });

  // 5. Sorting
  if (sortBy === "low") results.sort((a, b) => a.price - b.price);
  if (sortBy === "high") results.sort((a, b) => b.price - a.price);
  if (sortBy === "newest") results.reverse(); // Assuming 'newest' means reversing the default/data order

  const resultCountElement = document.getElementById("resultCount");
  const listingContainerElement = document.getElementById("listingContainer");

  // 6. Display Results
  if (!results.length) {
    listingContainerElement.innerHTML = `<p class="text-center py-5" style="font-size:18px;color:#ccc">No Listing Found</p>`;
    resultCountElement.innerHTML = `0 properties found`;
    return;
  }

  displayListings(results);

  // 7. Show Result Count
  resultCountElement.innerHTML =
    `<span class="gold-text">${results.length}</span> properties found`;
}

/**
 * Resets all search form filters to their default values.
 */
function resetFilters() {
  // Reset all form inputs to default values
  document.getElementById("location").value = "all";
  document.getElementById("type").value = "all";
  document.getElementById("bedrooms").value = "any";
  document.getElementById("baths").value = "any";
  document.getElementById("minPrice").value = "";
  document.getElementById("maxPrice").value = "";
  document.getElementById("sortBy").value = "default";

  // Redisplay all original listings
  displayListings(listings);

  // Reset result count display
  document.getElementById("resultCount").textContent = `${listings.length} properties found`;
}

/**
 * Initializes the event listeners for the search system.
 * This is passed as a callback to the search component injection.
 */
function initSearchSystem() {
  // Initial setup
  initSearchDropdowns();
  displayListings(listings);
  document.getElementById("resultCount").innerHTML = `<span class="gold-text">${listings.length}</span> properties found`;


  // Attach search and reset functions to buttons
  const searchBtn = document.getElementById("searchBtn");
  const resetBtn = document.getElementById("resetBtn");

  if (searchBtn) searchBtn.onclick = handleSearch;
  if (resetBtn) resetBtn.onclick = resetFilters;
}


// =====================================================================
// 🚀 MAIN ENTRY POINT
// =====================================================================

/**
 * Loads all HTML components asynchronously and initializes all scripts
 * once all components are loaded.
 */
function loadComponents() {
  return Promise.all([
    inject("navbar-container", "components/navbar.html"),
    inject("about-container", "components/about.html"),
    inject("achievement-container", "components/achievement.html"),
    // initSearchSystem runs after search-container is injected
    inject("search-container", "components/search.html", initSearchSystem),
    inject("alliance-container", "components/alliances.html"),
    inject("contact-container", "components/contact.html"),
    inject("footer-container", "components/footer.html"),
  ]).then(() => {
    console.log("Components Loaded");

    // Initialize UI/Animations that require components to be in the DOM
    initSwiper();
    setupGoldLineAnimation();
    setupNavbarHoverState();
    initAffiScroll();
  });
}

// Ensure all HTML elements are available before attempting to load components
document.addEventListener("DOMContentLoaded", loadComponents);