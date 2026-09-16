document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("isLoggedIn") === "true") {
        window.location.href = "dashboard.html";
        return;
    }

    document.getElementById("loginForm").addEventListener("submit", function (event) {
        event.preventDefault();

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value;
        const feedback = document.getElementById("loginFeedback");

        if (username === "admin" && password === "password123") {
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("user", username);

            feedback.innerHTML =
                '<div class="alert alert-success">Login successful. Redirecting...</div>';

            setTimeout(function () {
                window.location.href = "dashboard.html";
            }, 500);
        } else {
            feedback.innerHTML =
                '<div class="alert alert-danger">Invalid username or password.</div>';
        }
    });
});