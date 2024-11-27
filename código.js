// Formulário de Contato
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const formValues = Object.fromEntries(formData.entries());
    
    // Aqui você pode adicionar a lógica para enviar os dados do formulário
    console.log('Dados do formulário:', formValues);
    alert('Mensagem enviada com sucesso!');
    this.reset();
});

const searchInput = document.querySelector('.search-input');
const searchButton = document.querySelector('.search-button');

searchButton.addEventListener('click', () => {
    searchInput.focus();
});

searchInput.addEventListener('input', (e) => {
    // Aqui você pode adicionar a lógica de pesquisa
    console.log('Pesquisando:', e.target.value);
});

// js/main.js
document.addEventListener('DOMContentLoaded', () => {
    // Verifica se o usuário está logado ao carregar a página
    checkAuthStatus();

    // Setup dos formulários
    setupForms();

    // Setup da busca
    setupSearch();
});

// Funções de autenticação
function checkAuthStatus() {
    const token = localStorage.getItem('userToken');
    if (token) {
        // Atualiza a UI para usuário logado
        updateUIForLoggedUser();
        // Verifica a validade do token no servidor
        validateToken(token);
    }
}

function updateUIForLoggedUser() {
    const authButtons = document.getElementById('authButtons');
    const userData = JSON.parse(localStorage.getItem('userData'));
    
    authButtons.innerHTML = `
        <span>Olá, ${userData.nome}</span>
        <button onclick="logout()">Sair</button>
    `;
}

async function validateToken(token) {
    try {
        const response = await fetch('/api/validate-token.php', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (!response.ok) {
            throw new Error('Token inválido');
        }
    } catch (error) {
        console.error('Erro na validação do token:', error);
        logout();
    }
}

function logout() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    location.reload();
}

// Setup dos formulários
function setupForms() {
    // Login Form
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            email: loginForm.querySelector('input[type="email"]').value,
            senha: loginForm.querySelector('input[type="password"]').value
        };

        try {
            const response = await fetch('/api/login.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('userToken', data.token);
                localStorage.setItem('userData', JSON.stringify(data.usuario));
                closeModal('loginModal');
                updateUIForLoggedUser();
                showNotification('Login realizado com sucesso!', 'success');
            } else {
                throw new Error(data.mensagem || 'Erro no login');
            }
        } catch (error) {
            showNotification(error.message, 'error');
        }
    });

    // Register Form
    const registerForm = document.getElementById('registerForm');
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            nome: registerForm.querySelector('input[placeholder="Nome completo"]').value,
            email: registerForm.querySelector('input[type="email"]').value,
            cpf_cnpj: registerForm.querySelector('input[placeholder="CPF/CNPJ"]').value,
            senha: registerForm.querySelector('input[type="password"]').value,
            telefone: registerForm.querySelector('input[type="tel"]').value,
            tipo_usuario: registerForm.querySelector('select').value
        };

        try {
            const response = await fetch('/api/cadastrar.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                closeModal('registerModal');
                showNotification('Cadastro realizado com sucesso!', 'success');
                openModal('loginModal');
            } else {
                throw new Error(data.mensagem || 'Erro no cadastro');
            }
        } catch (error) {
            showNotification(error.message, 'error');
        }
    });
}

// Setup da busca
function setupSearch() {
    const searchForm = document.querySelector('.search') }