<?php
header("Content-Type: application/json");
require_once "db.php"; // Gunakan koneksi dari db.php
date_default_timezone_set('Asia/Jakarta');

$data = json_decode(file_get_contents('php://input'), true);

$date = date("Y-m-d H:i:s");
$image = $data['image'];
$result = $data['result'];
$confidence = $data['confidence'];
$user_id = $data['user_id']; // Ambil user_id dari input

$stmt = $conn->prepare("INSERT INTO detection_history (date, image, result, confidence, user_id) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("sssdi", $date, $image, $result, $confidence, $user_id);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "error" => $stmt->error]);
}
?>
