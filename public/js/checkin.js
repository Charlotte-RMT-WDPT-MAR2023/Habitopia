window.addEventListener("DOMContentLoaded", () => {
  const emojis = document.querySelectorAll(".emojis div");
  const slider = document.getElementById("scale");
  
  emojis.forEach((emoji, index) => {
    emoji.addEventListener("click", () => {
      slider.value = index + 1; // Set the slider value to the index of the clicked emoji plus 1
    });
  });
});