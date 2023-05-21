<?php

if(isset($_POST["reset_request_submit"])){

$email = $_POST["email"];

require_once 'db_hand.php';
require_once 'emailController.php';
require_once 'functions.php';


function check_for_error($email){
$err = error_get_last();
    if (!is_null($err)) {
        if($err["type"] === 1){
            header("location: ../reset-password.php?reseterror=stmtfailed&email=$email");            
        }
    }
}

register_shutdown_function('check_for_error', $email);

if(invalidEmail($email) !== false){
    header("location: ../reset-password.php?reseterror=invalidemail&email=$email");
    exit();
}
if(emailExists($conn, $email) === false){
    header("location: ../reset-password.php?reseterror=invalidemail&email=$email");
    exit();
}

$selector = bin2hex(random_bytes(8));
$token = random_bytes(32);

$expires = date("U") + 1800;

$sql = "SELECT login FROM uzytkownicy WHERE email=?";

$stmt = mysqli_stmt_init($conn);

if(!mysqli_stmt_prepare($stmt, $sql)){
    header("location: ../reset-password.php?reseterror=stmtfailed");
    exit();
}else{
    mysqli_stmt_bind_param($stmt, "s", $email);
    mysqli_stmt_execute($stmt);                    
}

$resultData = mysqli_stmt_get_result($stmt);

if($row = mysqli_fetch_assoc($resultData)){
    $UserLogin = $row;                                
}

$login = $UserLogin['login'];

//Sending email for resetting password

if(sendResetEmail($email, $selector, $token, $login)){

    //Updating "reset password" table

    $sql = "DELETE FROM reset_hasla WHERE email=?";

    $stmt = mysqli_stmt_init($conn);

    if(!mysqli_stmt_prepare($stmt, $sql)){
        header("location: ../reset-password.php?reseterror=stmtfailed");
        exit();
    }else{
        mysqli_stmt_bind_param($stmt, "s", $email);
        mysqli_stmt_execute($stmt);
    }

    $sql = "INSERT INTO reset_hasla (email, selektor, token, data_wygasniecia) VALUES (?,?,?,?);";

    $stmt = mysqli_stmt_init($conn);

    if(!mysqli_stmt_prepare($stmt, $sql)){
        header("location: ../reset-password.php?reseterror=stmtfailed");
        exit();
    }else{
        $hashedToken = password_hash($token, PASSWORD_DEFAULT);
        mysqli_stmt_bind_param($stmt, "ssss", $email, $selector, $hashedToken, $expires);
        mysqli_stmt_execute($stmt);
    }

    mysqli_stmt_close($stmt);
    mysqli_close($conn);

    header("location: ../index.php?reseterror=none");
    exit();

}else{
    header("location: ../reset-password.php?reseterror=emailsendfail&email=$email");
    exit();
}

}else{
    header("location: ../reset-password.php");
}
