// Toggle password visibility
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

// Register logic
const registerForm = document.querySelector("#register_form");
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = registerForm.querySelector('input[name="username"]').value;
    const email = registerForm.querySelector('input[name="email"]').value;
    const password = registerForm.querySelector('input[name="password"]').value;
    const confirmPassword = registerForm.querySelector('input[name="confirm-password"]').value;

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await fetch('https://task-manager-34x7.onrender.com/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        alert('Registration successful! Please log in.');
        window.location.href = 'index.html';
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (err) {
      alert('Something went wrong.');
      console.error(err);
    }
  });
}

// Login logic
// Login logic
const loginForm = document.querySelector("#login-form");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = loginForm.querySelector('input[name="email"]').value;
    const password = loginForm.querySelector('input[name="password"]').value;

    try {
      const res = await fetch('https://task-manager-34x7.onrender.com/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log("Login response:", data);

      if (res.ok) {
        localStorage.setItem("username", email.split("@")[0]); // ✅ Save username
        alert('Login successful!');
        window.location.href = 'tasks.html'; // ✅ Redirect to tasks page
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (err) {
      alert('Something went wrong.');
      console.error(err);
    }
  });
}



