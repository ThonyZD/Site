document.addEventListener('DOMContentLoaded', () => {
    // Select key elements
    const loginToggle = document.querySelector('[data-form="login"]');
    const cadastroToggle = document.querySelector('[data-form="cadastro"]');
    const loginForm = document.getElementById('login-form');
    const cadastroForm = document.getElementById('cadastro-form');

    // Toggle function to switch between login and cadastro forms
    function toggleForms(targetForm) {
        // Reset all form toggles
        [loginToggle, cadastroToggle].forEach(toggle => {
            toggle.classList.remove('active');
        });

        // Reset all forms
        [loginForm, cadastroForm].forEach(form => {
            form.classList.remove('active');
        });

        // Activate selected form and its toggle
        if (targetForm === 'login') {
            loginToggle.classList.add('active');
            loginForm.classList.add('active');
        } else if (targetForm === 'cadastro') {
            cadastroToggle.classList.add('active');
            cadastroForm.classList.add('active');
        }
    }

    // Add click event to login toggle
    loginToggle.addEventListener('click', () => {
        toggleForms('login');
    });

    // Add click event to cadastro toggle
    cadastroToggle.addEventListener('click', () => {
        toggleForms('cadastro');
    });

    // Enhanced form rendering and interactivity
    function enhanceForm(formElement, formType) {
        // Create form content dynamically
        formElement.innerHTML = `
            <form>
                ${formType === 'login' ? `
                    <input type="email" placeholder="E-mail" required>
                    <input type="password" placeholder="Senha" required>
                    <button type="submit">Entrar</button>
                    <button type="button" class="toggle-cadastro">Não tem conta? Cadastre-se</button>
                ` : `
                    <input type="text" placeholder="Nome Completo" required>
                    <input type="email" placeholder="E-mail" required>
                    <input type="password" placeholder="Senha" required>
                    <input type="password" placeholder="Confirmar Senha" required>
                    <button type="submit">Cadastrar</button>
                `}

                <div class="form-footer">
                    ${formType === 'login' ? 
                        '<a href="#">Esqueceu sua senha?</a>' : 
                        'Ao cadastrar, você concorda com nossos <a href="#">Termos de Uso</a>'
                    }
                </div>
            </form>
        `;

        // Add form submission handler
        const form = formElement.querySelector('form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Basic validation
            const inputs = form.querySelectorAll('input');
            const allFilled = Array.from(inputs).every(input => input.value.trim() !== '');

            if (allFilled) {
                if (formType === 'login') {
                    const email = form.querySelector('input[type="email"]').value;
                    const password = form.querySelector('input[type="password"]').value;
                    console.log('Login attempt:', { email, password });
                    alert('Login enviado com sucesso!');
                } else {
                    const fullName = form.querySelector('input[placeholder="Nome Completo"]').value;
                    const email = form.querySelector('input[type="email"]').value;
                    const password = form.querySelectorAll('input[type="password"]')[0].value;
                    const confirmPassword = form.querySelectorAll('input[type="password"]')[1].value;

                    if (password === confirmPassword) {
                        console.log('Cadastro attempt:', { fullName, email, password });
                        alert('Cadastro enviado com sucesso!');
                    } else {
                        alert('As senhas não coincidem.');
                    }
                }
            } else {
                alert('Por favor, preencha todos os campos.');
            }
        });

        // Add toggle to cadastro button in login form
        if (formType === 'login') {
            const toggleToCadastro = formElement.querySelector('.toggle-cadastro');
            toggleToCadastro.addEventListener('click', () => {
                toggleForms('cadastro');
            });
        }
    }

    // Enhance both forms
    enhanceForm(loginForm, 'login');
    enhanceForm(cadastroForm, 'cadastro');
});