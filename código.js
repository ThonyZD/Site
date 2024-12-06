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


    document.addEventListener('DOMContentLoaded', () => {
        const contactForm = document.getElementById('contact-form');
    
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
    
            // Coleta dos dados do formulário
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());
    
            try {
                // Simulação de envio de formulário (substituir por chamada real de API)
                const response = await simulateFormSubmission(data);
                
                if (response.success) {
                    mostrarMensagem('Mensagem enviada com sucesso!', 'success');
                    contactForm.reset();
                } else {
                    mostrarMensagem('Erro ao enviar mensagem. Tente novamente.', 'error');
                }
            } catch (error) {
                console.error('Erro:', error);
                mostrarMensagem('Erro de conexão. Tente novamente mais tarde.', 'error');
            }
        });
    
        // Função simulada de envio de formulário
        async function simulateFormSubmission(formData) {
            // Simula um atraso de envio
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Lógica de validação (pode ser expandida)
            if (!formData.nome || !formData.email || !formData.mensagem) {
                return { success: false };
            }
    
            // Simulação de envio bem-sucedido
            return { success: true };
        }
    
        // Função para exibir mensagens de feedback
        function mostrarMensagem(texto, tipo) {
            // Cria elemento de mensagem
            const mensagemElement = document.createElement('div');
            mensagemElement.textContent = texto;
            mensagemElement.classList.add('mensagem', `mensagem-${tipo}`);
    
            // Adiciona ao corpo do documento
            document.body.appendChild(mensagemElement);
    
            // Remove a mensagem após alguns segundos
            setTimeout(() => {
                document.body.removeChild(mensagemElement);
            }, 3000);
        }
    
        // Estilos adicionais para mensagens (podem ser movidos para o CSS)
        const estiloMensagem = document.createElement('style');
        estiloMensagem.textContent = `
            .mensagem {
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                padding: 15px;
                border-radius: 5px;
                z-index: 1000;
                font-weight: bold;
            }
            .mensagem-success {
                background-color: #4CAF50;
                color: white;
            }
            .mensagem-error {
                background-color: #f44336;
                color: white;
            }
        `;
        document.head.appendChild(estiloMensagem);
    });