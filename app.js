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

// Simulating a pre-existing user (this would come from a database in a real app)
const users = {
    "user@example.com": {
        email: "user@example.com",
        password: "password123",
        bio: "Hello, I'm a student!"
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
    const selectedUniversity = document.getElementById('universitySelect').value();
    localStorage.setItem('selectedUniversity', selectedUniversity);
    showProfilePage();
}

// Show user profile page and events
function showProfilePage() {
    const userEmail = localStorage.getItem('userEmail');
    const userUniversity = localStorage.getItem('selectedUniversity');
    const userBio = users[userEmail].bio || "No bio set yet.";

    document.getElementById('universitySelection').style.display = 'none';
    document.getElementById('profilePage').style.display = 'block';
    document.getElementById('profileEmail').innerText = userEmail;
    document.getElementById('profileUniversity').innerText = userUniversity;
    document.getElementById('profileBio').innerText = userBio;

    // Show events for the selected university
    showEvents(userUniversity);
}

// Display events based on the selected university
function showEvents(university) {
    const updatesDiv = document.getElementById('updates');
    updatesDiv.innerHTML = ''; // Clear any previous updates

    if (events[university]) {
        events[university].forEach(event => {
            const eventElement = document.createElement('p');
            eventElement.textContent = event;
            updatesDiv.appendChild(eventElement);
        });
    } else {
        updatesDiv.innerHTML = '<p>No events available for this university.</p>';
    }
}

// Update user bio
function updateBio() {
    const newBio = document.getElementById('bioInput').value;
    const userEmail = localStorage.getItem('userEmail');
    
    // Update bio in 'database'
    users[userEmail].bio = newBio;

    showProfilePage(); // Refresh profile page with updated bio
}

// Open the profile modal
function openProfileModal() {
    document.getElementById('profileModal').style.display = 'flex';
    const userEmail = localStorage.getItem('userEmail');
    const userBio = users[userEmail].bio || "No bio set yet.";
    document.getElementById('bioInput').value = userBio;
}

// Close the profile modal
function closeProfileModal() {
    document.getElementById('profileModal').style.display = 'none';
}
