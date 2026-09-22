document.addEventListener('DOMContentLoaded', function () {
  const isLoggedIn = localStorage.getItem('isLoggedIn');

  if (isLoggedIn !== 'true') {
    window.location.href = 'index.html';
    return;
  }

  const username = localStorage.getItem('user') || 'Student';

  const userNameSpan = document.getElementById('userName');
  if (userNameSpan) {
    userNameSpan.textContent = username;
  }

  updateGreeting(username);
  updateStatistics();
  populateActivityTable();
  setupLogout();
});

function updateGreeting(username) {
  const greetingElement = document.getElementById('greeting');
  if (!greetingElement) return;

  const hour = new Date().getHours();
  let timeOfDay = 'Good Evening';

  if (hour >= 5 && hour < 12) {
    timeOfDay = 'Good Morning';
  } else if (hour >= 12 && hour < 17) {
    timeOfDay = 'Good Afternoon';
  } else if (hour >= 17 && hour < 21) {
    timeOfDay = 'Good Evening';
  } else {
    timeOfDay = 'Good Night';
  }

  greetingElement.textContent = `${timeOfDay}, ${username}!`;
}

function updateStatistics() {
  const stats = [
    { title: 'Current GPA', value: '3.82', color: 'text-primary' },
    { title: 'Courses', value: '6', color: 'text-success' },
    { title: 'Assignments', value: '4', color: 'text-info' },
    { title: 'Attendance', value: '94%', color: 'text-warning' }
  ];

  stats.forEach((stat, index) => {
    const titleElement = document.getElementById(`stat${index + 1}-title`);
    const valueElement = document.getElementById(`stat${index + 1}-value`);

    if (titleElement) {
      titleElement.textContent = stat.title;
    }

    if (valueElement) {
      valueElement.textContent = stat.value;
      valueElement.className = `card-text fw-bold ${stat.color}`;
    }
  });
}

function populateActivityTable() {
  const tableBody = document.getElementById('activityTableBody');
  if (!tableBody) return;

  const activities = [
    { date: '2026-09-20', activity: 'Submitted research paper for IT 101', status: 'success' },
    { date: '2026-09-18', activity: 'Attendance marked for Computer Science lecture', status: 'info' },
    { date: '2026-09-17', activity: 'Math quiz scheduled for Friday', status: 'warning' },
    { date: '2026-09-15', activity: 'Professor posted final project brief', status: 'success' },
    { date: '2026-09-13', activity: 'Library book renewal completed', status: 'danger' }
  ];

  tableBody.innerHTML = activities
    .map((item) => {
      let badgeClass = 'bg-secondary';

      if (item.status === 'success') {
        badgeClass = 'bg-success';
      } else if (item.status === 'warning') {
        badgeClass = 'bg-warning text-dark';
      } else if (item.status === 'danger') {
        badgeClass = 'bg-danger';
      } else if (item.status === 'info') {
        badgeClass = 'bg-info text-dark';
      }

      return `
        <tr>
          <td>${item.date}</td>
          <td>${item.activity}</td>
          <td><span class="badge ${badgeClass}">${item.status}</span></td>
        </tr>
      `;
    })
    .join('');
}

function setupLogout() {
  const logoutButtons = document.querySelectorAll('#logoutBtn, #logoutLink');

  logoutButtons.forEach((button) => {
    button.addEventListener('click', function (event) {
      event.preventDefault();
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('user');
      window.location.href = 'index.html';
    });
  });
}
