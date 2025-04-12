document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "index.html";
      return;
    }
  
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const username = payload.username || payload.email || "User";
  
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
  