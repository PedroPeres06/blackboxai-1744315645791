// Dark mode functionality
const darkModeToggle = document.getElementById('darkModeToggle');
const html = document.documentElement;

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'enabled' || 
    (localStorage.getItem('darkMode') !== 'disabled' && 
     window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    html.classList.add('dark');
}

// Toggle dark mode
darkModeToggle.addEventListener('click', () => {
    html.classList.toggle('dark');
    localStorage.setItem('darkMode', html.classList.contains('dark') ? 'enabled' : 'disabled');
});

// Update login form to redirect to dashboard on success
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // In a real application, you would validate credentials with the server
            window.location.href = 'dashboard.html';
        });
    }
});

// User dropdown menu functionality
const userMenuButton = document.querySelector('.user-menu-button');
const userMenu = document.querySelector('.user-menu');

if (userMenuButton && userMenu) {
    userMenuButton.addEventListener('click', () => {
        userMenu.classList.toggle('hidden');
    });

    // Close the menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!userMenuButton.contains(e.target) && !userMenu.contains(e.target)) {
            userMenu.classList.add('hidden');
        }
    });
}

// Sample data for demonstration
const sampleData = {
    totalLogs: 12345,
    errorRate: 2.4,
    responseTime: 245,
    activeUsers: 1234,
    // Add more sample data as needed
};

// Function to update stats
function updateStats() {
    // In a real application, this would fetch data from the server
    // For now, we'll just use the sample data
    document.getElementById('totalLogs').textContent = sampleData.totalLogs.toLocaleString();
    document.getElementById('errorRate').textContent = sampleData.errorRate + '%';
    document.getElementById('responseTime').textContent = sampleData.responseTime + 'ms';
    document.getElementById('activeUsers').textContent = sampleData.activeUsers.toLocaleString();
}

// Update stats periodically (every 30 seconds)
setInterval(updateStats, 30000);
