let loggedIn = false;
let selectedUniversity = "";
let userBio = "";

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

// Show the login form
function showLogin() {
    document.getElementById('auth').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
}

// Show the signup form
function showSignup() {
    document.getElementById('auth').style.display = 'none';
    document.getElementById('signupForm').style.display = 'block';
}

// Signup function
function signup() {
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    
    if (email && password) {
        // Save the user data (for simplicity, not using a database)
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userPassword', password);
        alert('Signup successful!');
        showLogin(); // Show the login form after signup
    } else {
        alert('Please enter both email and password');
    }
}

// Login function
function login() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const storedEmail = localStorage.getItem('userEmail');
    const storedPassword = localStorage.getItem('userPassword');

    if (email === storedEmail && password === storedPassword) {
        alert('Login successful!');
        showUniversitySelection(); // Show university selection after login
    } else {
        alert('Invalid login details');
    }
}

// Show university selection after login
function showUniversitySelection() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('signupForm').style.display = 'none';
    document.getElementById('universitySelection').style.display = 'block';
}

// Handle university selection
function selectUniversity() {
    selectedUniversity = document.getElementById('universitySelect').value;
    localStorage.setItem('selectedUniversity', selectedUniversity); // Save the selection
    showProfilePage(); // Show the profile page after selecting university
}

// Show user profile page
function showProfilePage() {
    document.getElementById('universitySelection').style.display = 'none';
    const userEmail = localStorage.getItem('userEmail');
    const userUniversity = localStorage.getItem('selectedUniversity');
    const userBio = localStorage.getItem('userBio') || "No bio set yet."; // Default bio message

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
        updatesDiv.innerHTML = '<p>No events available.</p>';
    }
}

// Update user bio
function updateBio() {
    const newBio = document.getElementById('bioInput').value;
    localStorage.setItem('userBio', newBio);
    showProfilePage(); // Refresh profile page with updated bio
}

// Open the profile modal
function openProfileModal() {
    document.getElementById('profileModal').style.display = 'flex';
    const userEmail = localStorage.getItem('userEmail');
    const userUniversity = localStorage.getItem('selectedUniversity');
    const userBio = localStorage.getItem('userBio') || "No bio set yet."; // Default bio message

    document.getElementById('profileEmail').innerText = userEmail;
    document.getElementById('profileUniversity').innerText = userUniversity;
    document.getElementById('profileBio').innerText = userBio;
}

// Close the profile modal
function closeProfileModal() {
    document.getElementById('profileModal').style.display = 'none';
}

// Logout function
function logout() {
    loggedIn = false;
    document.getElementById('communityPage').style.display = 'none';
    document.getElementById('auth').style.display = 'block';
}
