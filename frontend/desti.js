document.addEventListener("DOMContentLoaded", () => {
  // Fetch data from the JSON file

  const destinationContainer = document.getElementById(
    "desination-content-dynamic"
  );

  // Extract the destination title from the URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  const destinationTitle = urlParams.get("title");

  // var destinationInputTitle = document.querySelector("#destinationInputTitle input").value; // Grab current value
  // destinationInputTitle = destinationTitle;

  const titleElements = document.getElementsByClassName("singleDPageTitle");
  for (let element of titleElements) {
    element.innerText = destinationTitle;
  }

  const destinationInputTitle = document.getElementsByClassName(
    "destinationInputTitle"
  );
  const destinationHiddenInput = document.getElementById(
    "destinationHiddenInput"
  );
  for (let element of destinationInputTitle) {
    element.innerText = destinationTitle;
  }
  destinationHiddenInput.value = destinationTitle; // Hidden input value

  const BACKEND_URL =
    window.location.hostname === "127.0.0.1"
      ? "http://localhost:5000"
      : "https://api.tripinventor.in";

  if (destinationTitle) {
    // fetch("destination.json")
    // Replace JSON fetch with API call
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
        // const destinationData = data.find(destination => destination.title === decodeURIComponent(destinationTitle));
        if (destinationData) {
          destinationContainer.innerHTML = `
                          <div class="single-full-title border-b mb-2 pb-2">
                            <div class="single-title">
                                <h3 class="mb-1">${
                                  destinationData.title || "N/A"
                                }</h3>
                                <div class="rating-main d-sm-flex align-items-center">
                                    <p class="mb-0 mr-2"><i class="flaticon-location-pin"></i>${
                                      destinationData.location || "N/A"
                                    }</p>
                                    <div class="review-summary mr-2">
                                        <div id="averageRatingStars" class="rating">
                                            <!-- Stars will be dynamically added here -->
                                        </div>
                                        
                                    </div>
                                    <span id="totalReviews">(0 Reviews)</span>
                                </div>
                            </div>
                          </div>

                            <div class="carousel-container">
                                        <div class="carousel-slide">
                                        ${destinationData.images
                                          .map(
                                            (item) => `
                                                    <img src=${
                                                      item ||
                                                      "https://t4.ftcdn.net/jpg/00/65/48/25/360_F_65482539_C0ZozE5gUjCafz7Xq98WB4dW6LAhqKfs.jpg"
                                                    } alt="Slides Image">
                                                `
                                          )
                                          .join("")}
                                        </div>
                                        <div class="carousel-controls">
                                            <button id="prevBtn">&lt;</button>
                                            <button id="nextBtn">&gt;</button>
                                        </div>
                                        <div class="carousel-indicators">
                                        ${destinationData.images
                                          .map(
                                            (index) => `
                                                <div data-index="${index}" class="${
                                              index === 0 ? "active" : ""
                                            }"></div>
                                                 `
                                          )
                                          .join("")}
                                        </div>  
                            </div>
                          




                          <div class="tour-includes mb-4">
                            <table>
                                <tbody>
                                    <tr>
                                        <td><i class="fa fa-clock-o pink mr-1" aria-hidden="true"></i> Duration: ${
                                          destinationData?.duration ||
                                          "N/A"
                                        }</td>
                                        
                                        <td><i class="fa fa-file-alt pink mr-1" aria-hidden="true"></i> Langauge -
                                            ${
                                              destinationData?.languages
                                            }</td>
                                    </tr>
                                    <tr>
                                        <td><i class="fa fa-map-signs pink mr-1" aria-hidden="true"></i> Pickup Location :
                                            ${
                                              destinationData?.pickupLocation
                                            }</td>
                                        <td><i class="fa fa-group pink mr-1" aria-hidden="true"></i> Package Cost : ${
                                          destinationData?.price
                                        } /- (INR)
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                          </div>

                          <div class="description mb-2">
                            <h4>Description</h4>
                            <p>${
                              destinationData?.descriptions.join(`<br>`) ||
                              "No Description Available"
                            }</p>
                          </div>

                          <div class="description mb-2">
                            <div class="row">
                                <div class="col-lg-6 col-md-6 mb-2 pr-2">
                                    <div class="desc-box">
                                        <h5 class="mb-1">Inclusions</h5>
                                        <ul>
                                            ${destinationData?.additionalInfo?.includes
                                              .map(
                                                (item) =>
                                                  `<li><i class="fa fa-check pink mr-1"></i> ${item}</li>`
                                              )
                                              .join("")}
                                        </ul>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6 mb-2 pl-2">
                                    <div class="desc-box">
                                        <h5 class="mb-1">Exclusions</h5>
                                        <ul>
                                            ${destinationData?.additionalInfo?.excludes
                                              .map(
                                                (item) =>
                                                  `<li><i class="fa fa-close pink mr-1"></i> ${item}</li>`
                                              )
                                              .join("")}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                          </div>
                          

                                  <div class="accordion-wrapper">
                                    ${destinationData.itinerary
                                      .map(
                                        (item, index) => `
                                            <div class="accordion-outer">
                                                <div class="accordion-heading">
                                                    <span>${
                                                      item.day
                                                    }</span> - ${item.title}
                                                </div>
                                                <div class="accordion-contentt">
                                                    <div class="accordion-inner">
                                                        <div class="accordion-inner__inner">
                                                            <p>${item?.content?.join(
                                                              `<br><br>`
                                                            )}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        `
                                      )
                                      .join("")}
                                  </div>
                          
      `;

          const carouselSlide = document.querySelector(".carousel-slide");
          const carouselIndicators = document.querySelectorAll(
            ".carousel-indicators div"
          );
          let currentIndex = 0;

          // Update the carousel to show the current slide
          function updateCarousel() {
            const slideWidth = carouselSlide.clientWidth;
            carouselSlide.style.transform = `translateX(-${
              currentIndex * slideWidth
            }px)`;

            // Update active indicator
            carouselIndicators.forEach((indicator, index) => {
              indicator.classList.toggle("active", index === currentIndex);
            });
          }

          // Event listeners for controls
          document.getElementById("prevBtn").addEventListener("click", () => {
            currentIndex =
              currentIndex > 0
                ? currentIndex - 1
                : carouselIndicators.length - 1;
            updateCarousel();
          });

          document.getElementById("nextBtn").addEventListener("click", () => {
            currentIndex =
              currentIndex < carouselIndicators.length - 1
                ? currentIndex + 1
                : 0;
            updateCarousel();
          });

          // Event listeners for indicators
          carouselIndicators.forEach((indicator, index) => {
            indicator.addEventListener("click", () => {
              currentIndex = index;
              updateCarousel();
            });
          });

          // Adjust carousel on window resize
          window.addEventListener("resize", updateCarousel);

          // Initialize the carousel
          updateCarousel();
        } else {
          destinationContainer.innerHTML = "<p> Destionation not found.</p>";
        }
      })
      .catch((error) => {
        console.error("Error loading blog:", error);
        destinationContainer.innerHTML =
          "<p>Error loading destinaion information.</p>";
      });
  } else {
    destinationContainer.innerHTML =
      "<p>No destination title specified in URL.</p>";
  }
});

document
  .querySelector(".bookingForm form")
  .addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent the default form submission

    const formData = {
      name: document.querySelector("input[placeholder='Your Name']").value,
      email: document.querySelector("input[placeholder='Your Email']").value,
      phone: document.querySelector("input[placeholder='Your Phone']").value,
      date: document.querySelector("input[type='date']").value,
      noOfPeople: parseInt(document.querySelector("select.niceSelect").value),
      destinationTitle: document.querySelector("#destinationHiddenInput").value, // Include the hidden input value
    };

    try {
      const response = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Booking saved successfully!");
        location.reload(); // Refresh the page on success
      } else {
        const error = await response.json();
        alert("Error: " + error.message);
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("An error occurred. Please try again.");
    }
  });

document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Fetch reviews from the API
    const response = await fetch("http://localhost:5000/api/reviews");
    if (!response.ok) {
      throw new Error("Failed to fetch reviews");
    }
    const reviews = await response.json();

    // Get the destination title from the hidden input
    const destinationTitle = document.querySelector(
      "#destinationHiddenInput"
    ).value;

    // Filter reviews based on the destination title
    const filteredReviews = reviews.filter(
      (review) => review.destinationTitle === destinationTitle
    );

    // Calculate average rating and total reviews
    const totalReviews = filteredReviews.length;
    const averageRating = totalReviews
      ? (
          filteredReviews.reduce((sum, review) => sum + review.rating, 0) /
          totalReviews
        ).toFixed(1)
      : 0;

    // Update average rating and total reviews in the UI
    const avgRatingElement = document.getElementById("averageRating");
    const totalReviewsElement = document.getElementById("totalReviews");
    const avgRatingStarsContainer =
      document.getElementById("averageRatingStars");

    avgRatingElement.textContent = averageRating;
    totalReviewsElement.textContent = `${totalReviews} Reviews`;

    // Create stars for the average rating
    avgRatingStarsContainer.innerHTML = ""; // Clear any existing stars
    const fullStars = Math.floor(averageRating); // Number of full stars
    const halfStar = averageRating % 1 >= 0.5 ? 1 : 0; // Check if a half-star is needed
    const emptyStars = 5 - fullStars - halfStar; // Remaining stars to make up 5

    // Append full stars
    for (let i = 0; i < fullStars; i++) {
      avgRatingStarsContainer.innerHTML += `<span class="fa fa-star checked"></span>`;
    }

    // Append half star if applicable
    if (halfStar) {
      avgRatingStarsContainer.innerHTML += `<span class="fa fa-star-half-alt checked"></span>`;
    }

    // Append empty stars
    for (let i = 0; i < emptyStars; i++) {
      avgRatingStarsContainer.innerHTML += `<span class="fa fa-star empty"></span>`;
    }

    // Update the reviews count
    const commentsHeading = document.querySelector(".single-comments h5");
    commentsHeading.textContent = `Showing ${filteredReviews.length} verified comments`;

    // Select the container for reviews
    const commentsContainer = document.querySelector(".accrodion-grp");

    // Clear any existing comments
    commentsContainer.innerHTML = "";

    // Loop through the filtered reviews and populate the structure
    filteredReviews.forEach((review) => {
      const commentBox = document.createElement("div");
      commentBox.className = "comment-box";

      // Populate the review data
      commentBox.innerHTML = `

                <div class="comment-content">
                    <h5 class="mb-1">${review.name}</h5>
                    <p class="comment-date">${new Date().toLocaleDateString()}</p>
                    <div class="comment-rate">
                        <div class="rating mar-right-15">
                            ${'<span class="fa fa-star checked"></span>'.repeat(
                              review.rating
                            )}${"☆".repeat(5 - review.rating)} 
                        </div>
                    </div>
                    <p class="comment">${review.comment}</p>
                </div>
            `;

      commentsContainer.appendChild(commentBox);
    });

    // Show a message if no reviews are available
    if (filteredReviews.length === 0) {
      commentsContainer.innerHTML =
        "<p>No reviews available for this destination.</p>";
    }

    // Show a message if no reviews are available
    if (totalReviews === 0) {
      commentsContainer.innerHTML =
        "<p>No reviews available for this destination.</p>";
    }
  } catch (err) {
    console.error("Error fetching reviews:", err);
    alert("An error occurred while loading reviews.");
  }
});
