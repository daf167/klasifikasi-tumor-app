<?php
$host = "localhost";
$user = "root";
$pass = "";
$dbname = "db_tumor";

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    header("Content-Type: application/json");
    die(json_encode([
        "success" => false,
        "message" => "Koneksi database gagal: " . $conn->connect_error
    ]));
}
?>
