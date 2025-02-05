document.addEventListener("DOMContentLoaded", () => {
  // Fetch data from the JSON file
  const relatedPackagesContainerSidebar = document.getElementById(
    "related-packages-container-sidebar"
  );
  const relatedPackagesContainer = document.getElementById(
    "related-packages-container"
  );
  const sidebarRelated = document.querySelector(".sidebar-related");
  const mainSection = document.querySelector(".trending.destination");
  const sidebarContainer = document.querySelector(".sidebar .trend-box .row");
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
              function sidebarrenderCards(relatedTours) {
                return (relatedPackagesContainerSidebar.innerHTML = relatedTours
                  .map(
                    (pkg) => `
                           
                                <div class="trend-item w-100 m-0 p-0">
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
                                            <h4><a href="../destinations.html?title=${encodeURIComponent(
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
                                                    <h3 class="price white mb-0"> <span>${
                                                      pkg.price || "N/A"
                                                    }</span></h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `
                  )
                  .join(""));
              }
              function renderCards(relatedTours) {
                return (relatedPackagesContainer.innerHTML = relatedTours
                  .map(
                    (pkg) => `
              <div class="col-md-4 col-sm-6 col-xs-12 mb-4">
                  <div class="trend-item">
                      <div class="trend-image">
                          <img src="${
                            pkg.images[0] || "https://via.placeholder.com/150"
                          }" alt="${pkg.title}">
                      </div>
                      <div class="trend-content-main">
                          <div class="trend-content">
                              <h6 class="font-weight-normal"><i class="fa fa-map-marker-alt"></i> ${
                                pkg.location || "Unknown"
                              }</h6>
                              <h4><a href="../destinations.html?title=${encodeURIComponent(
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
                  .join(""));
              }
              if (relatedTours.length > 1) {
                // Display in the main section
                mainSection.style.display = "block";
                relatedPackagesContainer.innerHTML = renderCards(relatedTours);
                sidebarRelated.style.display = "none";
              } else if (relatedTours.length === 1) {
                // Hide main section and move tour to sidebar
                mainSection.style.display = "none";
                sidebarContainer.innerHTML = sidebarrenderCards(relatedTours);
              } else {
                // Hide both if no related tours
                mainSection.style.display = "none";
                sidebarRelated.style.display = "none";
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
