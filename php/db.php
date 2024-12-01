<?php
$host = 'localhost'; // Servidor
$user = 'root';      // Usuário padrão do MySQL
$password = '';      // Senha padrão do XAMPP
$dbname = 'reserva_equipamentos'; // Nome do banco de dados

// Criar a conexão
$conn = new mysqli($host, $user, $password, $dbname);

// Verificar a conexão
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}
?>
