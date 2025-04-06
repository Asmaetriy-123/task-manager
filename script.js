document.querySelectorAll(".toggle-password").forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const input = toggle.previousElementSibling;
    const icon = toggle.querySelector(".material-icons");

    if (input.type === "password") {
      input.type = "text";
      icon.textContent = "visibility";
    } else {
      input.type = "password";
      icon.textContent = "visibility_off";
    }
  });
});
