document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "index.html";
      return;
    }
  
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const username = payload.username || payload.email?.split('@')[0] || "User";
  
      const usernameSpan = document.getElementById("username");
      if (usernameSpan) {
        usernameSpan.textContent = username;
      }
    } catch (err) {
      console.error("Invalid token", err);
      localStorage.removeItem("token");
      window.location.href = "index.html";
    }
  });
  document.getElementById("profile-toggle").addEventListener("click", () => {
    const dropdown = document.getElementById("dropdown-menu");
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
  });
  /*the logout and delete account code */
  
  document.getElementById("logout-btn").addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "index.html";
  });
  
  document.getElementById("delete-account-btn").addEventListener("click", () => {
    alert("Account deletion requires backend logic.");
  });
  document.addEventListener("DOMContentLoaded", () => {
    const dateSpan = document.getElementById("current-date");
    const today = new Date();
    const options = { weekday: "long", month: "long", day: "numeric" };
    const formattedDate = today.toLocaleDateString("en-US", options);
    dateSpan.textContent = formattedDate;
  });