
document.getElementById("anyQuestionFOrm").addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent the default form submission

    const formData = {
        name: document.getElementById("fullNameG").value,
        phone: document.getElementById("phoneG").value,
        checkin: document.getElementById("date-range0").value,
        guests: document.getElementById("guestsSelect").value,
        message: document.getElementById("messageGuest").value,
    };

    try {
        const response = await fetch("http://localhost:5000/api/queries", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            alert("Query form submitted successfully!");
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