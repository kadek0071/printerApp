<?php

require_once dirname( __FILE__ ) . '/' . '../vendor/autoload.php';
require_once 'emailCredentials.php';



// Create the Transport
$transport = (new Swift_SmtpTransport('smtp.gmail.com', 465, 'ssl'))
  ->setUsername(EMAIL)
  ->setPassword(PASSWORD);

// Create the Mailer using your created Transport
$mailer = new Swift_Mailer($transport);


function sendVerificationEmail($email, $verification_key){

    //PHP version using Swift Mailer

    global $mailer;
    $body = '<!DOCTYPE html>
    <html lang="pl">
    <head>
        <meta charset="UTF-8">
        <title>Weryfikacja Email</title>	 
    </head>
    <body>
    <div class="wrapper">
    <p>
        Dziękujemy za rejestrację. Wejdź w link poniżej, aby zweryfikować adres email. <br><br>
        <a href="http://localhost/login/DATABASE_HAND/verify.php?vkey=' . $verification_key . '">Zarejestruj konto</a>
    </p>
    </div>
    </body>
    </html>';

    $message = (new Swift_Message('Weryfikacja Email'))
    ->setFrom(EMAIL)
    ->setTo($email)
    ->setBody($body, 'text/html');

    // Send the message
    $result = $mailer->send($message);

    if($result){
        return true;
        exit(); 
    } else{
        return false;
        exit(); 
    }

    //Mail Server installed / PHP version
/*
    $to = $email;
    $subject = "Weryfikacja Email";
    $message = '<!DOCTYPE html>
    <html lang="pl">
    <head>
        <meta charset="UTF-8">
        <title>Weryfikacja Email</title>	 
    </head>
    <body>
    <div class="wrapper">
    <p>
        Dziękujemy za rejestrację. Wejdź w link poniżej, aby zweryfikować adres email. <br><br>
        <a href="http://localhost/login/DATABASE_HAND/verify.php?vkey=' . $verification_key . '">Zarejestruj konto</a>
    </p>
    </div>
    </body>
    </html>';
    $headers = "From: robotestlogin@gmail.com" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

    if(mail($to,$subject,$message,$headers)){
        return true;
    } else{
        return false; 
    }*/
}

function sendResetEmail($email, $selector, $token, $login){

    //PHP version using Swift Mailer

    global $mailer;
    $body = '<!DOCTYPE html>
    <html lang="pl">
    <head>
        <meta charset="UTF-8">
        <title>Resetowanie hasła</title>	 
    </head>
    <body>
    <div class="wrapper">
    <p>
        
        Otrzymaliśmy prośbę o zmianę hasła do Twojego konta w bazie drukarek. Wejdź w link poniżej, aby zmienić hasło. <br>
        Jeśli nie poprosiłeś(-aś) o zmianę hasła, zignoruj ten e-mail — na Twoim koncie nie zostaną dokonane żadne zmiany. <br><br>

        Login użytkownika: <br>
        <b>'.$login.'</b> <br>

        <a href="http://localhost/login/create-new-password.php?selector=' . $selector . '&validator=' . bin2hex($token) . '">Zmień hasło</a>
    </p>
    </div>
    </body>
    </html>';

    $message = (new Swift_Message('Resetowanie hasła'))
    ->setFrom(EMAIL)
    ->setTo($email)
    ->setBody($body, 'text/html');

    // Send the message
    
    $result = $mailer->send($message);

    if($result){
        return true;
        exit(); 
    } else{
        return false;
        exit(); 
    }



    //Mail Server installed / PHP version
/*
    $to = $email;

    $subject = 'Resetowanie hasła';

    $message = '<p>Otrzymaliśmy prośbę o zmianę hasła do Twojego konta w bazie drukarek. Wejdź w link poniżej, aby zmienić hasło. <br>
        Jeśli nie poprosiłeś(-aś) o zmianę hasła, zignoruj ten e-mail — na Twoim koncie nie zostaną dokonane żadne zmiany. </p></br></br>';
    $message .= '<p> Login użytkownika: </br>'.$login.'</p></br>'; 
    $message .= '<p>Link do zresetowania: </br></br>';
    $message .= '<a href="http://localhost/login/create-new-password.php?selector=' . $selector . '&validator=' . bin2hex($token)'">Zresetuj hasło</a></p>';

    $headers = "From: admin <robotestlogin@gmail.com>" . "\r\n";
    $headers .= "Reply-To: robotestlogin@gmail.com\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

    if(mail($to, $subject, $message, $headers)){
        return true;
    }else{
        return false;
    }
*/
}
