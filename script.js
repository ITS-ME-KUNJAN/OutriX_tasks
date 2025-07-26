document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const togglePasswordBtn = document.getElementById('togglePassword');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const formError = document.getElementById('formError');

    // Create password strength indicator
    let strengthIndicator = document.createElement('div');
    strengthIndicator.id = 'passwordStrength';
    strengthIndicator.style.marginTop = '0.3rem';
    strengthIndicator.style.fontSize = '0.92rem';
    passwordInput.parentNode.appendChild(strengthIndicator);

    // Show/hide password
    togglePasswordBtn.addEventListener('click', function () {
        const type = passwordInput.type === 'password' ? 'text' : 'password';
        passwordInput.type = type;
        togglePasswordBtn.textContent = type === 'password' ? 'Show' : 'Hide';
    });

    // Email validation regex
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Password strength check
    function getPasswordStrength(password) {
        let score = 0;
        if (password.length >= 8) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[a-z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;
        return score;
    }

    function getStrengthMessage(score) {
        switch (score) {
            case 5: return {text: 'Strong password', color: '#27ae60'};
            case 4: return {text: 'Good password', color: '#f1c40f'};
            case 3: return {text: 'Medium password', color: '#e67e22'};
            default: return {text: 'Weak password', color: '#e74c3c'};
        }
    }

    passwordInput.addEventListener('input', function () {
        const password = passwordInput.value;
        const score = getPasswordStrength(password);
        const {text, color} = getStrengthMessage(score);
        strengthIndicator.textContent = password ? text : '';
        strengthIndicator.style.color = color;
    });

    // Form validation
    function validateForm() {
        let valid = true;
        emailError.textContent = '';
        passwordError.textContent = '';
        formError.textContent = '';

        if (!emailInput.value.trim()) {
            emailError.textContent = 'Email is required.';
            valid = false;
        } else if (!isValidEmail(emailInput.value.trim())) {
            emailError.textContent = 'Please enter a valid email address.';
            valid = false;
        }

        const password = passwordInput.value;
        const score = getPasswordStrength(password);
        if (!password) {
            passwordError.textContent = 'Password is required.';
            valid = false;
        } else if (score < 5) {
            passwordError.textContent = 'Password must be at least 8 characters, include uppercase, lowercase, number, and special character.';
            valid = false;
        }

        return valid;
    }

    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        if (validateForm()) {
            // Simulate login (replace with real authentication logic)
            formError.style.color = '#27ae60';
            formError.textContent = 'Login successful!';
            setTimeout(() => {
                formError.textContent = '';
                loginForm.reset();
                togglePasswordBtn.textContent = 'Show';
                passwordInput.type = 'password';
                strengthIndicator.textContent = '';
            }, 1500);
        } else {
            formError.style.color = '#e74c3c';
            formError.textContent = 'Please fix the errors above.';
        }
    });
}); 