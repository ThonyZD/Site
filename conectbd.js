// Arquivo: database.js
const mysql = require('mysql2');
const bcrypt = require('bcrypt');

// Configuração da conexão com o banco de dados
const connection = mysql.createConnection({
  host: 'localhost:3306',
  user: 'root',
  password: 'Sharin718!1',
  database: 'projust_bd'
});

// Conectar ao banco de dados
connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conexão com o banco de dados realizada com sucesso!');
});

// Função para inserir usuário
async function inserirUsuario(nome_completo, email, senha, confirmar_senha) {
  // Validações básicas
  if (senha !== confirmar_senha) {
    throw new Error('As senhas não coincidem');
  }

  try {
    // Criptografar a senha
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const query = 'INSERT INTO projust_user (nome_completo, email, senha, confirmar_senha) VALUES (?, ?, ?, ?)';
    const valores = [nome_completo, email, senhaCriptografada, senhaCriptografada];

    return new Promise((resolve, reject) => {
      connection.query(query, valores, (err, resultado) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(resultado);
      });
    });
  } catch (erro) {
    throw erro;
  }
}

// Função para buscar usuário por email
function buscarUsuarioPorEmail(email) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM projust_user WHERE email = ?';
    connection.query(query, [email], (err, resultados) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(resultados[0]);
    });
  });
}

// Função para verificar login
async function verificarLogin(email, senha) {
  try {
    const usuario = await buscarUsuarioPorEmail(email);
    
    if (!usuario) {
      return false;
    }

    // Comparar senha fornecida com a senha armazenada
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    return senhaCorreta;
  } catch (erro) {
    console.error('Erro ao verificar login:', erro);
    return false;
  }
}

// Exportar funções
module.exports = {
  connection,
  inserirUsuario,
  buscarUsuarioPorEmail,
  verificarLogin
};