// Wait for the page to load
document.addEventListener("DOMContentLoaded", () => {
  
  // Get the form and character images
  const characterForm = document.getElementById("character-form");
  const characterImages = document.querySelectorAll("img[data-character]");

  let selectedCharacter = null;

  // Add click event to each character image
  characterImages.forEach(img => {
    img.addEventListener("click", (event) => {
      event.preventDefault(); // Stop default <a> behavior for now
      
      selectedCharacter = img.dataset.character; // Read character type

      console.log("Character selected:", selectedCharacter);

      saveCharacter();  // Save selection
      window.location.href = "method.html"; // Redirect
    });
  });

  // Save user character to localStorage
  function saveCharacter() {
    const customValue = document.querySelector('input[name="customCharacter"]').value;

    const characterObj = {
      selected: selectedCharacter,
      customInput: customValue || null
    };

    console.log("Final Character Object:", characterObj);

    // Save to localStorage
    localStorage.setItem("characterData", JSON.stringify(characterObj));
  }

});
