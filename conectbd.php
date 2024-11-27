<?php
// config/database.php - Configuração da conexão
class Database {
    private $host = "localhost";
    private $db_name = "projust";
    private $username = "root";
    private $password = "";
    public $conn;

    public function getConnection() {
        $this->conn = null;
        try {
            $this->conn = new PDO(
                "mysql:host=" . $this->host . ";dbname=" . $this->db_name,
                $this->username,
                $this->password
            );
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->conn->exec("set names utf8");
        } catch(PDOException $e) {
            echo "Erro na conexão: " . $e->getMessage();
        }
        return $this->conn;
    }
}

// models/Usuario.php - Classe para gerenciar usuários
class Usuario {
    private $conn;
    private $table_name = "usuarios";

    public function __construct($db) {
        $this->conn = $db;
    }

    // Criar novo usuário
    public function criar($nome, $email, $senha, $cpf_cnpj, $tipo_usuario, $telefone) {
        $query = "INSERT INTO " . $this->table_name . " 
                 (nome, email, senha, cpf_cnpj, tipo_usuario, telefone) 
                 VALUES (:nome, :email, :senha, :cpf_cnpj, :tipo_usuario, :telefone)";
        
        try {
            $stmt = $this->conn->prepare($query);
            
            $senha_hash = password_hash($senha, PASSWORD_DEFAULT);
            
            $stmt->bindParam(":nome", $nome);
            $stmt->bindParam(":email", $email);
            $stmt->bindParam(":senha", $senha_hash);
            $stmt->bindParam(":cpf_cnpj", $cpf_cnpj);
            $stmt->bindParam(":tipo_usuario", $tipo_usuario);
            $stmt->bindParam(":telefone", $telefone);
            
            return $stmt->execute();
        } catch(PDOException $e) {
            echo "Erro ao criar usuário: " . $e->getMessage();
            return false;
        }
    }

    // Login de usuário
    public function login($email, $senha) {
        $query = "SELECT id, nome, senha, tipo_usuario FROM " . $this->table_name . " 
                 WHERE email = :email AND status = TRUE";
        
        try {
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(":email", $email);
            $stmt->execute();
            
            if($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                if(password_verify($senha, $row['senha'])) {
                    return $row;
                }
            }
            return false;
        } catch(PDOException $e) {
            echo "Erro no login: " . $e->getMessage();
            return false;
        }
    }
}

// models/Processo.php - Classe para gerenciar processos
class Processo {
    private $conn;
    private $table_name = "processos";

    public function __construct($db) {
        $this->conn = $db;
    }

    // Criar novo processo
    public function criar($numero_processo, $cliente_id, $titulo, $descricao) {
        $query = "INSERT INTO " . $this->table_name . " 
                 (numero_processo, cliente_id, titulo, descricao, status) 
                 VALUES (:numero_processo, :cliente_id, :titulo, :descricao, 'em_andamento')";
        
        try {
            $stmt = $this->conn->prepare($query);
            
            $stmt->bindParam(":numero_processo", $numero_processo);
            $stmt->bindParam(":cliente_id", $cliente_id);
            $stmt->bindParam(":titulo", $titulo);
            $stmt->bindParam(":descricao", $descricao);
            
            return $stmt->execute();
        } catch(PDOException $e) {
            echo "Erro ao criar processo: " . $e->getMessage();
            return false;
        }
    }

    // Buscar processos por CPF/CNPJ
    public function buscarPorCpfCnpj($cpf_cnpj) {
        $query = "SELECT p.*, u.nome as cliente_nome 
                 FROM " . $this->table_name . " p 
                 INNER JOIN usuarios u ON p.cliente_id = u.id 
                 WHERE u.cpf_cnpj = :cpf_cnpj";
        
        try {
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(":cpf_cnpj", $cpf_cnpj);
            $stmt->execute();
            
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch(PDOException $e) {
            echo "Erro na busca: " . $e->getMessage();
            return false;
        }
    }
}

// api/cadastrar.php - Endpoint para cadastro de usuário
<?php
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';
include_once '../models/Usuario.php';

$database = new Database();
$db = $database->getConnection();

$usuario = new Usuario($db);

$data = json_decode(file_get_contents("php://input"));

if(
    !empty($data->nome) &&
    !empty($data->email) &&
    !empty($data->senha) &&
    !empty($data->cpf_cnpj)
) {
    if($usuario->criar(
        $data->nome,
        $data->email,
        $data->senha,
        $data->cpf_cnpj,
        $data->tipo_usuario,
        $data->telefone
    )) {
        http_response_code(201);
        echo json_encode(array("mensagem" => "Usuário criado com sucesso."));
    } else {
        http_response_code(503);
        echo json_encode(array("mensagem" => "Não foi possível criar o usuário."));
    }
} else {
    http_response_code(400);
    echo json_encode(array("mensagem" => "Dados incompletos."));
}

// api/login.php - Endpoint para login
<?php
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';
include_once '../models/Usuario.php';

$database = new Database();
$db = $database->getConnection();

$usuario = new Usuario($db);

$data = json_decode(file_get_contents("php://input"));

if(!empty($data->email) && !empty($data->senha)) {
    $result = $usuario->login($data->email, $data->senha);
    
    if($result) {
        session_start();
        $_SESSION['user_id'] = $result['id'];
        $_SESSION['user_tipo'] = $result['tipo_usuario'];
        
        http_response_code(200);
        echo json_encode(array(
            "mensagem" => "Login realizado com sucesso.",
            "usuario" => array(
                "id" => $result['id'],
                "nome" => $result['nome'],
                "tipo" => $result['tipo_usuario']
            )
        ));
    } else {
        http_response_code(401);
        echo json_encode(array("mensagem" => "Email ou senha incorretos."));
    }
} else {
    http_response_code(400);
    echo json_encode(array("mensagem" => "Dados incompletos."));
}