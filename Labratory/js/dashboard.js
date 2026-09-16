document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("isLoggedIn") !== "true") {
        window.location.href = "index.html";
        return;
    }

    const username = localStorage.getItem("user") || "User";
    document.getElementById("userName").textContent = username;

    const hour = new Date().getHours();
    let greeting = "Good Night";

    if (hour >= 5 && hour < 12) greeting = "Good Morning";
    else if (hour >= 12 && hour < 17) greeting = "Good Afternoon";
    else if (hour >= 17 && hour < 21) greeting = "Good Evening";

    document.getElementById("greeting").textContent =
        `${greeting}, ${username}!`;

    const activities = [
        ["2026-09-15", "Practiced guitar scales", "Completed"],
        ["2026-09-14", "Finished piano chord lesson", "Completed"],
        ["2026-09-13", "Started bass exercise", "In Progress"],
        ["2026-09-12", "Recorded a music project", "Completed"]
    ];

    const tableBody = document.getElementById("activityTableBody");

    activities.forEach(function (activity) {
        const row = document.createElement("tr");
        const badge = activity[2] === "Completed"
            ? "bg-success"
            : "bg-warning text-dark";

        row.innerHTML = `
            <td>${activity[0]}</td>
            <td>${activity[1]}</td>
            <td><span class="badge ${badge}">${activity[2]}</span></td>
        `;

        tableBody.appendChild(row);
    });

    function logout(event) {
        event.preventDefault();
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("user");
        window.location.href = "index.html";
    }

    document.getElementById("logoutBtn").addEventListener("click", logout);
    document.getElementById("logoutLink").addEventListener("click", logout);
});