document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('#login-form form');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = loginForm.querySelector('input[type="email"]').value;
        const password = loginForm.querySelector('input[type="password"]').value;

        // Basic validation
        if (email.trim() === '' || password.trim() === '') {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        console.log('Login attempt:', { email, password });
        alert('Login enviado com sucesso!');
    });
});