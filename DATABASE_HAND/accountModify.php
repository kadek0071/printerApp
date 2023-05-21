<?php

if(isset($_POST['accountChange'])){
    
    $password = $_POST["password"];

    require_once 'db_hand.php';
    require_once 'functions.php';

    session_start();

    $currentUserId = $_SESSION["userid"];

    if(ConfirmUser($conn, $currentUserId, $password)){
        header("location: ../updateProfile.php");
    }
    
} else if(isset($_POST['accountUpdate'])){
    
    session_start();
    
    if (!isset($_POST['csrfToken']) || !hash_equals($_SESSION['csrfToken'], $_POST['csrfToken'])) {
        header("location: ../profile.php?updaterror=stmtfailed");
        exit();
    }

    $name = $_POST["name"];
    $login = $_POST["login"];
    $password = $_POST["password"];
    $password_repeat = $_POST["password_repeat"];
    
    $name = trim($name);
    $login = trim($login);
    $password = trim($password);
    $password_repeat = trim($password_repeat);

    require_once 'db_hand.php';
    require_once 'functions.php';

    $currentUserId = $_SESSION["userid"];

    if(time() - $_SESSION["dataChange"] > 300){     
        unset($_SESSION["dataChange"]); 
        echo "<script type='text/javascript'> 
        let action = 'another_update';															
        sessionStorage.setItem('action', action);
        window.location='../profile.php?updaterror=timexpired';
        </script>";          
        exit();
    } if(emptyInputUpdate($name, $login, $password, $password_repeat) !== false){
        header("location: ../updateProfile.php?updaterror=emptyinput&name=$name&login=$login");
        exit();
    } if(invalidName($name) !== false){
        header("location: ../updateProfile.php?updaterror=invalidname&name=$name&login=$login");
        exit();
    } if(invalidLogin($login) !== false){
        header("location: ../updateProfile.php?updaterror=invalidlogin&name=$name&login=$login");
        exit();
    } if(loginExists($conn, $login) !== false){
        $loginMatch = loginMatch($conn, $login, $currentUserId);
        if($loginMatch["login"] !== $login){        
            header("location: ../updateProfile.php?updaterror=logintaken&name=$name&login=$login");
            exit();
        }
    } if(passwordMatch($password, $password_repeat)){
        header("location: ../updateProfile.php?updaterror=passwordsdontmatch&name=$name&login2=$login");
        exit();
    }

    updateUser($conn, $name, $login, $password, $currentUserId);

} else{
    header("location: ../profile.php?updaterror=stmtfailed");
    exit();
}





