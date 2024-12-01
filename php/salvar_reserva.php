<?php
include 'database.php';

// Receber os dados do AJAX
$nome_professor = $_POST['nomeProfessor'];
$equipamento = $_POST['equipamento'];
$data_reserva = $_POST['data'];
$aula = $_POST['aula'];

// Inserir no banco de dados
$sql = "INSERT INTO reservas (nome_professor, equipamento, data_reserva, aula) 
        VALUES ('$nome_professor', '$equipamento', '$data_reserva', $aula)";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => true, "message" => "Reserva criada com sucesso!"]);
} else {
    echo json_encode(["success" => false, "message" => "Erro ao criar reserva: " . $conn->error]);
}
$conn->close();
?>
