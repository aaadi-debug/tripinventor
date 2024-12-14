document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user")); // Fetch user data from localStorage

  if (user) {
    // Update the dashboard with user's name and phone
    const authorContent = document.querySelector(".author-content");
    if (authorContent) {
      authorContent.innerHTML = `
          <h3 class="mb-1 white">
            <a href="#" class="white">Welcome, ${user.username} </a>
          </h3>
        `;
    }
  } else {
    // Redirect to login page if not logged in
    window.location.href = "./login.html";
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user")); // Fetch user data from localStorage

  if (user) {
    // Populate profile details
    const nameInput = document.querySelector(
      '.my-profile input[value="Tom Perrin"]'
    );
    const phoneInput = document.querySelector(
      '.my-profile input[value="(123) 123-456"]'
    );
    const emailInput = document.querySelector(
      '.my-profile input[value="tom@example.com"]'
    );

    if (nameInput) nameInput.value = user.username || "";

  } else {
    // Redirect to login page if not logged in
    window.location.href = "./login.html";
  }
});
