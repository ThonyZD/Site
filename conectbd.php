<?php

$hostname = "localhost";
$bancodeados = "projust_bd";
$usuario = "root";
$senha = "";

$mysqli = new mysqli($hostname, $bancodeados, $usuario, $senha);
if ($mysqli->connect_errno) {
    echo "Erro ao conectar ao banco de dados MySQL: " . $mysqli->connect_error;
}

?>