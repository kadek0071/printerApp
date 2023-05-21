<?php

if(isset($_POST["reset_password_submit"])){

    $selector = $_POST['selector'];
    $validator = $_POST['validator'];
    $password = $_POST['pass_2'];
    $passwordRepeat = $_POST['pass_repeat_2'];

    require_once 'db_hand.php';
    require_once 'functions.php';

    if(empty($password) || empty($passwordRepeat)){        
        header("location: ../create-new-password.php?reseterror=emptyinput&selector=$selector&validator=$validator");
        exit();        
    } else if($password != $passwordRepeat){
        header("location: ../create-new-password.php?reseterror=passwordsdontmatch&selector=$selector&validator=$validator");
        exit();
    }

    $currentDate = date("U");

    $sql = "SELECT * FROM reset_hasla WHERE selektor=? AND data_wygasniecia >= ?";

    $stmt = mysqli_stmt_init($conn);

    if(!mysqli_stmt_prepare($stmt, $sql)){
        header("location: ../create-new-password.php?reseterror=stmtfailed");
        exit();
    }else{
        mysqli_stmt_bind_param($stmt, "ss", $selector, $currentDate);
        mysqli_stmt_execute($stmt);

        $result = mysqli_stmt_get_result($stmt);

        if(!$row = mysqli_fetch_assoc($result)){
            header("location: ../reset-password.php?reseterror=timexpired");
            exit();
        } else{

        $tokenBin = hex2bin($validator);
        $tokenCheck = password_verify($tokenBin, $row['token']);

        if($tokenCheck === false){
            header("location: ../reset-password.php?reseterror=tokendontmatch"); 
        } else if($tokenCheck === true){

            $tokenEmail = $row['email'];

            $sql = "SELECT * FROM uzytkownicy WHERE email=?";

            $stmt = mysqli_stmt_init($conn);

            if(!mysqli_stmt_prepare($stmt, $sql)){
                header("location: ../create-new-password.php?reseterror=stmtfailed");
                exit();
            } else{
                mysqli_stmt_bind_param($stmt, "s", $tokenEmail);
                mysqli_stmt_execute($stmt);
                $result = mysqli_stmt_get_result($stmt);
                if(!$row = mysqli_fetch_assoc($result)){
                    header("location: ../reset-password.php?reseterror=emaildontmatch");
                    exit();
                } else{

                    $sql = "UPDATE uzytkownicy SET haslo=? WHERE email=?";

                    $stmt = mysqli_stmt_init($conn);

                    if(!mysqli_stmt_prepare($stmt, $sql)){
                        header("location: ../create-new-password.php?reseterror=stmtfailed");
                        exit();
                    } else{
                        $newPwdHash = password_hash($password, PASSWORD_DEFAULT);
                        mysqli_stmt_bind_param($stmt, "ss", $newPwdHash, $tokenEmail);
                        mysqli_stmt_execute($stmt);
                        
                        $sql = "DELETE FROM reset_hasla WHERE email=?";
                        $stmt = mysqli_stmt_init($conn);

                        if(!mysqli_stmt_prepare($stmt, $sql)){
                            header("location: ../create-new-password.php?reseterror=stmtfailed");
                            exit();
                            } else{
                                mysqli_stmt_bind_param($stmt, "s", $tokenEmail);
                                mysqli_stmt_execute($stmt);
                                header("location: ../index.php?resetstatus=updated");
                            }                
                    }

                }
            }
        }
        }
    }
    
} else{
    header("location: ../index.php");
}

