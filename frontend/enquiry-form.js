const destinationTypeSelect = document.getElementById("destinationType");
const destinationList = document.getElementById('destinationList');
const selectedDestinationsInput = document.getElementById('selectedDestinations');
const destinationsSelect = document.getElementById('destinations');
const checkInInput = document.getElementById('checkIn');
const checkOutInput = document.getElementById('checkOut');
const nightsLabel = document.getElementById('nightsLabel');
const adultSelection = document.getElementById('adultSelection');
const childSelection = document.getElementById('childSelection');

const userName = document.getElementById('name');
const userEmail = document.getElementById('email');
const userPhone = document.getElementById('phone');

// Destination options
const destinations = {
    domestic: ["Ladakh", "Jammu & Kashmir", "Himachal Pradesh", "Uttarakhand", "Rajasthan", "Gujarat", "North East", "Maharashtra", "Karnataka", "Tamil Nadu", "Madhya Pradesh", "Kerala", "Lakshadweep"],
    international: [
        "Austria", "Belgium", "Czech Republic", "Denmark", "Finland", "France", 
        "Germany", "Greece", "Hungary", "Ireland", "Italy", "Netherlands", 
        "Portugal", "Romania", "Spain", "Sweden", "Switzerland", "Egypt", 
        "Saudi Arabia", "Turkey", "United Arab Emirates", "Kenya & Tanzania", 
        "Mauritius", "Morocco", "Seychelles", "South Africa", "Hong Kong & Macau", 
        "Japan", "South Korea", "Cambodia", "Indonesia", "Laos", "Malaysia", 
        "Philippines", "Singapore", "Thailand", "Vietnam", "Bhutan", "Maldives", 
        "Nepal", "Sri Lanka", "Armenia", "Azerbaijan", "Georgia", "Kazakhstan", 
        "Uzbekistan", "Australia", "Fiji", "New Zealand", "Canada", 
        "United States of America", "United Kingdom & Ireland"
    ]
};


const today = new Date().toISOString().split('T')[0];
checkInInput.min = today;
checkOutInput.min = today;


// Update destinations based on selected type
destinationTypeSelect.addEventListener('change', function () {
    const selectedType = this.value;
    destinationsSelect.innerHTML = '<option value="">Select a destination</option>'; // Reset options

    if (selectedType) {
        destinations[selectedType].forEach(dest => {
            const option = document.createElement('option');
            option.value = dest;
            option.textContent = dest;
            destinationsSelect.appendChild(option);
        });
        destinationsSelect.disabled = false; // Enable dropdown
    } else {
        destinationsSelect.disabled = true;
    }
});

// Function to add selected destinations
destinationsSelect.addEventListener('change', function () {
  const selectedValue = this.value;
  const selectedText = this.options[this.selectedIndex].text;

  if (selectedValue) {
    // Check if already added
    const existingDestinations = Array.from(destinationList.querySelectorAll('.destination-item span'))
      .map(item => item.textContent);

    if (existingDestinations.includes(selectedText)) {
      alert(`${selectedText} is already added.`);
      this.value = "";
      return;
    }

    // Remove "No destinations" message
    const noDestinationsPlaceholder = document.getElementById('noDestinations');
    if (noDestinationsPlaceholder) noDestinationsPlaceholder.remove();

    // Add selected destination
    const destinationItem = document.createElement('div');
    destinationItem.classList.add('destination-item');
    destinationItem.innerHTML = `
      <span>${selectedText}</span>
      <button type="button" class="remove-btn" onclick="removeDestination(this)">Remove</button>
    `;
    destinationList.appendChild(destinationItem);

    // Update hidden input field
    updateSelectedDestinations();
    this.value = "";
  }
});

// Function to remove a destination
function removeDestination(button) {
  button.parentElement.remove();
  updateSelectedDestinations();

  // Show "No destinations" message if list is empty
  if (destinationList.children.length === 0) {
    const noDestinationsPlaceholder = document.createElement('p');
    noDestinationsPlaceholder.id = 'noDestinations';
    noDestinationsPlaceholder.textContent = '-- No destinations added --';
    destinationList.appendChild(noDestinationsPlaceholder);
  }
}

// Function to update hidden input field with selected destinations
function updateSelectedDestinations() {
  const selectedValues = Array.from(destinationList.querySelectorAll('.destination-item span'))
    .map(item => item.textContent);

  selectedDestinationsInput.value = selectedValues.join(', '); // Store as a comma-separated list
}


function calculateNights() {
    const checkInDate = new Date(checkInInput.value);
    const checkOutDate = new Date(checkOutInput.value);

    if (!checkInInput.value || !checkOutInput.value) {
        nightsLabel.textContent = 'Nights: 0';
        return;
    }

    if (checkOutDate <= checkInDate) {
        alert("Check-out date must be at least 2 days after the check-in date.");
        checkOutInput.value = ""; // Reset checkout date
        nightsLabel.textContent = 'Nights: 0';
        return;
    }

    const timeDifference = checkOutDate - checkInDate;
    const nights = timeDifference / (1000 * 60 * 60 * 24);

    if (nights < 2) {
        alert("There must be a minimum of 2 nights stay.");
        checkOutInput.value = ""; // Reset checkout date
        nightsLabel.textContent = 'Nights: 0';
        return;
    }

    nightsLabel.textContent = `Nights: ${nights}`;
}


function generatePassengerOptions(rowElement) {
    for (let i = 0; i <= 8; i++) {
        const option = document.createElement('div');
        option.classList.add('passenger-option');
        option.textContent = i;
        option.addEventListener('click', () => {
            rowElement.querySelectorAll('.passenger-option').forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
        });
        rowElement.appendChild(option);
    }

    const moreOption = document.createElement('div');
    moreOption.classList.add('passenger-option');
    moreOption.textContent = '>8';
    moreOption.addEventListener('click', () => {
        rowElement.querySelectorAll('.passenger-option').forEach(opt => opt.classList.remove('selected'));
        moreOption.classList.add('selected');
    });
    rowElement.appendChild(moreOption);
}

generatePassengerOptions(adultSelection);
generatePassengerOptions(childSelection);

// Add event listeners here
checkInInput.addEventListener('change', calculateNights);
checkOutInput.addEventListener('change', calculateNights);

document.getElementById('enquiryForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = {
        name: userName.value,
        email: userEmail.value,
        phone: userPhone.value,
        destinations: Array.from(destinationList.querySelectorAll('.destination-item span'))
            .map(span => span.textContent.trim()),  // Only destination names
        checkIn: checkInInput.value,
        checkOut: checkOutInput.value,
        adults: adultSelection.querySelector('.selected')?.textContent || "",
        children: childSelection.querySelector('.selected')?.textContent || "",
        childAge: document.getElementById('childAge').value,
        hotelCategory: document.getElementById('hotelCategory').value,
        budget: document.getElementById('budget').value,
        mealPlan: document.getElementById('mealPlan').value,
        additionalRequirements: document.getElementById('additionalRequirements').value
    };

    if (formData.destinations.length === 0 || !formData.checkIn || !formData.checkOut || !formData.adults || !formData.hotelCategory || !formData.budget || !formData.mealPlan || !formData.name || !formData.email || !formData.phone) {
        alert('Please fill all required fields.');
        return;
    }

    // Remove children details if not selected
    if (!formData.children) {
        delete formData.children;
        delete formData.childAge;
    }

    try {
        // Send POST request to the backend
        const response = await fetch('http://localhost:5000/api/enquiry/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            const result = await response.json();
            console.log('Form submitted successfully:', result);
            alert('Form submitted successfully!');

            // Reset the form after successful submission
            document.getElementById('enquiryForm').reset();
            // Optionally, reset dynamic fields like the destination list
            destinationList.innerHTML = '<p id="noDestinations">-- No destinations added --</p>';
            // nightsLabel.textContent = 'Nights: 0';
        } else {
            const error = await response.json();
            console.error('Error submitting form:', error);
            alert('Error submitting form. Please try again.');
        }
    } catch (err) {
        console.error('Network error:', err);
        alert('Network error. Please try again later.');
    }
    console.log('Form Data:', formData);
});
