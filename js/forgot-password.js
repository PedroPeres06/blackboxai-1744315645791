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

// Form validation
const forgotPasswordForm = document.getElementById('forgotPasswordForm');
const emailInput = document.getElementById('email');
const successMessage = document.getElementById('successMessage');

forgotPasswordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Reset previous error states
    removeErrorStates();
    
    let isValid = true;
    
    // Email validation
    if (!emailInput.value || !isValidEmail(emailInput.value)) {
        showError(emailInput, 'Please enter a valid email address');
        isValid = false;
    }
    
    if (isValid) {
        // Here you would typically send the form data to your server
        console.log('Form submitted:', {
            email: emailInput.value
        });

        // Show success message
        successMessage.classList.remove('hidden');
        
        // Clear the form
        emailInput.value = '';
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            successMessage.classList.add('hidden');
        }, 5000);
    }
});

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showError(input, message) {
    const parentDiv = input.parentElement;
    const errorDiv = document.createElement('div');
    errorDiv.className = 'text-red-500 text-sm mt-1';
    errorDiv.textContent = message;
    parentDiv.appendChild(errorDiv);
    input.classList.add('border-red-500');
}

function removeErrorStates() {
    const errorMessages = document.querySelectorAll('.text-red-500');
    errorMessages.forEach(error => error.remove());
    
    const inputs = forgotPasswordForm.querySelectorAll('input');
    inputs.forEach(input => {
        input.classList.remove('border-red-500');
    });
    
    // Hide success message if it's visible
    successMessage.classList.add('hidden');
}
