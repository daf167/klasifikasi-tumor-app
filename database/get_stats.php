<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
date_default_timezone_set('Asia/Jakarta');

require_once 'db.php';

$user_id = $_GET['user_id'] ?? null;

if (!$user_id) {
    http_response_code(400);
    echo json_encode(["success" => false, "error" => "User ID tidak diberikan"]);
    exit;
}

$query = "
    SELECT 
        COUNT(*) AS total,
        SUM(CASE WHEN result IN ('glioma', 'meningioma', 'pituitary') THEN 1 ELSE 0 END) AS positives,
        SUM(CASE WHEN result = 'notumor' THEN 1 ELSE 0 END) AS negatives,
        SUM(CASE WHEN result = 'notumor' THEN 1 ELSE 0 END) AS notumor,
        SUM(CASE WHEN result = 'glioma' THEN 1 ELSE 0 END) AS glioma,
        SUM(CASE WHEN result = 'meningioma' THEN 1 ELSE 0 END) AS meningioma,
        SUM(CASE WHEN result = 'pituitary' THEN 1 ELSE 0 END) AS pituitary
    FROM detection_history
    WHERE user_id = ?
";

$stmt = $conn->prepare($query);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result()->fetch_assoc();

echo json_encode([
    "success" => true,
    "total" => (int)$result["total"],
    "positives" => (int)$result["positives"],
    "negatives" => (int)$result["negatives"],
    "glioma" => (int)$result["glioma"],
    "meningioma" => (int)$result["meningioma"],
    "pituitary" => (int)$result["pituitary"],
    "notumor" => (int)$result["notumor"]
]);

$conn->close();
