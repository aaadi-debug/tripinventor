document.getElementById("reviewForm").addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent the default form submission

    const formData = {
        name: document.getElementById("reviewerName").value,
        rating: document.getElementById("reviewRating").value,
        comment: document.getElementById("reviewContent").value,
        destinationTitle: document.querySelector("#destinationHiddenInput").value, // Include the hidden input value
    };

    try {
        const response = await fetch("http://localhost:5000/api/reviews", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            alert("Review submitted successfully!");
            location.reload(); // Refresh the page on success
        } else {
            const error = await response.json();
            alert("Error: " + error.message);
        }
    } catch (err) {
        console.error("Error submitting review:", err);
        alert("An error occurred. Please try again.");
    }
});

