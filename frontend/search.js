document.addEventListener("DOMContentLoaded", () => {
  const searchTrigger = document.getElementById("searchTrigger");
  const searchPanel = document.getElementById("searchPanel");
  const overlay = document.getElementById("overlay");
  const searchTitle = document.getElementById("searchTitle");
  const searchResults = document.getElementById("searchResults");

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
    try {
      const response = await fetch(`${BACKEND_URL}/api/destinations`);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      allData = await response.json();
      renderCards(allData); // Render all cards initially
    } catch (error) {
      console.error("Error fetching data:", error);
      searchResults.innerHTML = "<p>Failed to load data. Please try again later.</p>";
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
        <div class="searchCard">
            ${
              item.discount
                ? `<div class="ribbon ribbon-top-left"><span>${item.discount}% OFF</span></div>`
                : ""
            }
            <div class="searchCardImg">
              <a href="destinations.html?title=${encodeURIComponent(item.title)}">
                <img src=${item.images[0]} alt="Searc-card-imag" />
              </a>
            </div>
            <div class="searchCardBody mt-2">
              <div class="blog-content p-0">
                <h4 class="mb-1">
                  <a href="destinations.html?title=${encodeURIComponent(item.title)}">${item.title}</a>
                </h4>
                <p class="mb-2 pink">
                  <i class="fa fa-map-marker mr-1"></i> ${item.location}.
                </p>
                <p class="mb-2 border-t pt-2 desti_card_desc">${item.descriptions[0] || "No description available."}</p>
                <div class="deal-price">
                  <p class="price mb-0">From <span>₹ ${item.price}</span>/- (${item.duration})</p>
                </div>
              </div>
            </div>
        </div>`;
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
