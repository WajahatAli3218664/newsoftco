<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'] ?? '';
    $email = $_POST['email'] ?? '';
    $website = $_POST['website'] ?? '';
    $comments = $_POST['comments'] ?? '';
    
    $to = 'wajahat345678@gmail.com';
    $subject = 'New Contact Form - Softco Digital';
    $message = "Name: $name\n\nEmail: $email\n\nWebsite: $website\n\nMessage:\n$comments";
    $headers = "From: noreply@softcodigitalinc.com\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();
    
    $result = mail($to, $subject, $message, $headers);
    echo json_encode(['success' => $result, 'debug' => error_get_last()]);
    exit;
}
echo json_encode(['success' => false, 'error' => 'Invalid request']);
?>
