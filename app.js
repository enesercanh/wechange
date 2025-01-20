// Sample events for each university
const events = {
    "University of Baghdad Jadriya": [
        "Event 1: Math Competition - February 10th",
        "Event 2: Research Presentation - March 5th",
        "Event 3: Career Fair - April 12th"
    ],
    "American University of Iraq Baghdad": [
        "Event 1: Startup Workshop - February 15th",
        "Event 2: International Conference - March 20th",
        "Event 3: Art Exhibition - April 25th"
    ],
    "University of Technology": [
        "Event 1: Robotics Workshop - February 20th",
        "Event 2: Coding Bootcamp - March 10th",
        "Event 3: Science Expo - April 18th"
    ]
};

// Predefined user accounts with strong passwords
const users = {
    "faosa414@gmail.com": {
        email: "faosa414@gmail.com",
        password: "Faos@2025Str0ngPass"  // A strong password
    },
    "laviier1994@gmail.com": {
        email: "laviier1994@gmail.com",
        password: "L@vi1er1994_StrongPwd"  // A strong password
    }
};

// Handle user login
function login() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Check if the email exists in the 'database' and the password matches
    if (users[email] && users[email].password === password) {
        localStorage.setItem('userEmail', email);
        alert('Login successful!');
        showUniversitySelection();
    } else {
        alert('Invalid login details');
    }
}

// Show university selection after login
function showUniversitySelection() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('universitySelection').style.display = 'block';
}

// Handle university selection
function selectUniversity() {
    const selectedUniversity = document.getElementById('universitySelect').value;
    localStorage.setItem('selectedUniversity', selectedUniversity);
    showEventsPage();
}

// Show events for the selected university
function showEventsPage() {
    const userUniversity = localStorage.getItem('selectedUniversity');
    document.getElementById('universitySelection').style.display = 'none';
    document.getElementById('updates').style.display = 'block';

    // Show events for the selected university
    const eventsList = document.getElementById('eventsList');
    eventsList.innerHTML = ''; // Clear any previous events

    if (events[userUniversity]) {
        events[userUniversity].forEach(event => {
            const eventElement = document.createElement('p');
            eventElement.textContent = event;
            eventsList.appendChild(eventElement);
        });
    } else {
        eventsList.innerHTML = '<p>No events available for this university.</p>';
    }
}
