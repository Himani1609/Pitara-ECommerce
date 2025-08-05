<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $to = $_POST["to"];
    $subject = $_POST["subject"];
    $message = $_POST["html"];
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: Pitara <info@himanibansal.com>" . "\r\n";

    if (mail($to, $subject, $message, $headers)) {
        echo json_encode(["status" => "success"]);
    } else {
        echo json_encode(["status" => "fail"]);
    }
}
?>
