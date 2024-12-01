<?php
include 'database.php';

$id = $_POST['id'];

$sql = "DELETE FROM reservas WHERE id = $id";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => true, "message" => "Reserva excluída com sucesso!"]);
} else {
    echo json_encode(["success" => false, "message" => "Erro ao excluir reserva: " . $conn->error]);
}
$conn->close();
?>
