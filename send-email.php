<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'] ?? '';
    $email = $_POST['email'] ?? '';
    $website = $_POST['website'] ?? '';
    $comments = $_POST['comments'] ?? '';
    $country = $_POST['country'] ?? '';
    
    // Convert country code to full name
    $countryNames = array(
        'PK' => 'Pakistan',
        'US' => 'United States',
        'GB' => 'United Kingdom',
        'CA' => 'Canada',
        'AU' => 'Australia',
        'IN' => 'India',
        'DE' => 'Germany',
        'FR' => 'France'
    );
    
    $countryLine = '';
    if (!empty($country) && isset($countryNames[$country])) {
        $countryLine = "\nCountry: " . $countryNames[$country];
    }
    
    $mail = new PHPMailer(true);
    
    try {
        //Server settings
        $mail->SMTPDebug = SMTP::DEBUG_SERVER;
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'glenmaxwell2312@gmail.com';
        $mail->Password   = 'dvigjbwtmbatzbbz';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;
        
        //Recipients
        $mail->setFrom('glenmaxwell2312@gmail.com', 'Softco Digital');
        $mail->addAddress('glenmaxwell2312@gmail.com', 'Softco Digital');
        
        //Content
        $mail->isHTML(false);
        $mail->Subject = 'New Contact Form - Softco Digital';
        if ($country === 'PK') {
            $mail->Subject .= ' (Pakistan)';
        }
        $mail->Body    = "Name: $name\n\nEmail: $email\n\nWebsite: $website$countryLine\n\nMessage:\n$comments";
        
        $mail->send();
        echo json_encode(['success' => true, 'message' => 'Email sent successfully']);
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'error' => $mail->ErrorInfo]);
    }
    exit;
}
echo json_encode(['success' => false, 'error' => 'Invalid request']);
?>
