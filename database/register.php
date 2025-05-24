<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

require_once 'db.php';

$data = json_decode(file_get_contents("php://input"));

$full_name = $data->full_name;
$age = $data->age;
$username = $data->username;
$email = $data->email;
$password = password_hash($data->password, PASSWORD_DEFAULT);
$gender = $data->gender;

// Cek apakah username sudah digunakan
$checkUsername = $conn->prepare("SELECT id FROM users WHERE username = ?");
$checkUsername->bind_param("s", $username);
$checkUsername->execute();
$checkUsername->store_result();

if ($checkUsername->num_rows > 0) {
    echo json_encode([
        "success" => false,
        "error" => "Username sudah digunakan. Silakan pilih username lain."
    ]);
    $checkUsername->close();
    $conn->close();
    exit;
}
$checkUsername->close();

// Cek apakah email sudah digunakan
$checkEmail = $conn->prepare("SELECT id FROM users WHERE email = ?");
$checkEmail->bind_param("s", $email);
$checkEmail->execute();
$checkEmail->store_result();

if ($checkEmail->num_rows > 0) {
    echo json_encode([
        "success" => false,
        "error" => "Email sudah terdaftar. Gunakan email lain."
    ]);
    $checkEmail->close();
    $conn->close();
    exit;
}
$checkEmail->close();

// Lanjut simpan data
$stmt = $conn->prepare("INSERT INTO users (full_name, age, username, email, password, gender) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param("sissss", $full_name, $age, $username, $email, $password, $gender);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "error" => $stmt->error]);
}

$stmt->close();
$conn->close();
?>
