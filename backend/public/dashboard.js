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

async function openEditModal(destinationId) {
  try {
    console.log("Hi");
    // Fetch destination details
    console.log("Fetching destination with ID:", destinationId);

    const response = await axios.get(
      `http://localhost:5000/api/destinations/${destinationId}`
    );
    const destination = response.data;
    console.log("Hi2");

    // Populate form fields
    document.getElementById("destination-id").value = destinationId;
    document.getElementById("destination-title").value = destination.title;
    document.getElementById("destination-location").value =
      destination.location;
    document.getElementById("destination-discount").value =
      destination.discount || "";
    document.getElementById("destination-duration").value =
      destination.duration;
    document.getElementById("destination-price").value = destination.price;
    document.getElementById("destination-pickupLocation").value =
      destination.pickupLocation;
    document.getElementById("destination-images").value =
      destination.images.join(", ");
    document.getElementById("details-languages").value =
      destination.languages.join(", ");
    document.getElementById("destination-descriptions").value =
      destination.descriptions.join(", ");
    document.getElementById("additional-includes").value =
      destination.additionalInfo.includes.join(", ");
    document.getElementById("additional-excludes").value =
      destination.additionalInfo.excludes.join(", ");
    // document.getElementById("destination-reviews").value = JSON.stringify(
    //   destination.reviews
    // );

    // **Populate Itinerary**
    document.getElementById("destination-itinerary").value = JSON.stringify(
      destination.itinerary,
      null,
      2 // Formatting for better readability
    );


    // Pre-fill radio buttons
    // document.querySelector(`input[name="theme-tours"][value="${destination.themeTours}"]`).checked = true;
    document.querySelector(`input[name="wellness-and-spa-tours"][value="${destination.wellnessSpa}"]`).checked = true;
    document.querySelector(`input[name="beach-tours"][value="${destination.wellnessSpa}"]`).checked = true;
    document.querySelector(`input[name="wildlife-tours"][value="${destination.wellnessSpa}"]`).checked = true;
    document.querySelector(`input[name="culture-tours"][value="${destination.wellnessSpa}"]`).checked = true;
    document.querySelector(`input[name="trains-tours"][value="${destination.wellnessSpa}"]`).checked = true;
    document.querySelector(`input[name="terkking-tours"][value="${destination.wellnessSpa}"]`).checked = true;
    document.querySelector(`input[name="spiritual-tours"][value="${destination.wellnessSpa}"]`).checked = true;
    document.querySelector(`input[name="festival-tours"][value="${destination.wellnessSpa}"]`).checked = true;
    document.querySelector(`input[name="wonders-tours"][value="${destination.wellnessSpa}"]`).checked = true;
    document.querySelector(`input[name="unesco-tours"][value="${destination.wellnessSpa}"]`).checked = true;

    document.querySelector(`input[name="domestic-tours"][value="${destination.domesticTours}"]`).checked = true;
    document.querySelector(`input[name="international-tours"][value="${destination.internationalTours}"]`).checked = true;

    // Show the modal
    document.getElementById("add-destination-modal").style.display = "block";
  } catch (error) {
    // console.error("Error fetching destination:", error.message);
    // alert("Failed to fetch destination data.");

    console.error("Error fetching destination:", error);
    console.error("Response data:", error.response?.data);
  }
}

// Show the Add Destination Modal
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
      internationalTours: document.querySelector(
        'input[name="international-tours"]:checked'
      ).value,

    };

    // Itinerary validation logic
    let itineraryInput = document
      .getElementById("destination-itinerary")
      .value.trim();
    let itineraryData;

    try {
      itineraryData = itineraryInput ? JSON.parse(itineraryInput) : [];
    } catch (err) {
      console.error("Invalid JSON in itinerary input:", err);
      alert("The itinerary field contains invalid JSON. Please correct it.");
      return; // Stop form submission if the input is invalid
    }

    formData.itinerary = itineraryData; // Add validated itinerary to formData

    // Add the PDF file if uploaded
    const pdfFile = document.getElementById("destination-pdf").files[0];
    if (pdfFile) {
      formData.append("pdf", pdfFile);
    }

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

function generateItinerary() {
  const input = document.getElementById("destination-itinerary").value;
  let itinerary;

  try {
    // Parse the JSON input
    itinerary = JSON.parse(input);

    if (!Array.isArray(itinerary)) {
      throw new Error("Itinerary must be an array");
    }
  } catch (error) {
    alert("Invalid JSON: " + error.message);
    return;
  }

  // Clear and render itinerary
  const container = document.getElementById("itinerary-container");
  container.innerHTML = "";

  itinerary.forEach((day) => {
    const dayBlock = document.createElement("div");
    dayBlock.className = "itinerary-day";

    const dayTitle = document.createElement("h6");
    dayTitle.textContent = `${day.day}: ${day.title}`;
    dayBlock.appendChild(dayTitle);

    const activityList = document.createElement("ul");
    day.content.forEach((activity) => {
      const listItem = document.createElement("li");
      listItem.textContent = activity;
      activityList.appendChild(listItem);
    });

    dayBlock.appendChild(activityList);
    container.appendChild(dayBlock);
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
});
