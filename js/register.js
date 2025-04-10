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

// Password visibility toggle
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');

togglePassword.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    togglePassword.innerHTML = type === 'password' ? 
        '<i class="far fa-eye"></i>' : 
        '<i class="far fa-eye-slash"></i>';
});

// Form validation
const registerForm = document.getElementById('registerForm');
const emailInput = document.getElementById('email');
const fullNameInput = document.getElementById('fullName');
const confirmPasswordInput = document.getElementById('confirmPassword');

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Reset previous error states
    removeErrorStates();
    
    let isValid = true;
    
    // Full name validation
    if (!fullNameInput.value.trim()) {
        showError(fullNameInput, 'Please enter your full name');
        isValid = false;
    }

    // Email validation
    if (!emailInput.value || !isValidEmail(emailInput.value)) {
        showError(emailInput, 'Please enter a valid email address');
        isValid = false;
    }
    
    // Password validation
    if (!passwordInput.value || passwordInput.value.length < 6) {
        showError(passwordInput, 'Password must be at least 6 characters');
        isValid = false;
    }

    // Confirm password validation
    if (passwordInput.value !== confirmPasswordInput.value) {
        showError(confirmPasswordInput, 'Passwords do not match');
        isValid = false;
    }
    
    if (isValid) {
        // Here you would typically send the form data to your server
        console.log('Form submitted:', {
            fullName: fullNameInput.value,
            email: emailInput.value,
            password: passwordInput.value
        });
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
    
    const inputs = registerForm.querySelectorAll('input');
    inputs.forEach(input => {
        input.classList.remove('border-red-500');
    });
}
