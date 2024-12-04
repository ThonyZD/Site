// login.js (Client-side JavaScript)
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const cadastroForm = document.getElementById('cadastro-form');
    const loginToggle = document.querySelector('[data-form="login"]');
    const cadastroToggle = document.querySelector('[data-form="cadastro"]');

    // Toggle between login and registration forms
    function toggleToLogin() {
        loginForm.classList.add('active');
        cadastroForm.classList.remove('active');
        loginToggle.classList.add('active');
        cadastroToggle.classList.remove('active');
    }

    function toggleToCadastro() {
        cadastroForm.classList.add('active');
        loginForm.classList.remove('active');
        cadastroToggle.classList.add('active');
        loginToggle.classList.remove('active');
    }

    // Form submission handlers
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = loginForm.querySelector('input[type="email"]').value;
        const senha = loginForm.querySelector('input[type="password"]').value;

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ Email: email, Senha: senha })
            });

            if (response.ok) {
                window.location.href = '/index.html';
            } else {
                const errorMessage = await response.text();
                alert(errorMessage);
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao fazer login. Tente novamente.');
        }
    });

    cadastroForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nomeCompleto = cadastroForm.querySelector('input[placeholder="Nome Completo"]').value;
        const email = cadastroForm.querySelector('input[placeholder="E-mail"]').value;
        const senha = cadastroForm.querySelector('input[type="password"]:nth-child(3)').value;
        const confirmarSenha = cadastroForm.querySelector('input[placeholder="Confirmar Senha"]').value;

        // Client-side validation
        if (senha !== confirmarSenha) {
            alert('As senhas não coincidem.');
            return;
        }

        try {
            const response = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    NomeCompleto: nomeCompleto,
                    Email: email,
                    Senha: senha,
                    ConfirmarSenha: confirmarSenha
                })
            });

            if (response.ok) {
                window.location.href = '/index.html';
            } else {
                const errorMessage = await response.text();
                alert(errorMessage);
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao cadastrar. Tente novamente.');
        }
    });

    // Event listeners for form toggle
    document.querySelector('[data-form="login"]').addEventListener('click', toggleToLogin);
    document.querySelector('[data-form="cadastro"]').addEventListener('click', toggleToCadastro);
});