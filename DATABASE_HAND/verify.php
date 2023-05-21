<?php

    require_once 'db_hand.php';
    require_once 'functions.php';

    if(isset($_GET['vkey'])){
    $vkey = $_GET['vkey'];
    verifyUser($conn, $vkey);
    } else{
        header("location: ../index.php?verifyerror=verificationfailed");
        exit();
    }
    
?>
