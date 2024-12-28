document.addEventListener("DOMContentLoaded", () => {
  // Fetch data from the JSON file
  const relatedPackagesContainer = document.getElementById(
    "related-packages-container"
  );

  // Extract the destination title from the URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  const destinationTitle = urlParams.get("title");

  const BACKEND_URL =
    window.location.hostname === "127.0.0.1"
      ? "http://localhost:5000"
      : "https://api.tripinventor.in";

  console.log(destinationTitle);

  if (destinationTitle) {
    // Fetch the destination data for the current destination
    fetch(
      `${BACKEND_URL}/api/destinations?title=${encodeURIComponent(
        destinationTitle
      )}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((destinationData) => {
        if (destinationData && destinationData.location) {
          const currentLocation = destinationData.location.toLowerCase();

          // Fetch all destinations
          fetch(`${BACKEND_URL}/api/destinations`)
            .then((response) => {
              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
              return response.json();
            })
            .then((allDestinations) => {
              // Filter destinations with matching locations
              const relatedTours = allDestinations.filter(
                (dest) =>
                  dest.location &&
                  dest.location.toLowerCase() === currentLocation
              );

              if (relatedTours.length > 0) {
                relatedPackagesContainer.innerHTML = relatedTours
                  .map(
                    (pkg) => `
                              <div class="col-md-4 col-sm-6 col-xs-12 mb-4">
                                  <div class="trend-item">
                                      <div class="trend-image">
                                          <img src="${
                                            pkg.images[0] ||
                                            "https://via.placeholder.com/150"
                                          }" alt="${pkg.title}">
                                      </div>
                                      <div class="trend-content-main">
                                          <div class="trend-content">
                                              <h6 class="font-weight-normal"><i class="fa fa-map-marker-alt"></i> ${
                                                pkg.location || "Unknown"
                                              }</h6>
                                              <h4><a href="tour-details.html?title=${encodeURIComponent(
                                                pkg.title
                                              )}">${pkg.title}</a></h4>
                                          </div>
                                          <div class="trend-last-main">
            
                                            <p class="px-4 mb-2 border-t pt-2 desti_card_desc">${
                                            pkg.descriptions[0]
                                                ? pkg.descriptions[0]
                                                : "No Description Available."
                                            }</p> 

                                              <div class="trend-last d-flex align-items-center justify-content-between">
                                                  <p class="mb-0 white"><i class="fa fa-clock-o" aria-hidden="true"></i> ${
                                                    pkg.duration || "N/A"
                                                  }</p>
                                                  <div class="trend-price">
                                                      <p class="price white mb-0">From <span>${
                                                        pkg.price || "N/A"
                                                      }</span></p>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>`
                  )
                  .join("");
              } else {
                relatedPackagesContainer.innerHTML =
                  "<p>No related tours found for this location.</p>";
              }
            })
            .catch((error) => {
              console.error("Error fetching all destinations:", error);
              relatedPackagesContainer.innerHTML =
                "<p>Error loading related tours.</p>";
            });
        } else {
          relatedPackagesContainer.innerHTML =
            "<p>Unable to determine the location of this destination.</p>";
        }
      })
      .catch((error) => {
        console.error("Error fetching destination data:", error);
        relatedPackagesContainer.innerHTML =
          "<p>Error loading destination data.</p>";
      });
      
  } else {
    relatedPackagesContainer.innerHTML =
      "<p>No destination title specified in URL.</p>";
  }
});
