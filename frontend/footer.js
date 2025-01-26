
document.addEventListener("DOMContentLoaded", () => {
    // Fetch footer data from JSON file
    fetch("http://localhost:5000/api/footer")
        .then((response) => {
            console.log("Response received:", response);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            console.log("Footer data:", data);
            renderFooterColumns(data.columns);
            renderNewsletter(data.newsletter);
            renderSocialMedia(data.socialMedia);
        })
        .catch((error) =>
            console.error("Error loading dynamic footer data:", error)
        );
});

const date = new Date().getFullYear();
const currYear = document.getElementById("currentYear");
currYear.innerHTML = date;

// Render Footer Columns
function renderFooterColumns(columns) {
    const footerColumns = document.getElementById("footerColumns");
    footerColumns.innerHTML = columns
        .map(
            (column) => `
                  <div class="col-lg-2 col-md-6 col-sm-12 col-xs-12 mb-4">
                      <div class="footer-links">
                          <h4 class="white">${column.heading}</h4>
                          <ul>
                              ${column.links
                    .map(
                        (link) =>
                            `<li><a href="${link.url}" target="_blank">${link.name}</a></li>`
                    )
                    .join("")}
                          </ul>
                      </div>
                  </div>
              `
        )
        .join("");
}

// Render Newsletter
function renderNewsletter(newsletter) {
    const newsletterSection = `
          <div class="col-lg-4 col-md-6 col-sm-12 col-xs-12 mb-4">
              <div class="footer-links">
              <h4 class="white">${newsletter.heading}</h4>
              <p>${newsletter.description}</p>
                  <div class="newsletter-form">
                      <form id="subscribeForm">
                          <input type="email" placeholder="Enter your email" required>
                          <button type="submit" class="nir-btn mt-2 w-100">Subscribe</button>
                      </form>
                  <div id="subsMessage"></div>
                  </div>
              </div>
          </div>
      `;
    document
        .getElementById("footerColumns")
        .insertAdjacentHTML("beforeend", newsletterSection);
}

// Render Social Media Links
function renderSocialMedia(socialMedia) {
    const socialMediaLinks = document.getElementById("socialMediaLinks");
    socialMediaLinks.innerHTML = `
          <ul>
              ${socialMedia
            .map(
                (social) =>
                    `<li><a href="${social.url}" target="_blank"><i class="${social.icon}" aria-hidden="true"></i></a></li>`
            )
            .join("")}
          </ul>
      `;
}

function initializeBubbleAnimation() {
    const footer = document.querySelector(".bubbles");

    function createBubble() {
        const bubble = document.createElement("div");
        bubble.classList.add("individual-bubble");

        // Randomize size
        const size = Math.random() * 10 + 5; // Bubble size between 10px and 50px
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;

        // Randomize horizontal position
        bubble.style.left = `${Math.random() * 100}%`;

        // Randomize animation duration
        bubble.style.animationDuration = `${Math.random() * 5 + 5}s`; // Between 5s and 10s

        // Randomize animation delay
        bubble.style.animationDelay = `${Math.random()}s`;

        footer.appendChild(bubble);

        // Remove bubble after animation ends
        bubble.addEventListener("animationend", () => {
            bubble.remove();
        });
    }

    // Create bubbles at intervals
    setInterval(createBubble, 5000); // Add a new bubble every 900ms
}

// Initialize Footer-Specific Scripts
function initializeFooterScripts() {
    // Reinitialize any dynamic content or event listeners
    const currentYearElement = document.getElementById("currentYear");
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    initializeBubbleAnimation(); // Call your bubble animation
}

// Load Footer Dynamically
function loadFooter() {
    fetch("footer.html")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to load footer.");
            }
            return response.text();
        })
        .then((footerHTML) => {
            document.getElementById("footerPlaceholder").innerHTML = footerHTML;

            // Initialize scripts from the footer
            initializeFooterScripts();
        })
        .catch((error) => console.error("Error loading footer:", error));
}

initializeBubbleAnimation();
loadFooter();
