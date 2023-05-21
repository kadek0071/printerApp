<?php

if(isset($_POST["submit_reg"])){

    $name = $_POST["nazwa_2"];
    $login = $_POST["login_2"];
    $email = $_POST["email_2"];
    $password = $_POST["pass_2"];
    $password_repeat = $_POST["pass_repeat_2"];

    $name = trim($name);
    $login = trim($login);
    $email = trim($email);
    $password = trim($password);
    $password_repeat = trim($password_repeat);    

    require_once 'db_hand.php';
    require_once 'emailController.php';
    require_once 'functions.php';

    
    function check_for_error($name, $login, $email){
        $err = error_get_last();
            if (!is_null($err)) {
                if($err["type"] === 1){
                    header("location: ../index.php?regerror=stmtfailed&name=$name&login_2=$login&email_2=$email");             
                }
            }
    }
    
    register_shutdown_function('check_for_error', $name, $login, $email);

    if(emptyInputSignup($name, $login, $email, $password, $password_repeat) !== false){
        header("location: ../index.php?regerror=emptyinput&name=$name&login_2=$login&email_2=$email");
        exit();
    }if(invalidName($name) !== false){
        header("location: ../index.php?regerror=invalidname&name=$name&login_2=$login&email_2=$email");
        exit();
    }
    if(invalidLogin($login) !== false){
        header("location: ../index.php?regerror=invalidlogin&name=$name&login_2=$login&email_2=$email");
        exit();
    }
    if(loginExists($conn, $login) !== false){
        header("location: ../index.php?regerror=logintaken&name=$name&login_2=$login&email_2=$email");
        exit();
    }
    if(emailExists($conn, $email) !== false){
        header("location: ../index.php?regerror=emailtaken&name=$name&login_2=$login&email_2=$email");
        exit();
    }
    if(invalidEmail($email) !== false){
        header("location: ../index.php?regerror=invalidemail&name=$name&login_2=$login&email_2=$email");
        exit();
    }
    if(passwordMatch($password, $password_repeat)){
        header("location: ../index.php?regerror=passwordsdontmatch&name=$name&login_2=$login&email_2=$email");
        exit();
    }

    createUser($conn, $name, $login, $email, $password);
   
} else{
    header("location: ../index.php");
    exit();
}



