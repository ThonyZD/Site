function toggleToLogin() {
    const formToggles = document.querySelectorAll('.form-toggle span');
    const forms = document.querySelectorAll('.form');

    formToggles.forEach(t => t.classList.remove('active'));
    forms.forEach(f => f.classList.remove('active'));
    
    document.querySelector('.form-toggle span[data-form="login"]').classList.add('active');
    document.getElementById('login-form').classList.add('active');
}

function toggleToCadastro() {
    const formToggles = document.querySelectorAll('.form-toggle span');
    const forms = document.querySelectorAll('.form');

    formToggles.forEach(t => t.classList.remove('active'));
    forms.forEach(f => f.classList.remove('active'));
    
    document.querySelector('.form-toggle span[data-form="cadastro"]').classList.add('active');
    document.getElementById('cadastro-form').classList.add('active');
}

// Basic form validation (you would replace this with more robust validation)
const loginButton = document.querySelector('#login-form button:first-of-type');
const cadastroButton = document.querySelector('#cadastro-form button');

loginButton.addEventListener('click', (e) => {
    e.preventDefault();
    const email = document.querySelector('#login-form input[type="email"]');
    const password = document.querySelector('#login-form input[type="password"]');

    if (email.value && password.value) {
        alert('Login enviado com sucesso!');
        // Here you would typically send data to a backend
    } else {
        alert('Por favor, preencha todos os campos.');
    }
});

cadastroButton.addEventListener('click', (e) => {
    e.preventDefault();
    const inputs = document.querySelectorAll('#cadastro-form input');
    const password = inputs[2];
    const confirmPassword = inputs[3];

    const allFieldsFilled = Array.from(inputs).every(input => input.value);
    const passwordsMatch = password.value === confirmPassword.value;

    if (allFieldsFilled && passwordsMatch) {
        alert('Cadastro realizado com sucesso!');
        // Here you would typically send data to a backend
    } else if (!allFieldsFilled) {
        alert('Por favor, preencha todos os campos.');
    } else {
        alert('As senhas não coincidem.');
    }
});