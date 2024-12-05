firebase.auth().onAuthStateChanged(user => {
    if (user) {
        window.location.href = 'index.html';
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const cadastroForm = document.querySelector('#cadastro-form form');

    cadastroForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const fullName = cadastroForm.querySelector('input[placeholder="Nome Completo"]').value;
        const email = cadastroForm.querySelector('input[type="email"]').value;
        const password = cadastroForm.querySelectorAll('input[type="password"]')[0].value;
        const confirmPassword = cadastroForm.querySelectorAll('input[type="password"]')[1].value;

        // Basic validation
        const inputs = cadastroForm.querySelectorAll('input');
        const allFilled = Array.from(inputs).every(input => input.value.trim() !== '');

        if (!allFilled) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        if (password !== confirmPassword) {
            alert('As senhas não coincidem.');
            return;
        }

        console.log('Cadastro attempt:', { fullName, email, password });
        alert('Cadastro enviado com sucesso!');
    });
});