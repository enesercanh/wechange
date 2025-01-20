let loggedIn = false;
let isModerator = false;

function showLogin() {
    document.getElementById('auth').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
}

function showSignup() {
    document.getElementById('auth').style.display = 'none';
    document.getElementById('signupForm').style.display = 'block';
}

function signup() {
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    
    if (email && password) {
        // Save the user data (for simplicity, not using a database)
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userPassword', password);
        alert('Signup successful!');
        showCommunityPage();
    } else {
        alert('Please enter both email and password');
    }
}

function login() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const storedEmail = localStorage.getItem('userEmail');
    const storedPassword = localStorage.getItem('userPassword');

    if (email === storedEmail && password === storedPassword) {
        alert('Login successful!');
        showCommunityPage();
    } else {
        alert('Invalid login details');
    }
}

function showCommunityPage() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('signupForm').style.display = 'none';
    document.getElementById('communityPage').style.display = 'block';

    // Show updates for the community
    const updates = document.getElementById('updates');
    updates.innerHTML = `
        <p>Event 1: Meeting on Saturday at 10 AM</p>
        <p>Event 2: Community cleanup on Sunday</p>
    `;
}

function logout() {
    loggedIn = false;
    document.getElementById('communityPage').style.display = 'none';
    document.getElementById('auth').style.display = 'block';
}
