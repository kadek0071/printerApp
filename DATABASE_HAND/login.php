<?php

if(isset($_POST['submit_log'])){
    
    $login = $_POST["login_1"];
    $password = $_POST["pass_1"];

    $login = trim($login);
    $password = trim($password);
    
    require_once 'db_hand.php';
    require_once 'functions.php';

    loginUser($conn, $login, $password);
    
} else{
    header("location: ../index.php");
    exit();
}












