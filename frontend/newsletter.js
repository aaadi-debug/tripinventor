document.addEventListener("submit", async (e) => {
  if (e.target && e.target.id === "subscribeForm") {
    e.preventDefault();
    const emailInput = e.target.querySelector('input[type="email"]');
    const email = emailInput.value;

    try {
      const response = await fetch('http://localhost:5000/api/subscribers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      document.getElementById('subsMessage').innerText = data.message;

      // Clear input field
      emailInput.value = '';  
      window.alert("Subscription successful!");

    } catch (error) {
      console.error('Error subscribing:', error);
    }
  }
});
