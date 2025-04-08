document.addEventListener("DOMContentLoaded", function () {
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("pwd");
    const loginBtn = document.getElementById("loginBtn");
  
    // Enable login button only when both fields are filled
    function checkInputs() {
      loginBtn.disabled =
        usernameInput.value.trim() === "" || passwordInput.value.trim() === "";
    }
  
    usernameInput.addEventListener("input", checkInputs);
    passwordInput.addEventListener("input", checkInputs);
  
    // Add login logic
    loginBtn.addEventListener("click", function () {
      const btn = this;
      btn.classList.add("loading");
      btn.disabled = true;
  
      const data = {
        username: usernameInput.value.trim(),
        password: passwordInput.value.trim()
      };
  
      // Send data to backend
      fetch("http://localhost:5000/api/credentials", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(res => {
          if (!res.ok) throw new Error("Failed to save");
          return res.json();
        })
        .then(() => {
          // Simulate login redirect
          setTimeout(() => {
            window.location.href = "askaway.html"; // your redirect page
          }, 1000);
        })
        .catch(err => {
          console.error("Error:", err);
          btn.classList.remove("loading");
          btn.disabled = false;
        });
    });
  
    checkInputs(); // Run on load to ensure button is disabled by default
  });
  