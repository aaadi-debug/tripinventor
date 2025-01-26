const destinationList = document.getElementById('destinationList');
const destinationsSelect = document.getElementById('destinations');
const checkInInput = document.getElementById('checkIn');
const checkOutInput = document.getElementById('checkOut');
const nightsLabel = document.getElementById('nightsLabel');
const adultSelection = document.getElementById('adultSelection');
const childSelection = document.getElementById('childSelection');

const userName = document.getElementById('name');
const userEmail = document.getElementById('email');
const userPhone = document.getElementById('phone');


const today = new Date().toISOString().split('T')[0];
checkInInput.min = today;
checkOutInput.min = today;

destinationsSelect.addEventListener('change', () => {
    const selectedValue = destinationsSelect.value;
    const selectedText = destinationsSelect.options[destinationsSelect.selectedIndex].text;
    const noDestinationsPlaceholder = document.getElementById('noDestinations');

    if (selectedValue) {
        // Check if the destination is already in the list
        const existingDestinations = Array.from(destinationList.querySelectorAll('.destination-item span'))
            .map(item => item.textContent);

        if (existingDestinations.includes(selectedText)) {
            alert(`${selectedText} is already added.`);
            destinationsSelect.value = ""; // Reset the dropdown
            return;
        }

        // Remove the "No destinations" placeholder if it exists
        if (noDestinationsPlaceholder) noDestinationsPlaceholder.remove();

        // Add the new destination
        const destinationItem = document.createElement('div');
        destinationItem.classList.add('destination-item');
        destinationItem.innerHTML = `
            <span>${selectedText}</span>
            <button type="button" class="remove-btn" onclick="removeDestination(this)">Remove</button>
        `;
        destinationList.appendChild(destinationItem);
        destinationsSelect.value = ""; // Reset the dropdown
    }
});

function removeDestination(button) {
    button.parentElement.remove();

    if (destinationList.children.length === 0) {
        const noDestinationsPlaceholder = document.createElement('p');
        noDestinationsPlaceholder.id = 'noDestinations';
        noDestinationsPlaceholder.textContent = '-- No destinations added --';
        destinationList.appendChild(noDestinationsPlaceholder);
    }
}

function calculateNights() {
    const checkInDate = new Date(checkInInput.value);
    const checkOutDate = new Date(checkOutInput.value);

    if (checkInDate && checkOutDate && checkOutDate > checkInDate) {
        const timeDifference = checkOutDate - checkInDate;
        const nights = timeDifference / (1000 * 60 * 60 * 24);
        nightsLabel.textContent = `Nights: ${nights}`;
    } else {
        nightsLabel.textContent = 'Nights: 0';
    }
}

function generatePassengerOptions(rowElement) {
    for (let i = 1; i <= 9; i++) {
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
    moreOption.textContent = '>9';
    moreOption.addEventListener('click', () => {
        rowElement.querySelectorAll('.passenger-option').forEach(opt => opt.classList.remove('selected'));
        moreOption.classList.add('selected');
    });
    rowElement.appendChild(moreOption);
}

generatePassengerOptions(adultSelection);
generatePassengerOptions(childSelection);

document.getElementById('enquiryForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = {
        name: userName.value,
        email: userEmail.value,
        phone: userPhone.value,
        destinations: Array.from(destinationList.children).map(item => item.textContent.trim()),
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
    // alert('Form submitted successfully!');
});