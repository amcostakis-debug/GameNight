// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
    // Get all buttons with data-method
    const methodButtons = document.querySelectorAll("button[data-method]");

    methodButtons.forEach(button => {
        button.addEventListener("click", () => {
            const selectedMethod = button.dataset.method;

            // Create an object to store method choice
            const methodObj = {
                method: selectedMethod
            };

            // Save to localStorage
            localStorage.setItem("methodData", JSON.stringify(methodObj));

            // Log object for verification
            console.log("Method Selected:", methodObj);

            // Redirect to next page (optional)
            // window.location.href = "nextPage.html";
        });
    });
});
