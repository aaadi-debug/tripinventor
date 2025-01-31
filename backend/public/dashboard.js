async function fetchUsers() {
  const loader = document.getElementById("loading");
  loader.style.display = "block"; // Show loader

  try {
    const response = await axios.get("http://localhost:5000/api/users");
    const users = response.data;
    populateUsersTable(users);

    function populateUsersTable(users) {
      const tableBody = document.querySelector("#users-table tbody");
      tableBody.innerHTML = ""; // Clear previous data

      users.forEach((user, index) => {
        const row = `
                <tr>
                    <td>${index + 1}</td>
                    <td>${user.username}</td>
                    <td>${user.email}</td>
                    <td>
                        <button class="btn btn-danger" onclick="deleteUser('${user._id
          }')">Delete</button>
                    </td>
                </tr>
            `;
        tableBody.innerHTML += row;
      });
    }
  } catch (error) {
    console.error("Error fetching users:", error.message);
  } finally {
    loader.style.display = "none"; // Hide loader
  }
}
async function deleteUser(userId) {
  const confirmDelete = confirm("Are you sure you want to delete this user?");
  if (!confirmDelete) return;

  try {
    await axios.delete(`http://localhost:5000/api/users/${userId}`);
    alert("User deleted successfully");
    fetchUsers(); // Refresh table
  } catch (error) {
    console.error("Error deleting user:", error.message);
    alert(error.response?.data?.message || "Failed to delete user.");
  }
}

// ----------------------------------------------------------------------
// -------------------------- detinations -------------------------------
// ----------------------------------------------------------------------

// Fetch and populate destinations
async function fetchDestinations() {
  const loader = document.getElementById("loading");
  loader.style.display = "block"; // Show loader

  try {
    const response = await axios.get("http://localhost:5000/api/destinations");
    const destinations = response.data;
    populateDestinationsTable(destinations);

    function populateDestinationsTable(destinations) {
      const tableBody = document.querySelector("#destinations-table tbody");
      tableBody.innerHTML = ""; // Clear previous data

      destinations.forEach((destination, index) => {
        const row = `
                <tr>
                    <td>${index + 1}</td>
                    <td>${destination.title}</td>
                    <td>
                        <button class="btn btn-primary" onclick="openEditModal('${destination._id
          }')">Edit</button>
                        <button class="btn btn-danger" onclick="deleteDestination('${destination._id
          }')">Delete</button>
                    </td>
                </tr>
            `;
        tableBody.innerHTML += row;
      });
    }
  } catch (error) {
    console.error("Error fetching destinations:", error.message);
  } finally {
    loader.style.display = "none"; // Hide loader
  }
}

// Delete a destination
async function deleteDestination(destinationId) {
  const confirmDelete = confirm(
    "Are you sure you want to delete this destination?"
  );
  if (!confirmDelete) return;

  try {
    await axios.delete(
      `http://localhost:5000/api/destinations/${destinationId}`
    );
    alert("Destination deleted successfully");
    fetchDestinations(); // Refresh table
  } catch (error) {
    console.error("Error deleting destination:", error.message);
    alert(error.response?.data?.message || "Failed to delete destination.");
  }
}

// async function openEditModal(destinationId) {
//   try {
//     console.log("Hi");
//     // Fetch destination details
//     console.log("Fetching destination with ID:", destinationId);

//     const response = await axios.get(
//       `http://localhost:5000/api/destinations/${destinationId}`
//     );
//     const destination = response.data;
//     console.log("Hi2");

//     // Populate form fields
//     document.getElementById("destination-id").value = destinationId;
//     document.getElementById("destination-title").value = destination.title;
//     document.getElementById("destination-location").value =
//       destination.location;
//     document.getElementById("destination-discount").value =
//       destination.discount || "";
//     document.getElementById("destination-duration").value =
//       destination.duration;
//     document.getElementById("destination-price").value = destination.price;
//     document.getElementById("destination-pickupLocation").value =
//       destination.pickupLocation;
//     document.getElementById("destination-images").value =
//       destination.images.join(", ");
//     document.getElementById("details-languages").value =
//       destination.languages.join(", ");
//     document.getElementById("destination-descriptions").value =
//       destination.descriptions.join(", ");
//     document.getElementById("additional-includes").value =
//       destination.additionalInfo.includes.join(", ");
//     document.getElementById("additional-excludes").value =
//       destination.additionalInfo.excludes.join(", ");
//     // document.getElementById("destination-reviews").value = JSON.stringify(
//     //   destination.reviews
//     // );

//     // **Populate Itinerary**
//     // document.getElementById("destination-itinerary").value = JSON.stringify(
//     //   destination.itinerary,
//     //   null,
//     //   2 // Formatting for better readability
//     // );
//     // Populate Itinerary (if applicable)
//     document.getElementById("itinerary-container").innerHTML = "";
//     const itineraryField = document.getElementById("destination-itinerary");
//     if (Array.isArray(destination.itinerary)) {
//       itineraryField.value = JSON.stringify(destination.itinerary, null, 2); // Pretty-print JSON
//     } else {
//       itineraryField.value = "[]"; // Fallback for no itinerary
//     }


//     // Pre-fill radio buttons
//     // document.querySelector(`input[name="theme-tours"][value="${destination.themeTours}"]`).checked = true;
//     document.querySelector(`input[name="wellness-and-spa-tours"][value="${destination.wellnessSpa}"]`).checked = true;
//     document.querySelector(`input[name="beach-tours"][value="${destination.wellnessSpa}"]`).checked = true;
//     document.querySelector(`input[name="wildlife-tours"][value="${destination.wellnessSpa}"]`).checked = true;
//     document.querySelector(`input[name="culture-tours"][value="${destination.wellnessSpa}"]`).checked = true;
//     document.querySelector(`input[name="trains-tours"][value="${destination.wellnessSpa}"]`).checked = true;
//     document.querySelector(`input[name="terkking-tours"][value="${destination.wellnessSpa}"]`).checked = true;
//     document.querySelector(`input[name="spiritual-tours"][value="${destination.wellnessSpa}"]`).checked = true;
//     document.querySelector(`input[name="festival-tours"][value="${destination.wellnessSpa}"]`).checked = true;
//     document.querySelector(`input[name="wonders-tours"][value="${destination.wellnessSpa}"]`).checked = true;
//     document.querySelector(`input[name="unesco-tours"][value="${destination.wellnessSpa}"]`).checked = true;

//     document.querySelector(`input[name="domestic-tours"][value="${destination.domesticTours}"]`).checked = true;
//     document.querySelector(`input[name="international-tours"][value="${destination.internationalTours}"]`).checked = true;

//     // Show the modal
//     document.getElementById("add-destination-modal").style.display = "block";
//   } catch (error) {
//     // console.error("Error fetching destination:", error.message);
//     // alert("Failed to fetch destination data.");

//     console.error("Error fetching destination:", error);
//     console.error("Response data:", error.response?.data);
//   }
// }

// Show the Add Destination Modal

async function openEditModal(destinationId) {
  try {
    console.log("Opening edit modal for destination ID:", destinationId);

    // Fetch destination details
    const response = await axios.get(
      `http://localhost:5000/api/destinations/${destinationId}`
    );
    const destination = response.data;

    console.log("Destination details fetched successfully:", destination);

    // Populate form fields
    document.getElementById("destination-id").value = destinationId;
    document.getElementById("destination-title").value = destination.title;
    document.getElementById("destination-location").value = destination.location;
    document.getElementById("destination-discount").value = destination.discount || "";
    document.getElementById("destination-duration").value = destination.duration;
    document.getElementById("destination-price").value = destination.price;
    document.getElementById("destination-pickupLocation").value = destination.pickupLocation;
    document.getElementById("destination-images").value = destination.images.join(", ");
    document.getElementById("details-languages").value = destination.languages.join(", ");
    document.getElementById("destination-descriptions").value = destination.descriptions.join(", ");
    document.getElementById("additional-includes").value = destination.additionalInfo.includes.join(", ");
    document.getElementById("additional-excludes").value = destination.additionalInfo.excludes.join(", ");

    // Populate Itinerary (if applicable)
    const itineraryContainer = document.getElementById("itinerary-container");
    itineraryContainer.innerHTML = ""; // Clear existing itinerary blocks
    if (Array.isArray(destination.itinerary)) {
      destination.itinerary.forEach((day, index) => {
        const itineraryBlock = document.createElement("div");
        itineraryBlock.className = "itinerary-block mt-3";

        itineraryBlock.innerHTML = `
          <div class="col-12">
            <input type="text" class="form-control itinerary-title" value="${day.title}" placeholder="Enter Title (e.g., Itinerary Title)" />
          </div>
          <div class="col-12">
            <textarea class="form-control itinerary-content" placeholder="Enter activities separated by commas">${day.content.join(", ")}</textarea>
          </div>
          <div class="col-12 mt-2">
            <button type="button" class="btn btn-danger remove-itinerary">Remove</button>
          </div>
        `;

        // Add event listener for removing the itinerary block
        itineraryBlock.querySelector(".remove-itinerary").addEventListener("click", () => {
          itineraryContainer.removeChild(itineraryBlock);
          updateDayNumbers(); // Update day numbers dynamically
        });

        itineraryContainer.appendChild(itineraryBlock);
      });
    }

    // Pre-fill radio buttons for themes and tours
    const radioFields = [
      { name: "wellness-and-spa-tours", value: destination.wellnessSpa },
      { name: "beach-tours", value: destination.beachTheme },
      { name: "wildlife-tours", value: destination.wildlifeTheme },
      { name: "culture-tours", value: destination.cultureTheme },
      { name: "trains-tours", value: destination.trainsTheme },
      { name: "terkking-tours", value: destination.trekkingTheme },
      { name: "spiritual-tours", value: destination.spiritualTheme },
      { name: "festival-tours", value: destination.festivalTheme },
      { name: "wonders-tours", value: destination.wonderTheme },
      { name: "unesco-tours", value: destination.unescoTheme },
      { name: "domestic-tours", value: destination.domesticTours, dropdownId: "domestic-category", category: destination.domesticCategory },
      { name: "international-tours", value: destination.internationalTours, dropdownId: "international-category", category: destination.internationalCategory },
    ];

    // radioFields.forEach(({ name, value, dropdownId, category }) => {
    //   const radioYes = document.querySelector(`input[name="${name}"][value="yes"]`);
    //   const radioNo = document.querySelector(`input[name="${name}"][value="no"]`);
    //   const dropdown = document.getElementById(dropdownId);

    //   if (!dropdown) {
    //     console.error(`Dropdown with ID "${dropdownId}" not found in the DOM.`);
    //     return; // Skip this iteration if the dropdown is not found
    //   }

    //   // Set radio button selection
    //   if (value === "yes") {
    //     radioYes.checked = true;
    //     dropdown.disabled = false;
    //     dropdown.value = category || ""; // Set the selected category
    //   } else {
    //     radioNo.checked = true;
    //     dropdown.disabled = true;
    //     dropdown.value = ""; // Clear the dropdown if "No" is selected
    //   }

    //   // Add event listener to toggle the dropdown
    //   radioYes.addEventListener("change", () => {
    //     dropdown.disabled = false;
    //   });
    //   radioNo.addEventListener("change", () => {
    //     dropdown.disabled = true;
    //     dropdown.value = ""; // Clear the dropdown value when disabled
    //   });
    // });


    // Show the modal

    radioFields.forEach(({ name, value, dropdownId, category }) => {
      const radioYes = document.querySelector(`input[name="${name}"][value="yes"]`);
      const radioNo = document.querySelector(`input[name="${name}"][value="no"]`);

      if (radioYes && radioNo) {
        // Set radio button selection
        if (value === "yes") {
          radioYes.checked = true;
        } else if (value === "no") {
          radioNo.checked = true;
        }
      }

      // Handle dropdown if it exists
      if (dropdownId) {
        const dropdown = document.getElementById(dropdownId);

        if (dropdown) {
          if (value === "yes") {
            dropdown.disabled = false;
            dropdown.value = category || ""; // Pre-fill category if available
          } else {
            dropdown.disabled = true;
            dropdown.value = ""; // Clear dropdown value
          }

          // Add event listeners for toggling dropdown
          if (radioYes) {
            radioYes.addEventListener("change", () => {
              dropdown.disabled = false;
            });
          }
          if (radioNo) {
            radioNo.addEventListener("change", () => {
              dropdown.disabled = true;
              dropdown.value = ""; // Clear dropdown value when disabled
            });
          }
        } else {
          console.error(`Dropdown with ID "${dropdownId}" not found in the DOM.`);
        }
      }
    });


    document.getElementById("add-destination-modal").style.display = "block";
  } catch (error) {
    console.error("Error fetching destination:", error);

    if (error.response) {
      console.error("Response data:", error.response.data);
      alert(`Failed to fetch destination data: ${error.response.data.message || "Unknown error"}`);
    } else {
      alert("An unexpected error occurred while fetching destination data.");
    }
  }
}


document.getElementById("add-destination").addEventListener("click", () => {
  document.getElementById("add-destination-modal").style.display = "block";
});

// Close the Add Destination Modal
function closeAddDestinationModal() {
  document.getElementById("add-destination-modal").style.display = "none";
}

document
  .getElementById("add-destination-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const destinationId = document.getElementById("destination-id").value; // Check if editing
    const formData = {
      title: document.getElementById("destination-title").value,
      location: document.getElementById("destination-location").value,
      discount: document.getElementById("destination-discount").value || null,
      duration: document.getElementById("destination-duration").value,
      price: document.getElementById("destination-price").value,
      pickupLocation: document.getElementById("destination-pickupLocation")
        .value,
      images: document
        .getElementById("destination-images")
        .value.split(",")
        .map((img) => img.trim()),
      languages: document
        .getElementById("details-languages")
        .value.split(",")
        .map((lang) => lang.trim()),
      descriptions: document
        .getElementById("destination-descriptions")
        .value.split(",")
        .map((desc) => desc.trim()),
      additionalInfo: {
        includes: document
          .getElementById("additional-includes")
          .value.split(",")
          .map((inc) => inc.trim()),
        excludes: document
          .getElementById("additional-excludes")
          .value.split(",")
          .map((exc) => exc.trim()),
      },
      // themeTours: document.querySelector('input[name="theme-tours"]:checked').value,
      wellnessSpa: document.querySelector('input[name="wellness-and-spa-tours"]:checked').value,
      beachTheme: document.querySelector('input[name="beach-tours"]:checked').value,
      wildlifeTheme: document.querySelector('input[name="wildlife-tours"]:checked').value,
      cultureTheme: document.querySelector('input[name="culture-tours"]:checked').value,
      trainsTheme: document.querySelector('input[name="trains-tours"]:checked').value,
      trekkingTheme: document.querySelector('input[name="terkking-tours"]:checked').value,
      spiritualTheme: document.querySelector('input[name="spiritual-tours"]:checked').value,
      festivalTheme: document.querySelector('input[name="festival-tours"]:checked').value,
      wonderTheme: document.querySelector('input[name="wonders-tours"]:checked').value,
      unescoTheme: document.querySelector('input[name="unesco-tours"]:checked').value,

      domesticTours: document.querySelector('input[name="domestic-tours"]:checked')
        .value,
      domesticCategory: document.getElementById("domestic-category").value || null, // Add domestic category
      internationalTours: document.querySelector(
        'input[name="international-tours"]:checked'
      ).value,
      internationalCategory: document.getElementById("international-category").value || null, // Add international category
      itinerary: getItineraryData(), // Collect the itinerary dynamically

    };

    // Itinerary validation logic
    // let itineraryInput = document
    //   .getElementById("destination-itinerary")
    //   .value.trim();
    // let itineraryData;


    // try {
    //   itineraryData = itineraryInput ? JSON.parse(itineraryInput) : [];
    // } catch (err) {
    //   console.error("Invalid JSON in itinerary input:", err);
    //   alert("The itinerary field contains invalid JSON. Please correct it.");
    //   return; // Stop form submission if the input is invalid
    // }

    // formData.itinerary = itineraryData; // Add validated itinerary to formData

    // Add the PDF file if uploaded
    // const pdfFile = document.getElementById("destination-pdf").files[0];
    // if (pdfFile) {
    //   formData.append("pdf", pdfFile);
    // }

    try {
      let response;
      if (destinationId) {
        // Update existing destination
        response = await fetch(
          `http://localhost:5000/api/destinations/${destinationId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          }
        );
      } else {
        // Add new destination
        response = await fetch("http://localhost:5000/api/destinations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      }

      if (response.ok) {
        alert(
          destinationId
            ? "Destination updated successfully!"
            : "Destination added successfully!"
        );
        closeAddDestinationModal();
        fetchDestinations(); // Refresh table
      } else {
        const error = await response.json();
        console.error("Error:", error.message);
        alert("Failed to save destination.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("An unexpected error occurred.");
    }
  });

function getItineraryData() {
  const itineraryBlocks = document.querySelectorAll(".itinerary-block");
  const itinerary = [];

  itineraryBlocks.forEach((block, index) => {
    const day = `Day ${index + 1}`; // Auto-assign day
    const title = block.querySelector(".itinerary-title").value.trim();
    const content = block
      .querySelector(".itinerary-content")
      .value.split("\n")
      .map((item) => item.trim())
      .filter((item) => item); // Remove empty activities

    if (title && content.length) {
      itinerary.push({ day, title, content });
    }
  });

  return itinerary;
}



// Function to add a new itinerary block
document.getElementById("add-itinerary").addEventListener("click", () => {
  const container = document.getElementById("itinerary-container");

  const itineraryBlock = document.createElement("div");
  itineraryBlock.className = "itinerary-block mt-3";

  itineraryBlock.innerHTML = `
  <div class="col-12 itinerary-day-label">Day X</div>
  <div class="col-12">
    <input type="text" class="form-control itinerary-title" placeholder="Enter Title (e.g., Itinerary Title)" />
  </div>
  <div class="col-12">
    <textarea
      class="form-control itinerary-content"
      placeholder="Enter activities separated by commas (e.g., Activity 1, Activity 2)"
    ></textarea>
  </div>
  <div class="col-12 mt-2">
    <button type="button" class="btn btn-danger remove-itinerary">Remove</button>
  </div>
`;


  container.appendChild(itineraryBlock);

  // Add event listener to remove the block
  itineraryBlock.querySelector(".remove-itinerary").addEventListener("click", () => {
    container.removeChild(itineraryBlock);
    updateDayNumbers(); // Recalculate days when an itinerary is removed
  });

  updateDayNumbers(); // Recalculate days after adding a new block
});

// Function to collect itinerary data
function getItineraryData() {
  const itineraryBlocks = document.querySelectorAll(".itinerary-block");
  const itinerary = [];

  itineraryBlocks.forEach((block, index) => {
    const day = `Day ${index + 1}`; // Automatically assign day number
    const title = block.querySelector(".itinerary-title").value.trim();
    const content = block
      .querySelector(".itinerary-content")
      .value.split("\n")
      .map((item) => item.trim());

    if (title && content.length) {
      itinerary.push({ day, title, content });
    }
  });

  return itinerary;
}

// Function to update day numbers dynamically (optional if needed in UI)
function updateDayNumbers() {
  const itineraryBlocks = document.querySelectorAll(".itinerary-block");

  itineraryBlocks.forEach((block, index) => {
    const dayLabel = block.querySelector(".itinerary-day-label");

    if (dayLabel) {
      dayLabel.textContent = `Day ${index + 1}`;
    }
  });
}








// fetching destinations by categories
async function fetchDestinationsByCategory(category) {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/destinations?${category}=yes`
    );
    const destinations = response.data;

    populateDestinationsList(destinations); // Function to display destinations
  } catch (error) {
    console.error("Error fetching destinations:", error.message);
  }
}

//enable/disable the dropdowns based on the radio button selections.
function toggleDropdown(type) {
  const dropdown = document.getElementById(`${type}-category`);
  const radioYes = document.querySelector(`input[name="${type}-tours"][value="yes"]`);

  if (radioYes.checked) {
    dropdown.disabled = false; // Enable dropdown
  } else {
    dropdown.disabled = true; // Disable dropdown
    dropdown.value = ""; // Reset value when disabled
  }
}


// ----------------------------------------------------------------------
// -------------------------- Blogs  ---- -------------------------------
// ----------------------------------------------------------------------
// Fetch and populate blogs
async function fetchBlogs() {
  const loader = document.getElementById("loading");
  loader.style.display = "block"; // Show loader

  try {
    const response = await axios.get("http://localhost:5000/api/blogs");
    const blogs = response.data;
    populateBlogsTable(blogs);

    function populateBlogsTable(blogs) {
      const tableBody = document.querySelector("#blogs-table tbody");
      tableBody.innerHTML = ""; // Clear previous data

      blogs.forEach((blog, index) => {
        const row = `
                <tr>
                    <td>${index + 1}</td>
                    <td>${blog.title}</td>
                    <td>
                        <button class="btn btn-danger" onclick="deleteBlog('${blog._id
          }')">Delete</button>
                    </td>
                </tr>
            `;
        tableBody.innerHTML += row;
      });
    }
  } catch (error) {
    console.error("Error fetching blogs:", error.message);
  } finally {
    loader.style.display = "none"; // Hide loader
  }
}
// Delete a blog
async function deleteBlog(blogId) {
  const confirmDelete = confirm("Are you sure you want to delete this blog?");
  if (!confirmDelete) return;

  try {
    await axios.delete(`http://localhost:5000/api/blogs/${blogId}`);
    alert("Blog deleted successfully");
    fetchBlogs(); // Refresh table
  } catch (error) {
    console.error("Error deleting blog:", error.message);
    alert(error.response?.data?.message || "Failed to delete blog.");
  }
}

// Show the Add Blog Modal
document.getElementById("add-blog").addEventListener("click", () => {
  document.getElementById("add-blog-modal").style.display = "block";
});

// Close the Add blog Modal
function closeAddBlogModal() {
  document.getElementById("add-blog-modal").style.display = "none";
}

// Add a new blog
document
  .getElementById("add-blog-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    // Gather data from form
    const formData = {
      image: document.getElementById("blog-image").value,
      date: document.getElementById("blog-date").value,
      title: document.getElementById("blog-title").value,
      // link: document.getElementById("blog-link").value,
      category: document.getElementById("blog-category").value,
      author: document.getElementById("blog-author").value,
      description: document.getElementById("blog-description").value,
      content: document.getElementById("blog-content").value,
    };

    // Send data to the backend
    try {
      const response = await fetch("http://localhost:5000/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Blog added successfully!");
        closeAddBlogModal();
        location.reload(); // Refresh the page
      } else {
        const error = await response.json();
        console.error("Error adding blog:", error.message);
        alert("Failed to add blog.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("An unexpected error occurred.");
    }
  });

// ----------------------------------------------------------------------
// -------------------------- bookings    -------------------------------
// ----------------------------------------------------------------------
// Fetch and render bookings when the Manage Bookings tab is opened
async function fetchBookings() {
  const loader = document.getElementById("loading");
  loader.style.display = "block"; // Show loader

  try {
    const response = await axios.get("http://localhost:5000/api/bookings");
    const bookings = response.data;

    populateBookingsTable(bookings);

    // Function to populate the bookings table
    function populateBookingsTable(bookings) {
      const tableBody = document.querySelector("#bookings-table tbody");
      tableBody.innerHTML = ""; // Clear previous data

      bookings.forEach((booking, index) => {
        const row = `
            <tr>
              <td>${index + 1}</td>
              <td>${booking.name}</td>
              <td>${booking.email}</td>
              <td>${booking.phone}</td>
              <td>${booking.date}</td>
              <td>${booking.noOfPeople}</td>
              <td>${booking.destinationTitle}</td>
              <td>
                <button class="btn btn-danger" onclick="deleteBooking('${booking._id
          }')">Delete</button>
              </td>
            </tr>
          `;
        tableBody.innerHTML += row;
      });
    }
  } catch (error) {
    console.error("Error fetching bookings:", error.message);
  } finally {
    loader.style.display = "none"; // Hide loader
  }
}

// Function to delete a booking by ID
async function deleteBooking(bookingId) {
  const confirmDelete = confirm(
    "Are you sure you want to delete this booking?"
  );
  if (!confirmDelete) return;

  try {
    await axios.delete(`http://localhost:5000/api/bookings/${bookingId}`);
    alert("Booking deleted successfully");
    fetchBookings(); // Refresh table
  } catch (error) {
    console.error("Error deleting booking:", error.message);
    alert(error.response?.data?.message || "Failed to delete booking.");
  }
}

// ----------------------------------------------------------------------
// -------------------------- subscribers -------------------------------
// ----------------------------------------------------------------------

async function fetchSubscribers() {
  const loader = document.getElementById("loading");
  loader.style.display = "block"; // Show loader

  try {
    const response = await axios.get("http://localhost:5000/api/subscribers");
    const subscribers = response.data;

    populateSubscribersTable(subscribers);

    // Function to populate the bookings table
    function populateSubscribersTable(subscribers) {
      const tableBody = document.querySelector("#subscribers-table tbody");
      tableBody.innerHTML = ""; // Clear previous data

      subscribers.forEach((subscriber, index) => {
        const row = `
              <tr>
                <td>${index + 1}</td>
                <td>${subscriber.email}</td>
                <td>
                <button class="btn btn-danger" onclick="deleteSubscriber('${subscriber._id
          }')">Delete</button>
              </td>
              </tr>
            `;
        tableBody.innerHTML += row;
      });
    }
  } catch (error) {
    console.error("Error fetching bookings:", error.message);
  } finally {
    loader.style.display = "none"; // Hide loader
  }
}
// Function to delete a subscriber by ID
async function deleteSubscriber(subscriberId) {
  const confirmDelete = confirm(
    "Are you sure you want to delete this subscriber?"
  );
  if (!confirmDelete) return;

  try {
    await axios.delete(`http://localhost:5000/api/subscribers/${subscriberId}`);
    alert("Subscriber deleted successfully");
    fetchSubscribers(); // Refresh table
  } catch (error) {
    console.error("Error deleting subscriber:", error.message);
    alert(error.response?.data?.message || "Failed to delete subscriber.");
  }
}

// ----------------------------------------------------------------------
// -------------------------- newsletters -------------------------------
// ----------------------------------------------------------------------
document
  .getElementById("newsletterForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const subject = document.getElementById("subject").value;
    const pdfFile = document.getElementById("pdfFile").files[0];

    if (!subject || !pdfFile) {
      alert("Please provide a subject and a PDF file.");
      return;
    }

    const formData = new FormData();
    formData.append("subject", subject);
    formData.append("pdf", pdfFile);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/send-newsletter",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        document.getElementById("newsletterMessage").innerText =
          response.data.message;
      }
    } catch (error) {
      console.error("Error sending newsletter:", error.message);
      document.getElementById("newsletterMessage").innerText =
        "Failed to send newsletter.";
    }
  });

// ----------------------------------------------------------------------
// -------------------------- contacts    -------------------------------
// ----------------------------------------------------------------------
// Fetch and render bookings when the Manage Bookings tab is opened
async function fetchContacts() {
  const loader = document.getElementById("loading");
  loader.style.display = "block"; // Show loader

  try {
    const response = await axios.get("http://localhost:5000/api/contacts");
    const contacts = response.data;

    populateContactsTable(contacts);

    // Function to populate the bookings table
    function populateContactsTable(contacts) {
      const tableBody = document.querySelector("#contact-table tbody");
      tableBody.innerHTML = ""; // Clear previous data

      contacts.forEach((contact, index) => {
        const row = `
            <tr>
              <td>${index + 1}</td>
              <td>${contact.name}</td>
              <td>${contact.email}</td>
              <td>${contact.phone}</td>
              <td>${contact.message}</td>
              <td>
                <button class="btn btn-danger" onclick="deleteContact('${contact._id
          }')">Delete</button>
              </td>
            </tr>
          `;
        tableBody.innerHTML += row;
      });
    }
  } catch (error) {
    console.error("Error fetching contacts:", error.message);
  } finally {
    loader.style.display = "none"; // Hide loader
  }
}

// Function to delete a booking by ID
async function deleteContact(contactId) {
  const confirmDelete = confirm(
    "Are you sure you want to delete this contact?"
  );
  if (!confirmDelete) return;

  try {
    await axios.delete(`http://localhost:5000/api/contacts/${contactId}`);
    alert("Contact deleted successfully");
    fetchContacts(); // Refresh table
  } catch (error) {
    console.error("Error deleting contact:", error.message);
    alert(error.response?.data?.message || "Failed to delete contact.");
  }
}

// document.addEventListener("DOMContentLoaded", () => {
//   fetchUsers();
//   fetchDestinations();
//   fetchBlogs();
//   fetchBookings();
//   fetchSubscribers();
//   fetchContacts();
// });

// ----------------------------------------------------------------------
// -------------------------- queries    -------------------------------
// ----------------------------------------------------------------------
// Fetch and render bookings when the Manage Bookings tab is opened
async function fetchQueries() {
  const loader = document.getElementById("loading");
  loader.style.display = "block"; // Show loader

  try {
    const response = await axios.get("http://localhost:5000/api/queries");
    const queries = response.data;

    populateQueriesTable(queries);

    // Function to populate the bookings table
    function populateQueriesTable(queries) {
      const tableBody = document.querySelector("#query-table tbody");
      tableBody.innerHTML = ""; // Clear previous data

      queries.forEach((query, index) => {
        const row = `
            <tr>
              <td>${index + 1}</td>
              <td>${query.name}</td>
              <td>${query.phone}</td>
              <td>${query.checkin}</td>
              <td>${query.guests}</td>
              <td>${query.message}</td>
              <td>
                <button class="btn btn-danger" onclick="deleteQuery('${query._id
          }')">Delete</button>
              </td>
            </tr>
          `;
        tableBody.innerHTML += row;
      });
    }
  } catch (error) {
    console.error("Error fetching queries:", error.message);
  } finally {
    loader.style.display = "none"; // Hide loader
  }
}

// Function to delete a query by ID
async function deleteQuery(queryId) {
  const confirmDelete = confirm("Are you sure you want to delete this query?");
  if (!confirmDelete) return;

  try {
    await axios.delete(`http://localhost:5000/api/queries/${queryId}`);
    alert("Query deleted successfully");
    fetchQueries(); // Refresh table
  } catch (error) {
    console.error("Error deleting query:", error.message);
    alert(error.response?.data?.message || "Failed to delete query.");
  }
}

// ----------------------------------------------------------------------
// -------------------------- reviews    -------------------------------
// ----------------------------------------------------------------------
// Fetch and render reviews when the Manage Reviews tab is opened
async function fetchReviews() {
  const loader = document.getElementById("loading");
  loader.style.display = "block"; // Show loader

  try {
    const response = await axios.get("http://localhost:5000/api/reviews");
    const reviews = response.data;

    populateReviewsTable(reviews);

    // Function to populate the review table
    function populateReviewsTable(reviews) {
      const tableBody = document.querySelector("#review-table tbody");
      tableBody.innerHTML = ""; // Clear previous data

      reviews.forEach((review, index) => {
        const row = `
            <tr>
              <td>${index + 1}</td>
              <td>${review.name}</td>
              <td>${review.rating}</td>
              <td>${review.comment}</td>
              <td>${review.destinationTitle}</td>
              <td>
                <button class="btn btn-danger" onclick="deleteReview('${review._id
          }')">Delete</button>
              </td>
            </tr>
          `;
        tableBody.innerHTML += row;
      });
    }
  } catch (error) {
    console.error("Error fetching reviews:", error.message);
  } finally {
    loader.style.display = "none"; // Hide loader
  }
}

// Function to delete a review by ID
async function deleteReview(reviewId) {
  const confirmDelete = confirm("Are you sure you want to delete this review?");
  if (!confirmDelete) return;

  try {
    await axios.delete(`http://localhost:5000/api/reviews/${reviewId}`);
    alert("Review deleted successfully");
    fetchReviews(); // Refresh table
  } catch (error) {
    console.error("Error deleting review:", error.message);
    alert(error.response?.data?.message || "Failed to delete review.");
  }
}



// ==========================================================
// ------------------- Footer starts ------------------------
// ==========================================================
const form = document.getElementById("footerForm");
const columnsContainer = document.getElementById("columnsContainer");
const socialMediaContainer = document.getElementById("socialMediaContainer");

const maxColumns = 4;

// Helper to create a new column
function createColumn(columnData = { heading: "", links: [] }) {
  const columnDiv = document.createElement("div");
  columnDiv.classList.add("column");

  columnDiv.innerHTML = `
        <label>Heading: <input type="text" value="${columnData.heading}" required /></label>
        <div class="linksContainer">
          ${columnData.links
      .map(
        (link) =>
          `
                <div class="link-item">
                  <input type="text" placeholder="Name" value="${link.name}" required />
                  <input type="url" placeholder="URL" value="${link.url}" required />
                  <button type="button" class="removeLink btn btn-danger">Remove Link</button>
                </div>
              `
      )
      .join("")}
        </div>
        <button type="button" class="addLink btn btn-primary mb-2">Add Link</button>
        <button type="button" class="removeColumn btn btn-danger mb-2">Remove Column</button>
      `;

  // Add link functionality
  columnDiv.querySelector(".addLink").addEventListener("click", () => {
    const linksContainer = columnDiv.querySelector(".linksContainer");
    const linkItem = document.createElement("div");
    linkItem.classList.add("link-item");
    linkItem.innerHTML = `
          <div class="row">
            <div class="col-lg-4 col-md-4 col-sm-12"><input type="text" placeholder="Name" required /></div>
            <div class="col-lg-4 col-md-4 col-sm-12"><input type="text" placeholder="URL" required /></div>
            <div class="col-lg-4 col-md-4 col-sm-12"><button type="button" class="removeLink btn btn-danger">Remove Link</button></div>
          </div>   
        `;
    linkItem.querySelector(".removeLink").addEventListener("click", () => {
      linkItem.remove();
    });
    linksContainer.appendChild(linkItem);
  });

  // Remove column functionality
  columnDiv.querySelector(".removeColumn").addEventListener("click", () => {
    columnDiv.remove();
  });

  // Attach event listeners for existing links
  columnDiv.querySelectorAll(".removeLink").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      e.target.closest(".link-item").remove();
    })
  );

  columnsContainer.appendChild(columnDiv);
}

// Helper to create a social media entry
function createSocialMedia(socialData = { platform: "", url: "", icon: "" }) {
  const socialDiv = document.createElement("div");
  socialDiv.classList.add("social-media-item");
  socialDiv.innerHTML = `
        <input type="text" placeholder="Platform" value="${socialData.platform}" required />
        <input type="text" placeholder="URL" value="${socialData.url}" required />
        <input type="text" placeholder="Icon Class (e.g., fab fa-facebook)" value="${socialData.icon}" required />
        <button type="button" class="removeSocialMedia btn btn-danger mb-2">Remove</button>
      `;

  socialDiv.querySelector(".removeSocialMedia").addEventListener("click", () => {
    socialDiv.remove();
  });

  socialMediaContainer.appendChild(socialDiv);
}

// Load existing footer data
fetch("http://localhost:5000/api/footer")
  .then((response) => response.json())
  .then((data) => {
    // Populate columns
    data.columns.forEach((column) => createColumn(column));

    // Populate newsletter
    document.getElementById("newsletterHeading").value = data.newsletter.heading;
    document.getElementById("newsletterDescription").value = data.newsletter.description;

    // Populate social media links
    data.socialMedia.forEach((social) => createSocialMedia(social));
  });

// Add new column
document.getElementById("addColumn").addEventListener("click", () => {
  if (columnsContainer.children.length < maxColumns) {
    createColumn();
  } else {
    alert("You can only add up to 4 columns.");
  }
});

// Add new social media
document.getElementById("addSocialMedia").addEventListener("click", () => {
  createSocialMedia();
});

// Update footer data
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const columns = Array.from(columnsContainer.children).map((column) => ({
    heading: column.querySelector("input[type='text']").value,
    links: Array.from(column.querySelectorAll(".link-item")).map((linkItem) => ({
      name: linkItem.querySelector("input[placeholder='Name']").value,
      url: linkItem.querySelector("input[placeholder='URL']").value,
    })),
  }));

  const newsletter = {
    heading: document.getElementById("newsletterHeading").value,
    description: document.getElementById("newsletterDescription").value,
  };

  const socialMedia = Array.from(socialMediaContainer.children).map((socialDiv) => ({
    platform: socialDiv.querySelector("input[placeholder='Platform']").value,
    url: socialDiv.querySelector("input[placeholder='URL']").value,
    icon: socialDiv.querySelector("input[placeholder='Icon Class']").value,
  }));

  fetch("http://localhost:5000/api/footer", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ columns, newsletter, socialMedia }),
  })
    .then((response) => response.json())
    .then(() => alert("Footer updated successfully"))
    .catch((error) => alert("Error updating footer"));
});

// ==========================================================
// ------------------- Footer ends ------------------------
// ==========================================================


// ----------------------------------------------------------------------
// -------------------------- Enquiries ---------------------------------
// ----------------------------------------------------------------------
// Fetch and render enquiries when the Manage Enquiries tab is opened
async function fetchEnquiries() {
  const loader = document.getElementById("enquiry-loading");
  loader.style.display = "block"; // Show loader

  try {
    const response = await axios.get("http://localhost:5000/api/enquiry/list");
    const enquiries = response.data;

    populateEnquiriesTable(enquiries);

    // Function to populate the enquiries table
    function populateEnquiriesTable(enquiries) {
      const tableBody = document.querySelector("#enquiry-table tbody");
      tableBody.innerHTML = ""; // Clear previous data

      enquiries.forEach((enquiry, index) => {
        const row = `
          <tr>
            <td>${index + 1}</td>
            <td>${enquiry.destinations.join(", ")}</td>
            <td>${enquiry.checkIn}</td>
            <td>${enquiry.checkOut}</td>
            <td>${enquiry.adults}</td>
            <td>${enquiry.children || "N/A"}</td>
            <td>${enquiry.childAge || "N/A"}</td>
            <td>${enquiry.budget}</td>
            <td>${enquiry.mealPlan}</td>
            <td>${enquiry.hotelCategory}</td>
            <td>${enquiry.additionalRequirements || "N/A"}</td>
            <td>${enquiry.name || "N/A"}</td>
            <td>${enquiry.phone || "N/A"}</td>
            <td>${enquiry.email || "N/A"}</td>
            <td>
              <button class="btn btn-danger" onclick="deleteEnquiry('${enquiry._id}')">Delete</button>
            </td>
          </tr>
        `;
        tableBody.innerHTML += row;
      });
    }
  } catch (error) {
    console.error("Error fetching enquiries:", error.message);
  } finally {
    loader.style.display = "none"; // Hide loader
  }
}

// Function to delete an enquiry by ID
async function deleteEnquiry(enquiryId) {
  const confirmDelete = confirm(
    "Are you sure you want to delete this enquiry?"
  );
  if (!confirmDelete) return;

  try {
    await axios.delete(`http://localhost:5000/api/enquiry/${enquiryId}`);
    alert("Enquiry deleted successfully");
    fetchEnquiries(); // Refresh table
  } catch (error) {
    console.error("Error deleting enquiry:", error.message);
    alert(error.response?.data?.message || "Failed to delete enquiry.");
  }
}

// ==========================================================
// ------------------- Enquires ends ------------------------
// ==========================================================


// ==========================================================
// ------------------- About us starts-----------------------
// ==========================================================



const API_URL = "http://localhost:5000/api/about";

const loading = document.getElementById("loading");
const valuesSection = document.getElementById("valuesSection");

// Load existing About Us data
async function loadAboutData() {
  loading.style.display = "block";
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    // Populate About section
    document.getElementById("aboutTitle").value = data.about.title;
    document.getElementById("aboutHeading").value = data.about.heading;
    document.getElementById("aboutDescription").value = data.about.description;
    document.getElementById("aboutMilestones").value = data.about.milestones.join(", ");
    document.getElementById("aboutImages").value = data.about.images.join(", ");
    document.getElementById("aboutBigImage").value = data.about.bigImage;

    // Populate Mission & Vision
    document.getElementById("missionText").value = data.missionVision.mission;
    document.getElementById("visionText").value = data.missionVision.vision;
    document.getElementById("missionImage").value = data.missionVision.images.mission;
    document.getElementById("visionImage").value = data.missionVision.images.vision;

    // Populate Values
    valuesSection.innerHTML = "";
    data.values.forEach((value, index) => addValueField(value, index));
  } catch (error) {
    console.error("Error loading About Us data:", error);
  } finally {
    loading.style.display = "none";
  }
}

// Add a value field
function addValueField(value = {}, index) {
  const valueDiv = document.createElement("div");
  valueDiv.className = "value-group mb-3";
  valueDiv.innerHTML = `
    <h4>Value ${index + 1}</h4>
    <div class="mb-2">
      <label for="valueTitle${index}" class="form-label">Title</label>
      <input type="text" class="form-control" id="valueTitle${index}" value="${value.title || ""}" />
    </div>
    <div class="mb-2">
      <label for="valueDescription${index}" class="form-label">Description</label>
      <textarea class="form-control" id="valueDescription${index}" rows="2">${value.description || ""}</textarea>
    </div>
    <div class="mb-2">
      <label for="valueIcon${index}" class="form-label">Icon URL</label>
      <input type="text" class="form-control" id="valueIcon${index}" value="${value.icon || ""}" />
    </div>
    <button type="button" class="btn btn-danger btn-sm removeValue" onclick="removeValue(this)">Remove</button>
  `;
  valuesSection.appendChild(valueDiv);
}

// Remove a value field
function removeValue(button) {
  button.parentElement.remove();
}

// Add new value field
document.getElementById("addValue").addEventListener("click", () => {
  const index = valuesSection.children.length;
  addValueField({}, index);
});

// Save About Us data
document.getElementById("saveAboutUs").addEventListener("click", async () => {
  loading.style.display = "block";

  const values = Array.from(valuesSection.children).map((div, index) => ({
    title: div.querySelector(`#valueTitle${index}`).value,
    description: div.querySelector(`#valueDescription${index}`).value,
    icon: div.querySelector(`#valueIcon${index}`).value,
  }));

  const updatedData = {
    about: {
      title: document.getElementById("aboutTitle").value,
      heading: document.getElementById("aboutHeading").value,
      description: document.getElementById("aboutDescription").value,
      bigImage: document.getElementById("aboutBigImage").value,
      milestones: document.getElementById("aboutMilestones").value.split(",").map((m) => m.trim()),
      images: document.getElementById("aboutImages").value.split(",").map((img) => img.trim()),
    },
    missionVision: {
      mission: document.getElementById("missionText").value,
      vision: document.getElementById("visionText").value,
      images: {
        mission: document.getElementById("missionImage").value,
        vision: document.getElementById("visionImage").value,
      },
    },
    values,
  };

  try {
    const response = await fetch(API_URL, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });
    const result = await response.json();
    alert("About Us data updated successfully!");
  } catch (error) {
    console.error("Error saving About Us data:", error);
  } finally {
    loading.style.display = "none";
  }
});

// ==========================================================
// ------------------- About us ends ------------------------
// ==========================================================


// ==========================================================
// ------------------- herosection starts --------------------
// ==========================================================

// API Base URL
const apiBaseUrl = "http://localhost:5000/api/herosection";

// Show loading spinner
function showLoading(show) {
  const loading = document.getElementById("loading");
  loading.style.display = show ? "block" : "none";
}

// Fetch all banners and display them in the table
async function fetchBanners() {
  try {
    showLoading(true);
    const response = await fetch(apiBaseUrl);
    const banners = await response.json();
    const tableBody = document.getElementById("banners-table-body");

    // Clear existing rows
    tableBody.innerHTML = "";

    banners.forEach((banner) => {
      const row = `
        <tr>
          <td><img src="${banner.image}" alt="${banner.title}" width="100" /></td>
          <td>${banner.title}</td>
          <td>${banner.subtitle}</td>
          <td>
            <button onclick="editBanner('${banner._id}')" class="btn btn-primary">Edit</button>
            <button onclick="deleteBanner('${banner._id}')" class="btn btn-danger">Delete</button>
          </td>
        </tr>
      `;
      tableBody.innerHTML += row;
    });
  } catch (error) {
    console.error("Error fetching banners:", error);
  } finally {
    showLoading(false);
  }
}

// Add a new banner
document.getElementById("new-banner-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const newBanner = {
    title: document.getElementById("banner-title").value,
    subtitle: document.getElementById("banner-subtitle").value,
    link: document.getElementById("banner-link").value,
    image: document.getElementById("banner-image").value,
  };

  try {
    showLoading(true);
    const response = await fetch(apiBaseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBanner),
    });

    if (response.ok) {
      alert("Banner added successfully!");
      document.getElementById("new-banner-form").reset();
      fetchBanners();
    } else {
      alert("Failed to add banner.");
    }
  } catch (error) {
    console.error("Error adding banner:", error);
  } finally {
    showLoading(false);
  }
});

// Delete a banner
async function deleteBanner(id) {
  if (!confirm("Are you sure you want to delete this banner?")) return;

  try {
    showLoading(true);
    const response = await fetch(`${apiBaseUrl}/${id}`, { method: "DELETE" });

    if (response.ok) {
      alert("Banner deleted successfully!");
      fetchBanners();
    } else {
      alert("Failed to delete banner.");
    }
  } catch (error) {
    console.error("Error deleting banner:", error);
  } finally {
    showLoading(false);
  }
}

// Edit a banner (dummy implementation for now)
function editBanner(id) {
  alert(`Edit functionality not yet implemented for banner ID: ${id}`);
  // You can expand this function to open a modal or inline form for editing
}

// ==========================================================
// ------------------- Herosection ends----------------------
// ==========================================================
const apiHomeUrl = "http://localhost:5000/api/home";


// ==========================================================
// ------------------- Home starts ----------------------
// ==========================================================

// ********************** Featured ***********************
function renderFeaturedUs(featuredUs) {
  const featuredUsList = document.getElementById("featuredUsList");
  featuredUsList.innerHTML = featuredUs.map((item, index) => `
      <div class="featured-item">
          <div>Feature - ${index + 1}</div>
          <input type="text" value="${item.title}" id="featured-title-${index}">
          <input type="text" value="${item.description}" id="featured-description-${index}">
      </div>
  `).join("");
}
function updateFeaturedUs() {
  const updatedFeaturedUs = [];
  document.querySelectorAll(".featured-item").forEach((item, index) => {
    updatedFeaturedUs.push({
      title: document.getElementById(`featured-title-${index}`).value,
      description: document.getElementById(`featured-description-${index}`).value
    });
  });

  fetch("http://localhost:5000/api/home/", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ featuredUs: updatedFeaturedUs })
  })
    .then(response => response.json())
    .then(data => {
      alert("Featured section updated successfully!");
      renderFeaturedUs(data.featuredUs); // Refresh UI
    })
    .catch(error => console.error("Error updating data:", error));
}

// ********************** About ***********************
// Populate the admin form with fetched data
function renderAboutUsAdmin(aboutUs) {
  document.getElementById("aboutUsTitle").value = aboutUs.title;
  document.getElementById("aboutUsHeadline").value = aboutUs.headline;
  document.getElementById("aboutUsDescription").value = aboutUs.description;
  document.getElementById("aboutUsMainImage").value = aboutUs.mainImage;
  document.getElementById("aboutUsImageList").value = aboutUs.imageList.join(", ");
}
// Update API with new data
function updateAboutUs() {
  const updatedAboutUs = {
    title: document.getElementById("aboutUsTitle").value,
    headline: document.getElementById("aboutUsHeadline").value,
    description: document.getElementById("aboutUsDescription").value,
    mainImage: document.getElementById("aboutUsMainImage").value,
    imageList: document.getElementById("aboutUsImageList").value.split(",").map(img => img.trim()),
  };

  fetch("http://localhost:5000/api/home/", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ aboutUs: updatedAboutUs }),
  })
    .then((response) => response.json())
    .then((data) => {
      alert("About Us section updated successfully!");
      renderAboutUsAdmin(data.aboutUs); // Refresh UI
    })
    .catch((error) => console.error("Error updating About Us:", error));
}

// ********************** FAQs ***********************
// Render FAQ data in the admin panel
function renderFAQAdmin(faqSection) {
  document.getElementById("faqTitle").value = faqSection.title;
  document.getElementById("faqDescription").value = faqSection.description;

  const faqList = document.getElementById("faqList");
  faqList.innerHTML = faqSection.faqItems.map((faq, index) => `
    <div class="faq-item mt-2">
      <div><b>FAQ ${index+1}</b></div>
      <label>Question:</label>
      <input type="text" value="${faq.question}" id="faq-question-${index}" />
      <label>Answer:</label>
      <textarea id="faq-answer-${index}">${faq.answer}</textarea>
    </div>
  `).join("");
}
// Update FAQ section
function updateFAQ() {
  const updatedFAQItems = [];
  document.querySelectorAll(".faq-item").forEach((item, index) => {
    updatedFAQItems.push({
      question: document.getElementById(`faq-question-${index}`).value,
      answer: document.getElementById(`faq-answer-${index}`).value
    });
  });

  const updatedFAQ = {
    title: document.getElementById("faqTitle").value,
    description: document.getElementById("faqDescription").value,
    faqItems: updatedFAQItems
  };

  fetch("http://localhost:5000/api/home/", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ faqSection: updatedFAQ }),
  })
    .then((response) => response.json())
    .then((data) => {
      alert("FAQ section updated successfully!");
      renderFAQAdmin(data.faqSection);
    })
    .catch((error) => console.error("Error updating FAQ data:", error));
}

// ************ Top & Trending Destinations ****************
// Render Top Destinations in Admin Panel
function renderTopDestinationsAdmin(topDestinations) {
  const container = document.getElementById("topDestinationsList");
  container.innerHTML = topDestinations.map((dest, index) => `
    <div class="destination-item mt-3">
      <div><b>Destination ${index+1}</b></div>

      <label>Title:</label>
      <input type="text" value="${dest.title}" id="top-title-${index}" />
      
      <label>Image URL:</label>
      <input type="text" value="${dest.image}" id="top-image-${index}" />

      <label>Rating:</label>
      <input type="number" value="${dest.rating}" id="top-rating-${index}" />

      <label>Link:</label>
      <input type="text" value="${dest.link}" id="top-link-${index}" />
    </div>
  `).join("");
}

// Render Trending Destinations in Admin Panel
function renderTrendingDestinationsAdmin(trending) {
  const container = document.getElementById("trendingDestinationsList");
  container.innerHTML = trending.map((trend, index) => `
    <div class="destination-item mt-3">
      <div><b>Destination ${index+1}</b></div>

      <label>Country:</label>
      <input type="text" value="${trend.country}" id="trend-country-${index}" />

      <label>Title:</label>
      <input type="text" value="${trend.title}" id="trend-title-${index}" />

      <label>Image URL:</label>
      <input type="text" value="${trend.image}" id="trend-image-${index}" />

      <label>Description:</label>
      <textarea id="trend-description-${index}">${trend.description}</textarea>

      <label>Duration:</label>
      <input type="text" value="${trend.duration}" id="trend-duration-${index}" />

      <label>Price:</label>
      <input type="text" value="${trend.price}" id="trend-price-${index}" />
    </div>
  `).join("");
}

// Update Destinations
function updateDestinations() {
  const updatedTopDestinations = [];
  document.querySelectorAll("#topDestinationsList .destination-item").forEach((item, index) => {
    updatedTopDestinations.push({
      title: document.getElementById(`top-title-${index}`).value,
      image: document.getElementById(`top-image-${index}`).value,
      rating: parseInt(document.getElementById(`top-rating-${index}`).value),
      link: document.getElementById(`top-link-${index}`).value,
    });
  });

  const updatedTrendingDestinations = [];
  document.querySelectorAll("#trendingDestinationsList .destination-item").forEach((item, index) => {
    updatedTrendingDestinations.push({
      country: document.getElementById(`trend-country-${index}`).value,
      title: document.getElementById(`trend-title-${index}`).value,
      image: document.getElementById(`trend-image-${index}`).value,
      description: document.getElementById(`trend-description-${index}`).value,
      duration: document.getElementById(`trend-duration-${index}`).value,
      price: document.getElementById(`trend-price-${index}`).value,
    });
  });

  fetch("http://localhost:5000/api/home/", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      topDestinations: updatedTopDestinations,
      trending: updatedTrendingDestinations,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      alert("Destinations updated successfully!");
      renderTopDestinationsAdmin(data.topDestinations);
      renderTrendingDestinationsAdmin(data.trending);
    })
    .catch((error) => console.error("Error updating destinations:", error));
}


// ************ Main Articles ****************
// Render Main Article in Admin Panel
function renderMainArticleAdmin(mainArticle) {
  const container = document.getElementById("mainArticleForm");
  container.innerHTML = `
    <div class="article-item">
      <label>Title:</label>
      <input type="text" value="${mainArticle.title}" id="main-title" />

      <label>Image URL:</label>
      <input type="text" value="${mainArticle.image}" id="main-image" />

      <label>Date:</label>
      <input type="text" value="${mainArticle.date}" id="main-date" />

      <label>Tags (comma separated):</label>
      <input type="text" value="${mainArticle.tags.join(", ")}" id="main-tags" />

      <label>Description:</label>
      <textarea id="main-description">${mainArticle.description}</textarea>

      <label>Author Name:</label>
      <input type="text" value="${mainArticle.authorName}" id="main-author-name" />

      <label>Author Image URL:</label>
      <input type="text" value="${mainArticle.authorImage}" id="main-author-image" />
    </div>
  `;
}

// Render Sub Articles in Admin Panel
function renderSubArticlesAdmin(subArticles) {
  const container = document.getElementById("subArticlesList");
  container.innerHTML = subArticles
    .map(
      (article, index) => `
      <div class="article-item mt-2">
      <div><b>Article ${index+1}</b></div>

      <label>Title:</label>
      <input type="text" value="${article.title}" id="sub-title-${index}" />

      <label>Image URL:</label>
      <input type="text" value="${article.image}" id="sub-image-${index}" />

      <label>Date:</label>
      <input type="text" value="${article.date}" id="sub-date-${index}" />

      <label>Tags (comma separated):</label>
      <input type="text" value="${article.tags.join(", ")}" id="sub-tags-${index}" />
    </div>
  `
    )
    .join("");
}

// Update Articles
function updateArticles() {
  const updatedMainArticle = {
    title: document.getElementById("main-title").value,
    image: document.getElementById("main-image").value,
    date: document.getElementById("main-date").value,
    tags: document.getElementById("main-tags").value.split(","),
    description: document.getElementById("main-description").value,
    authorName: document.getElementById("main-author-name").value,
    authorImage: document.getElementById("main-author-image").value,
  };

  const updatedSubArticles = [];
  document.querySelectorAll("#subArticlesList .article-item").forEach((item, index) => {
    updatedSubArticles.push({
      title: document.getElementById(`sub-title-${index}`).value,
      image: document.getElementById(`sub-image-${index}`).value,
      date: document.getElementById(`sub-date-${index}`).value,
      tags: document.getElementById(`sub-tags-${index}`).value.split(","),
    });
  });

  fetch("http://localhost:5000/api/home/", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      mainArticle: updatedMainArticle,
      subArticles: updatedSubArticles,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      alert("Articles updated successfully!");
      renderMainArticleAdmin(data.mainArticle);
      renderSubArticlesAdmin(data.subArticles);
    })
    .catch((error) => console.error("Error updating articles:", error));
}

// ************ Testimonials ****************
// Render Testimonials in Admin Panel
function renderTestimonialsAdmin(testimonials) {
  const container = document.getElementById("testimonialsList");
  container.innerHTML = testimonials
    .map(
      (testimonial, index) => `
    <div class="testimonial-item mt-2">
      <div><b>Testimonial ${index+1}</b></div>
      <label>Name:</label>
      <input type="text" value="${testimonial.name}" id="test-name-${index}" />

      <label>Image URL:</label>
      <input type="text" value="${testimonial.image}" id="test-image-${index}" />

      <label>Review:</label>
      <textarea id="test-review-${index}">${testimonial.review}</textarea>

      <label>Rating (1-5):</label>
      <input type="number" value="${testimonial.rating}" min="1" max="5" id="test-rating-${index}" />
    </div>
  `
    )
    .join("");
}

// Update Testimonials
function updateTestimonials() {
  const updatedTestimonials = [];
  document.querySelectorAll("#testimonialsList .testimonial-item").forEach((item, index) => {
    updatedTestimonials.push({
      name: document.getElementById(`test-name-${index}`).value,
      image: document.getElementById(`test-image-${index}`).value,
      review: document.getElementById(`test-review-${index}`).value,
      rating: parseInt(document.getElementById(`test-rating-${index}`).value),
    });
  });

  fetch("http://localhost:5000/api/home/", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ testimonials: updatedTestimonials }),
  })
    .then((response) => response.json())
    .then((data) => {
      alert("Testimonials updated successfully!");
      renderTestimonialsAdmin(data.testimonials);
    })
    .catch((error) => console.error("Error updating testimonials:", error));
}


document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:5000/api/home/")
    .then(response => response.json())
    .then(data => {
      renderFeaturedUs(data.featuredUs);
      renderAboutUsAdmin(data.aboutUs);
      renderFAQAdmin(data.faqSection);
      renderTopDestinationsAdmin(data.topDestinations);
      renderTrendingDestinationsAdmin(data.trending);
      renderMainArticleAdmin(data.mainArticle);
      renderSubArticlesAdmin(data.subArticles);
      renderTestimonialsAdmin(data.testimonials);
    })
    .catch(error => console.error("Error loading data:", error));
});

// ==========================================================
// ------------------- Home ends ----------------------
// ==========================================================



document.addEventListener("DOMContentLoaded", () => {
  fetchUsers();
  fetchDestinations();
  fetchDestinationsByCategory();
  fetchBlogs();
  fetchBookings();
  fetchSubscribers();
  fetchContacts();
  fetchQueries();
  fetchReviews();
  fetchEnquiries();
  loadAboutData();
  fetchBanners();
});

// document.addEventListener("DOMContentLoaded", () => {
//   fetch("http://localhost:5000/api/home/")
//       .then(response => response.json())
//       .then(data => {
//           // renderFAQSection(data.faqSection);
//           renderFeaturedUs(data.featuredUs);
//       })
//       .catch(error => console.error("Error loading data:", error));
// });
