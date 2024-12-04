<?php

$include('conectbd.php');
if (isset($_POST['NomeCompleto']) && isset($_POST['Email']) && isset($_POST['Senha']) && isset($_POST['ConfirmarSenha'])) {
    if (strlen($_POST['NomeCompleto']) > 0 && strlen($_POST['Email']) > 0 && strlen($_POST['Senha']) > 0 && strlen($_POST['ConfirmarSenha']) > 0) }
        echo "Preencha todos os campos.";
         else {
        $NomeCompleto = $mysqli->realescape_string($_POST['NomeCompleto']);
        $email = $mysqli->realescape_string($_POST['Email']);
        $senha = $mysqli->realescape_string($_POST['Senha']);
        $confirmarSenha = $mysqli->realescape_string($_POST['ConfirmarSenha']);

        $sql_code = "SELECT * FROM projust_usuarios WHERE nome_completo = '$NomeCompleto' and email = '$email' and senha = '$senha' and confirmar_senha = '$confirmarSenha'";
        $sql_query = $mysqli->query($sql_code) or die("Falha na execução do SQL:" . $mysqli->error);

        $quantidade = $sql_query->num_rows;

        if ($quantidade == 1) {

            $usuario = $sql_query->fetch_assoc();
            if (!isset($_SESSION)) {
                session_start();
                
            }

            $_SESSION['id'] = $usuario['id'];
            $_SESSION['nome'] = $usuario['nome_completo'];
            header('Location: index.html');
            else {
                echo "Falha ao cadastrar, tente novamente.";
            }
        }
    }

?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Projust - Login</title>
    <link rel="stylesheet" href="stylelogin.css">
    <script src="login.js" defer></script>
</head>
<body>
    <header>
    <div class="container">
        <img src="projust.png" alt="Projust Logo" class="logo" width="215" height="160">
        
        <div class="form-toggle">
            <span onclick="toggleToLogin()" data-form="login">Login</span>
            <span data-form="cadastro">Cadastro</span>
        </div>

        <div id="login-form" class="form active">
            <input type="email" placeholder="E-mail" required>
            <input type="password" placeholder="Senha" required>
            <button>Entrar</button>
            <button onclick="toggleToCadastro()">Não tem conta? Cadastre-se</button>
            <div class="form-footer">
                <a href="#">Esqueceu sua senha?</a>
            </div>
        </div>

        <div id="cadastro-form" class="form">
            <input type="text" placeholder="Nome Completo" required>
            <input type="email" placeholder="E-mail" required>
            <input type="password" placeholder="Senha" required>
            <input type="password" placeholder="Confirmar Senha" required>
            <button>Cadastrar</button>
            <div class="form-footer">
                Ao cadastrar, você concorda com nossos <a href="#">Termos de Uso</a>
            </div>
        </div>
    </div>
    </header>
</body>
</html>