 -- Criação do banco de dados
CREATE DATABASE IF NOT EXISTS projust;
USE projust;

-- Tabela de usuários
CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    cpf_cnpj VARCHAR(20) UNIQUE NOT NULL,
    tipo_usuario ENUM('cliente', 'advogado', 'admin') NOT NULL,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    telefone VARCHAR(20),
    status BOOLEAN DEFAULT TRUE
);

-- Tabela de advogados (informações específicas para advogados)
CREATE TABLE advogados (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT NOT NULL,
    numero_oab VARCHAR(20) UNIQUE NOT NULL,
    area_atuacao VARCHAR(100),
    descricao TEXT,
    estado_oab VARCHAR(2),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Tabela de processos
CREATE TABLE processos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    numero_processo VARCHAR(25) UNIQUE NOT NULL,
    cliente_id INT NOT NULL,
    advogado_id INT,
    titulo VARCHAR(200) NOT NULL,
    descricao TEXT,
    status ENUM('em_andamento', 'concluido', 'arquivado', 'cancelado') NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (cliente_id) REFERENCES usuarios(id),
    FOREIGN KEY (advogado_id) REFERENCES advogados(id)
);

-- Tabela de documentos dos processos
CREATE TABLE documentos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    processo_id INT NOT NULL,
    nome VARCHAR(100) NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    caminho VARCHAR(255) NOT NULL,
    data_upload TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (processo_id) REFERENCES processos(id)
);

-- Tabela de atualizações dos processos
CREATE TABLE atualizacoes_processo (
    id INT PRIMARY KEY AUTO_INCREMENT,
    processo_id INT NOT NULL,
    usuario_id INT NOT NULL,
    descricao TEXT NOT NULL,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (processo_id) REFERENCES processos(id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Tabela de legislação
CREATE TABLE legislacao (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(200) NOT NULL,
    descricao TEXT,
    tipo VARCHAR(50) NOT NULL,
    numero VARCHAR(50) NOT NULL,
    data_publicacao DATE,
    link_oficial VARCHAR(255),
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela para armazenar as pesquisas realizadas
CREATE TABLE historico_pesquisas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT,
    termo_pesquisa VARCHAR(100) NOT NULL,
    tipo_pesquisa ENUM('cpf', 'cnpj', 'processo', 'legislacao') NOT NULL,
    data_pesquisa TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Índices para otimização de pesquisas
CREATE INDEX idx_cpf_cnpj ON usuarios(cpf_cnpj);
CREATE INDEX idx_numero_processo ON processos(numero_processo);
CREATE INDEX idx_cliente_processo ON processos(cliente_id);
CREATE INDEX idx_advogado_processo ON processos(advogado_id);