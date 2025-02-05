document.addEventListener("DOMContentLoaded", () => {
  const searchTrigger = document.getElementById("searchTrigger");
  const searchPanel = document.getElementById("searchPanel");
  const overlay = document.getElementById("overlay");
  const searchTitle = document.getElementById("searchTitle");
  const searchResults = document.getElementById("searchResults");
  const preloader = document.getElementById("searchPreloader");  // Preloader element

 
  // Backend URL
  const BACKEND_URL =
    window.location.hostname === "127.0.0.1"
      ? "http://localhost:5000"
      : "https://api.tripinventor.in";
 
  let allData = []; // Store all data for filtering
 
  // Show the search panel and overlay
  searchTrigger.addEventListener("click", () => {
    searchPanel.style.display = "block";
    overlay.style.display = "block";
    document.body.style.overflow = "hidden";
    if (allData.length === 0) fetchAllDestinations(); // Fetch data only if not already loaded
  });
 
  // Hide the search panel and overlay when clicking outside
  overlay.addEventListener("click", () => {
    searchPanel.style.display = "none";
    overlay.style.display = "none";
    document.body.style.overflow = "auto";
  });
 
  // Fetch all destinations once
  const fetchAllDestinations = async () => {
    // Show preloader
    preloader.style.display = "block";  // Show the preloader

    try {
      const response = await fetch(`${BACKEND_URL}/api/destinations`);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      allData = await response.json();
      renderCards(allData); // Render all cards initially
    } catch (error) {
      console.error("Error fetching data:", error);
      searchResults.innerHTML = "<p>Failed to load data. Please try again later.</p>";
    } finally {
      // Hide preloader after rendering
      preloader.style.display = "none";  // Hide the preloader
    }
  };
 
  // Render cards based on data
  const renderCards = (data) => {
    searchResults.innerHTML = ""; // Clear previous results
    if (data.length === 0) {
      searchResults.innerHTML = "<p>No results found.</p>";
      return;
    }
    data.forEach((item) => {
      const card = `
        <a href="destinations.html?title=${encodeURIComponent(item.title)}" class="searchCard">
            ${
              item.discount
                ? `<div class="ribbon ribbon-top-left"><span>${item.discount}% OFF</span></div>`
                : ""
            }
            <div class="searchCardImg">
              <div>
                <img src=${item.images[0]} "alt="Search-card-imag" />
              </div>
            </div>
            <div class="searchCardBody mt-2">
              <div class="blog-content p-0">
                <h4 class="mb-1">
                  <div>${item.title}</div>
                </h4>
                <p class="mb-2 ">
                  <i class="fa-solid fa-location-dot mr-3 pink"></i> ${item.location}  <span class="ml-3 fw-bold">(${item.duration})</span>
                </p>
                <p class="mb-2 border-t pt-2 desti_card_desc">${item.descriptions[0] || "No description available."}</p>
                <div class="deal-price">
                  <p class="price mb-0">₹ ${item.price}</p>
                </div>
              </div>
            </div>
        </a>`;
      searchResults.insertAdjacentHTML("beforeend", card);
    });
  };
 
  // Filter and render results dynamically
  searchTitle.addEventListener("input", () => {
    const query = searchTitle.value.trim().toLowerCase();
    const filteredData = query
      ? allData.filter((item) => item.title.toLowerCase().includes(query))
      : allData; // Show all data if input is cleared
    renderCards(filteredData);
  });
});
 