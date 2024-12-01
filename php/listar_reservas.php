<?php
include 'database.php';

$sql = "SELECT * FROM reservas ORDER BY data_reserva ASC, aula ASC";
$result = $conn->query($sql);

$reservas = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $reservas[] = $row;
    }
}
echo json_encode($reservas);
$conn->close();
?>
