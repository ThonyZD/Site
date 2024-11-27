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