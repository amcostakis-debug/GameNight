// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {

    // Get the login form
    const loginForm = document.getElementById("login-form");

    // If the form exists, attach the event listener
    if (loginForm) {
        loginForm.addEventListener("submit", loginUser);
    }
});

// Login function
function loginUser(event) {
    event.preventDefault(); // Stop page reload

    // Read form values
    const email = document.querySelector("input[name='userEmail']").value;
    const password = document.querySelector("input[name='userPw']").value;

    // Create a simple user login object
    const loginObj = {
        email: email,
        password: password
    };

    // Print to confirm it works
    console.log("LOGIN ATTEMPT:", loginObj);

    // Placeholder for backend later:
    // sendLogin(loginObj);
}
