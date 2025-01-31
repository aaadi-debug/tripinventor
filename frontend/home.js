function loadContent(url, elementId) {
  fetch(url)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById(elementId).innerHTML = data;
    })
    .catch((error) => console.error("Error loading content:", error));
}

// Load the header and footer using AJAX
loadContent("header.html", "header");

document.addEventListener("DOMContentLoaded", () => {
  const headers = document.querySelectorAll(".accordion-header");

  headers.forEach((header) => {
    header.addEventListener("click", () => {
      const item = header.parentElement;

      // Toggle the "open" class on the clicked accordion
      item.classList.toggle("open");

      // Close other accordions
      document.querySelectorAll(".accordion-item").forEach((otherItem) => {
        if (otherItem !== item && otherItem.classList.contains("open")) {
          otherItem.classList.remove("open");
        }
      });
    });
  });
});

// ===============================================
// ========= Featured section ====================
// ===============================================
document.addEventListener("DOMContentLoaded", () => {
  // Fetch data from JSON file
  fetch("http://localhost:5000/api/home/")
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Failed to load Featured Us data: ${response.status}`
        );
      }
      return response.json();
    })
    .then((data) => {
      renderFeaturedUs(data.featuredUs);
    })
    .catch((error) =>
      console.error("Error loading Featured Us data:", error)
    );
});
// Render Featured Us Section
function renderFeaturedUs(featuredUsItems) {
  const featuredUsContainer =
    document.getElementById("featuredUsSection");

  const featuredUsHtml = featuredUsItems
    .map(
      (item) => `
    <div class="col-lg-4 col-md-12 mb-4">
      <div class="featured-us-item d-sm-flex align-items-center justify-content-between">
        <div class="featured-us-icon">
          <i class="${item.iconClass}"></i>
        </div>
        <div class="featured-us-content">
          <h4 class="mb-1"><a href="${item.link}">${item.title}</a></h4>
          <p class="mb-0">${item.description}</p>
        </div>
      </div>
    </div>
  `
    )
    .join("");

  featuredUsContainer.innerHTML = featuredUsHtml;
}

// ===============================================
// ========= FAQ section ====================
// ===============================================
document.addEventListener("DOMContentLoaded", () => {
  // Fetch FAQ data from JSON file
  fetch("http://localhost:5000/api/home/")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to load FAQ data: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      renderFAQSection(data.faqSection);
      initializeAccordion();
    })
    .catch((error) => console.error("Error loading FAQ data:", error));
});
// Render FAQ Section
function renderFAQSection(faqSection) {
  const faqContainer = document.getElementById("faqSection");

  const faqHtml = `
    <div class="section-title text-center mb-5 pb-2 w-50 mx-auto">
      <h2 class="m-0"><span>${faqSection.title}</span></h2>
      <p class="mb-0">${faqSection.description}</p>
    </div>
    <div class="row">
      ${renderAccordionColumns(faqSection.faqItems)}
    </div>
  `;

  faqContainer.innerHTML = faqHtml;
}
// Render Accordion Columns
function renderAccordionColumns(faqItems) {
  const halfLength = Math.ceil(faqItems.length / 2);
  const columns = [
    faqItems.slice(0, halfLength),
    faqItems.slice(halfLength),
  ];

  return columns
    .map(
      (column) => `
      <div class="col-lg-6 col-md-12 mb-4">
        <div class="accordion">
          ${column
          .map(
            (item) => `
              <div class="accordion-item">
                <div class="accordion-header">
                  <span>${item.question}</span>
                  <i>&#9660;</i>
                </div>
                <div class="accordion-content">
                  <p>${item.answer}</p>
                </div>
              </div>
            `
          )
          .join("")}
        </div>
      </div>
    `
    )
    .join("");
}
// Initialize Accordion
function initializeAccordion() {
  const accordionHeaders = document.querySelectorAll(".accordion-header");

  accordionHeaders.forEach((header) => {
    header.addEventListener("click", () => {
      const content = header.nextElementSibling;
      const isActive = header.classList.contains("active");
      const item = header.parentElement;

      // Toggle the "open" class on the clicked accordion
      item.classList.toggle("open");

      // Close other accordions
      document
        .querySelectorAll(".accordion-item")
        .forEach((otherItem) => {
          if (
            otherItem !== item &&
            otherItem.classList.contains("open")
          ) {
            otherItem.classList.remove("open");
          }
        });
      // Close all accordions
      document
        .querySelectorAll(".accordion-header.active")
        .forEach((activeHeader) => {
          activeHeader.classList.remove("active");
          activeHeader.nextElementSibling.style.maxHeight = null;
        });

      // Toggle the clicked accordion
      if (!isActive) {
        header.classList.add("active");
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });
}


// ===============================================
// ========= About-Us section ====================
// ===============================================
document.addEventListener("DOMContentLoaded", () => {
  // Fetch data from JSON file
  fetch("http://localhost:5000/api/home/")
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Failed to load About Us data: ${response.status}`
        );
      }
      return response.json();
    })
    .then((data) => {
      renderAboutUs(data.aboutUs);
    })
    .catch((error) =>
      console.error("Error loading About Us data:", error)
    );
});
// Render About Us Section
function renderAboutUs(aboutUs) {
  const aboutUsContainer = document.getElementById("aboutUsSection");

  const imageListHtml = aboutUs.imageList
    .map((image) => `<li class="mr-2"><img src="${image}" alt="" /></li>`)
    .join("");

  const aboutUsHtml = `
  <div class="col-lg-6 col-sm-12 mb-4">
    <div class="about-content">
      <h4 class="mb-1 blue font-weight-normal">${aboutUs.title}</h4>
      <h2>${aboutUs.headline}</h2>
      <p class="mb-3">${aboutUs.description}</p>
      <div class="about-imagelist">
        <ul class="d-flex justify-content-between">${imageListHtml}</ul>
      </div>
    </div>
  </div>
  <div class="col-lg-6 col-sm-12 mb-4">
    <div class="about-image">
      <img src="${aboutUs.mainImage}" alt="" />
    </div>
  </div>
  `;

  aboutUsContainer.innerHTML = aboutUsHtml;
}

// ===============================================
// ========= Instagram section ====================
// ===============================================
document.addEventListener("DOMContentLoaded", () => {
  // Fetch data from JSON file
  fetch("http://localhost:5000/api/home/")
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Failed to load Instagram data: ${response.status}`
        );
      }
      return response.json();
    })
    .then((data) => {
      renderInstagramSection(data.instagramSection);
    })
    .catch((error) =>
      console.error("Error loading Instagram data:", error)
    );
});
// Render Instagram Section
function renderInstagramSection(instagramSection) {
  const followLink = document.getElementById("followLink");
  const galleryContainer = document.getElementById("instagramGallery");

  // Set the follow link
  followLink.href = instagramSection.followLink;

  // Generate image HTML dynamically
  const imagesHtml = instagramSection.images
    .map(
      (image) => `
      <div class="col-md-3 col-sm-6 col-xs-12">
        <div class="insta-image">
          <a href="#"><img src="${image}" alt="insta" /></a>
        </div>
      </div>
    `
    )
    .join("");

  // Inject the images into the gallery container
  galleryContainer.innerHTML = imagesHtml;
}


fetch("http://localhost:5000/api/home/")
  .then((response) => response.json())
  .then((data) => {
    // Render Top Destinations
    const topDestinationsContainer =
      document.getElementById("top-destination");
    data.topDestinations.forEach((dest) => {
      topDestinationsContainer.innerHTML += `
      <div class="col-lg-4 col-md-6 p-1">
        <div class="desti-image">
          <img src="${dest.image}" alt="${dest.title}" />
          <div class="desti-content">
            <div class="rating mb-1">
              ${' <span class="fa fa-star checked"></span>'.repeat(
        dest.rating
      )}
            </div>
            <h4 class="white mb-0">${dest.title}</h4>
          </div>
          <div class="desti-overlay">
            <a href="/theme-tours/${dest.link}" class="nir-btn">
              <span class="white">Book Now</span>
              <i class="fa fa-arrow-right white pl-1"></i>
            </a>
          </div>
        </div>
      </div>
    `;
    });

    // Render Trending Destinations
    const trendingContainer = document.getElementById(
      "trending-destination"
    );
    data.trending.forEach((trend) => {
      trendingContainer.innerHTML += `
      <div class="col-lg-4 col-md-6 col-xs-12 mb-4 pb-4">
        <div class="trend-item">
          <div class="trend-image">
            <img src="${trend.image}" alt="${trend.country}" />
          </div>
          <div class="trend-content-main">
            <div class="trend-content">
              <h6 class="font-weight-normal pink">
                <i class="fa fa-map-marker-alt"></i> ${trend.country}
              </h6>
              <h4>
                <a href="#">${trend.title}</a>
              </h4>
              <p class="mb-0 trend-para">
                ${trend.description}
              </p>
            </div>
            <div class="trend-last-main">
              <div class="trend-last d-flex align-items-center justify-content-between">
                <p class="mb-0 white">
                  <i class="fa fa-clock-o" aria-hidden="true"></i> ${trend.duration
        }
                </p>
                <div class="trend-price">
                  <p class="price white mb-0">
                    From <span>${trend.price}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    });
  });

fetch("http://localhost:5000/api/home/")
  .then((response) => response.json())
  .then((data) => {
    // Render main article
    const mainArticle = data.mainArticle;
    document.getElementById("main-article").innerHTML = `
            <div class="news-item overflow-hidden">
            <div class="news-image">
                <img src="${mainArticle.image}" alt="${mainArticle.title}" />
            </div>
            <div class="news-list mt-2 border-b pb-2 mb-2">
                <ul>
                <li>
                    <a href="#" class="pr-3"><i class="fa fa-calendar pink pr-1"></i> ${mainArticle.date
      }</a>
                </li>
                <li>
                    <a href="#" class=""><i class="fa fa-tag pink pr-1"></i> ${mainArticle.tags.join(
        ", "
      )}</a>
                </li>
                </ul>
            </div>
            <div class="news-content mt-2">
                <h4 class="pb-2 mb-2 border-b">
                <a href="#">${mainArticle.title}</a>
                </h4>
                <p class="mb-3">${mainArticle.description}</p>
                <div class="author-img">
                    <i class="fa-solid fa-user-tie"></i>
                    <span> ${mainArticle.authorName}</span>
                </div>
            </div>
            </div>
        `;

    // Render sub articles
    const subArticles = data.subArticles;
    const subArticlesContainer = document.getElementById("sub-articles");
    subArticles.forEach((article) => {
      subArticlesContainer.innerHTML += `
      <div class="col-lg-6 col-md-6 col-xs-12 mb-4">
        <div class="news-item overflow-hidden">
          <div class="news-image">
            <img src="${article.image}" alt="${article.title}" />
          </div>
          <div class="news-list mt-2 border-b pb-2 mb-2">
            <ul>
              <li>
                <a href="#" class="pr-3"><i class="fa fa-calendar pink pr-1"></i> ${article.date
        }</a>
              </li>

              <li>
                <a href="#" class=""><i class="fa fa-tag pink pr-1"></i> ${article.tags.join(
          ", "
        )}</a>
              </li>
            </ul>
          </div>
          <div class="news-content mt-2">
            <h4 class="bordernone mb-0">
              <a href="#">${article.title}</a>
            </h4>
          </div>
        </div>
      </div>
    `;
    });
  })
  .catch((error) => console.error("Error fetching JSON data:", error));


fetch("http://localhost:5000/api/home/")
  .then(response => response.json())
  .then(data => {
    const testimonialSection = document.getElementById("testimonialSection");
    let testimonialsHTML = "";

    data.testimonials.forEach(testimonial => {
      let stars = "";
      for (let i = 0; i < testimonial.rating; i++) {
        stars += `<span class="fa fa-star checked"></span>`;
      }

      testimonialsHTML += `
        <div class="col-sm-4">
            <div class="testimonial-item mb-5">
              <div class="testimonial-content mb-5">
                <div class="testimonial-icon">
                  <i class="fa fa-quote-left"></i>
                </div>
                <p class="description mb-0">${testimonial.review}</p>
              </div>
              <div class="author-title d-flex align-items-center">
                <a href="#"><img src="${testimonial.image}" alt="${testimonial.name}" /></a>
                <div class="author-in ml-3">
                  <h5 class="m-0 white">${testimonial.name}</h5>
                  <div class="rating">${stars}</div>
                </div>
              </div>
            </div>
          </div>
        `;
    });

    testimonialSection.innerHTML = testimonialsHTML;
  })
  .catch(error => console.error("Error loading testimonials:", error));