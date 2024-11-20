const loginToggle = document.querySelector('.login-toggle');
        const registerToggle = document.querySelector('.register-toggle');
        const loginForm = document.querySelector('.login-form');
        const registerForm = document.querySelector('.register-form');

        loginToggle.addEventListener('click', () => {
            loginToggle.classList.add('active');
            registerToggle.classList.remove('active');
            loginForm.classList.add('active');
            registerForm.classList.remove('active');
        });

        registerToggle.addEventListener('click', () => {
            registerToggle.classList.add('active');
            loginToggle.classList.remove('active');
            registerForm.classList.add('active');
            loginForm.classList.remove('active');
        });