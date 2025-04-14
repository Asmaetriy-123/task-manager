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
  
  // Logout
  document.getElementById("logout").addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "index.html";
  });
  
  // Delete account
  document.getElementById("delete-account").addEventListener("click", async () => {
    const confirmDelete = confirm("Are you sure you want to delete your account?");
    if (!confirmDelete) return;
  
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("https://task-manager-34x7.onrender.com/api/delete-account", {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
  
      if (res.ok) {
        alert("Account deleted.");
        localStorage.removeItem("token");
        window.location.href = "index.html";
      } else {
        alert("Failed to delete account.");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting account.");
    }
  });
  