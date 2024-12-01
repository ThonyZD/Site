-- Criar o banco de dados
CREATE DATABASE projust_usuarios;

-- Usar o banco de dados
USE projust_usuarios;

-- Tabela de usuários
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    nome VARCHAR(100),
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ultimo_login TIMESTAMP NULL
);

select * from 

-- Tabela de recuperação de senha
CREATE TABLE recuperacao_senha (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    token VARCHAR(255) NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_expiracao TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Índices para melhorar performance
CREATE INDEX idx_email ON usuarios(email);
CREATE INDEX idx_token ON recuperacao_senha(token);

-- Procedure para registro de usuário
DELIMITER //
CREATE PROCEDURE registrar_usuario(
    IN p_email VARCHAR(255),
    IN p_senha VARCHAR(255),
    IN p_nome VARCHAR(100)
)
BEGIN
    INSERT INTO usuarios (email, senha, nome) 
    VALUES (p_email, p_senha, p_nome);
END //
DELIMITER ;

-- Procedure para login
DELIMITER //
CREATE PROCEDURE fazer_login(
    IN p_email VARCHAR(255),
    IN p_senha VARCHAR(255)
)
BEGIN
    DECLARE usuario_id INT;
    
    -- Verificar credenciais
    SELECT id INTO usuario_id 
    FROM usuarios 
    WHERE email = p_email AND senha = p_senha;
    
    -- Atualizar último login se credenciais válidas
    IF usuario_id IS NOT NULL THEN
        UPDATE usuarios 
        SET ultimo_login = CURRENT_TIMESTAMP 
        WHERE id = usuario_id;
        
        SELECT usuario_id AS login_status;
    ELSE
        SELECT 0 AS login_status;
    END IF;
END //
DELIMITER ;

-- Procedure para recuperação de senha
DELIMITER //
CREATE PROCEDURE solicitar_recuperacao_senha(
    IN p_email VARCHAR(255),
    IN p_token VARCHAR(255)
)
BEGIN
    DECLARE usuario_id INT;
    
    -- Encontrar usuário pelo email
    SELECT id INTO usuario_id 
    FROM usuarios 
    WHERE email = p_email;
    
    -- Inserir token de recuperação se usuário existir
    IF usuario_id IS NOT NULL THEN
        INSERT INTO recuperacao_senha (usuario_id, token, data_expiracao)
        VALUES (
            usuario_id, 
            p_token, 
            DATE_ADD(CURRENT_TIMESTAMP, INTERVAL 1 HOUR)
        );
        
        SELECT 1 AS resultado;
    ELSE
        SELECT 0 AS resultado;
    END IF;
END //
DELIMITER ;