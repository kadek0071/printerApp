<?php


function emptyInputSignup($name, $login, $email, $password, $password_repeat){
    $result;
    if (empty($name) || empty($login) || empty($email) || empty($password) || empty($password_repeat)){
        $result = true;
    }
    else {
        $result = false;
    }
    return $result;
}

function emptyInputUpdate($name, $login, $password, $password_repeat){
    $result;
    if(empty($password) && empty($password_repeat)){
        if (empty($name) || empty($login)){
            $result = true;
        }
        else {
            $result = false;
        }
        return $result;
    } else{
        if (empty($name) || empty($login) || empty($password) || empty($password_repeat)){
            $result = true;
        } else{
            $result = false;
        }
        return $result;
    }
}

function invalidName($name){
    $result;
    if (!preg_match("/^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ ]+$/", $name) || strlen($name)>30){
        $result = true;
    }
    else {
        $result = false;
    }
    return $result;
}

function invalidLogin($login){
    $result;
    if (preg_match("/\s/", $login) || strlen($login)>60){
        $result = true;
    }
    else {
        $result = false;
    }
    return $result;
}

function invalidEmail($email){
    $result;
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)){
        $result = true;
    }
    else {
        $result = false;
    }
    return $result;
}

function passwordMatch($password, $password_repeat){
    $result;
    if ($password !== $password_repeat){
        $result = true;
    }
    else {
        $result = false;
    }
    return $result;
}

function verificationKeyMatch($vkey, $verification){
    $result;
    if ($vkey == $verification){
        $result = true;
    }
    else {
        $result = false;
    }
    return $result;
}

function emptyInputLogin($login, $password){
    $result;
    if (empty($login) || empty($password)){
        $result = true;
    }
    else {
        $result = false;
    }
    return $result;
}

function emptyInputConfirm($UserLogin, $password){
    $result;
    if (empty($UserLogin) || empty($password)){
        $result = true;
    }
    else {
        $result = false;
    }
    return $result;
}

/*
function loginExists($conn, $login, $email){

    $sql = "SELECT * FROM uzytkownicy WHERE login = ? OR email = ?;";
    $stmt = mysqli_stmt_init($conn);
    if(!mysqli_stmt_prepare($stmt, $sql)){
        header("location: ../index.php?error=stmtfailed");
        exit();
    }

    mysqli_stmt_bind_param($stmt, "ss", $login, $email);
    mysqli_stmt_execute($stmt);

    $resultData = mysqli_stmt_get_result($stmt);

    if($row = mysqli_fetch_assoc($resultData)){
        
        return $row;

    } else{
        $result = false;
        return $result;
    }

    mysqli_stmt_close($stmt);

}
*/

function loginExists($conn, $login){

    $sql = "SELECT * FROM uzytkownicy WHERE login = ?;";
    $stmt = mysqli_stmt_init($conn);
    if(!mysqli_stmt_prepare($stmt, $sql)){
        header("location: ../index.php?error=stmtfailed");
        exit();
    }

    mysqli_stmt_bind_param($stmt, "s", $login);
    mysqli_stmt_execute($stmt);

    $resultData = mysqli_stmt_get_result($stmt);

    if($row = mysqli_fetch_assoc($resultData)){
        
        return $row;

    } else{
        $result = false;
        return $result;
    }

    mysqli_stmt_close($stmt);

}

function loginMatch($conn, $login, $currentUserId){

    $sql = "SELECT * FROM uzytkownicy WHERE login = ? AND id = ?;";
    $stmt = mysqli_stmt_init($conn);
    if(!mysqli_stmt_prepare($stmt, $sql)){
        header("location: ../index.php?error=stmtfailed");
        exit();
    }

    mysqli_stmt_bind_param($stmt, "ss", $login, $currentUserId);
    mysqli_stmt_execute($stmt);

    $resultData = mysqli_stmt_get_result($stmt);

    if($row = mysqli_fetch_assoc($resultData)){
        
        return $row;

    } else{
        $result = false;
        return $result;
    }

    mysqli_stmt_close($stmt);

}

function IdExists($conn, $currentUserId){

    $sql = "SELECT * FROM uzytkownicy WHERE id = ?;";
    $stmt = mysqli_stmt_init($conn);
    if(!mysqli_stmt_prepare($stmt, $sql)){
        header("location: ../index.php?error=stmtfailed");
        exit();
    }

    mysqli_stmt_bind_param($stmt, "s", $currentUserId);
    mysqli_stmt_execute($stmt);

    $resultData = mysqli_stmt_get_result($stmt);

    if($row = mysqli_fetch_assoc($resultData)){
        
        return $row;

    } else{
        $result = false;
        return $result;
    }

    mysqli_stmt_close($stmt);

}

function emailExists($conn, $email){

    $sql = "SELECT * FROM uzytkownicy WHERE email = ?;";
    $stmt = mysqli_stmt_init($conn);
    if(!mysqli_stmt_prepare($stmt, $sql)){
        header("location: ../index.php?error=stmtfailed");
        exit();
    }
    
    mysqli_stmt_bind_param($stmt, "s", $email);
    mysqli_stmt_execute($stmt);

    $resultData = mysqli_stmt_get_result($stmt);

    if($row = mysqli_fetch_assoc($resultData)){
        
        return $row;

    } else{
        $result = false;
        return $result;
    }

    mysqli_stmt_close($stmt);

}

function checkVerificationStatus($conn, $login){

    $sql = "SELECT * FROM uzytkownicy WHERE login = ? AND weryfikacja = ?;";
    $stmt = mysqli_stmt_init($conn);
    if(!mysqli_stmt_prepare($stmt, $sql)){
        header("location: ../index.php?logerror=stmtfailed");
        exit();
    }
    $status = 1;
    mysqli_stmt_bind_param($stmt, "ss", $login, $status);
    mysqli_stmt_execute($stmt);

    $resultData = mysqli_stmt_get_result($stmt);

    if($row = mysqli_fetch_assoc($resultData)){
        
        return $row;

    } else{
        $result = false;
        return $result;
    }

    mysqli_stmt_close($stmt);

}

function vkeyExists($conn, $vkey){

    $sql = "SELECT klucz_weryfikacyjny, weryfikacja FROM uzytkownicy WHERE  klucz_weryfikacyjny = ? AND weryfikacja = 0  LIMIT 1;";
    $stmt = mysqli_stmt_init($conn);
    if(!mysqli_stmt_prepare($stmt, $sql)){
        header("location: ../index.php?verifyerror=stmtfailed");
        exit();
    }

    mysqli_stmt_bind_param($stmt, "s", $vkey);
    mysqli_stmt_execute($stmt);

    $resultData = mysqli_stmt_get_result($stmt);

    if($row = mysqli_fetch_assoc($resultData)){
        
        return $row;

    } else{
        $result = false;
        return $result;
    }

    mysqli_stmt_close($stmt);

}

function loginUser($conn, $login, $password){

    $login = trim($login);
    $password = trim($password);

    if(emptyInputLogin($login, $password) !== false){
        header("location: ../index.php?logerror=emptyinput");
        exit();
    }

    $loginExsists = loginExists($conn, $login);
    $checkVerificationStatus = checkVerificationStatus($conn, $login);

    $password_hashed = $loginExsists["haslo"];    
    $check_password = password_verify($password, $password_hashed);    
                                
    if($check_password === false || $loginExsists === false || $checkVerificationStatus === false){
        header("location: ../index.php?logerror=wrongloginpassword&login=$login");      
        exit();
    } else if($check_password === true){
        session_start();
        $_SESSION["userid"] = $loginExsists["id"];
        $_SESSION["username"] = $loginExsists["nazwa"];
        $random_token = bin2hex(random_bytes(32));
        $_SESSION['csrfToken'] = $random_token;
        header("location: ../session.php");
        exit();
    }
}

function createUser($conn, $name, $login, $email, $password){

    $sql = "INSERT INTO uzytkownicy (nazwa, login, email, haslo, klucz_weryfikacyjny, weryfikacja) VALUES (?, ?, ?, ?, ?, ?);";
    $stmt = mysqli_stmt_init($conn);
    if(!mysqli_stmt_prepare($stmt, $sql)){
        header("location: ../index.php?regerror=stmtfailed&name=$name&login_2=$login&email_2=$email");
        exit();
    }

    //Setting up verification key

    $verification_key = md5(time().$login);
    $status = 0;

    //Hashing passwords

    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    mysqli_stmt_bind_param($stmt, "ssssss", $name, $login, $email, $hashedPassword, $verification_key, $status);
    

    //Sending email verification key

    if(sendVerificationEmail($email, $verification_key)){

        mysqli_stmt_execute($stmt);
        mysqli_stmt_close($stmt);  
        mysqli_close($conn);

        header("location: ../index.php?regerror=none");
        exit(); 

    }else{
        header("location: ../index.php?verifyerror=emailsendfail&name=$name&login_2=$login&email_2=$email");
        exit();
    }

}

function updateUser($conn, $name, $login, $password, $currentUserId){

        if(empty($password)){

            $sql = "UPDATE uzytkownicy SET nazwa=?, login=? WHERE id=?";

            $stmt = mysqli_stmt_init($conn);

            if(!mysqli_stmt_prepare($stmt, $sql)){
                header("location: ../updateProfile.php?updaterror=stmtfailed");
                exit();
            } else{                
                mysqli_stmt_bind_param($stmt, "sss", $name, $login, $currentUserId);
                mysqli_stmt_execute($stmt);
                mysqli_stmt_close($stmt);  
                mysqli_close($conn);

                session_start();  
                $_SESSION["username"] = $name;   
                unset($_SESSION["dataChange"]);  

                header("location: ../profile.php?updatestatus=updated");  
                exit();                  
            }

        } else {

            $sql = "UPDATE uzytkownicy SET nazwa=?, login=?, haslo=? WHERE id=?";

            $stmt = mysqli_stmt_init($conn);

            if(!mysqli_stmt_prepare($stmt, $sql)){
                header("location: ../updateProfile.php?updaterror=stmtfailed");
                exit();
            } else{     
                $newPwdHash = password_hash($password, PASSWORD_DEFAULT);
                mysqli_stmt_bind_param($stmt, "ssss", $name, $login, $newPwdHash, $currentUserId);
                mysqli_stmt_execute($stmt);
                mysqli_stmt_close($stmt);  
                mysqli_close($conn); 

                session_start();
                $_SESSION["username"] = $name;
                unset($_SESSION["dataChange"]);  

                header("location: ../profile.php?updatestatus=updated"); 
                exit();                   
            }

        } 
}

function updateVerificationStatus($conn, $vkey){

    $sql = "UPDATE uzytkownicy SET weryfikacja = ? WHERE klucz_weryfikacyjny ='$vkey' LIMIT 1;";
    $stmt = mysqli_stmt_init($conn);
    if(!mysqli_stmt_prepare($stmt, $sql)){
        header("location: ../index.php?verifyerror=stmtfailed");
        exit();
    }
    $status = 1;
    mysqli_stmt_bind_param($stmt, "s", $status);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_close($stmt);   
    mysqli_close($conn);
    header("location: ../index.php?verifyerror=none");    
    exit();  
}

function verifyUser($conn, $vkey){
    
    $resultSet = vkeyExists($conn, $vkey);
    $verification = $resultSet["klucz_weryfikacyjny"];

    if(verificationKeyMatch($vkey, $verification)){

        updateVerificationStatus($conn, $vkey); 
       
    } else{
        header("location: ../index.php?verifyerror=accountvalidordoesntmatchvkey");
        exit();       
    }
}

function ConfirmUser($conn, $currentUserId, $password){

    if(emptyInputConfirm($currentUserId, $password) !== false){
        header("location: ../confirm.php?confirmerror=emptyinput");
        exit();
    }

    $IdExsists = IdExists($conn, $currentUserId);

    $password_hashed = $IdExsists["haslo"]; 
    $check_password = password_verify($password, $password_hashed);    
                                
    if($check_password === false || $IdExsists === false){
        header("location: ../confirm.php?confirmerror=wrongpassword");      
        exit();
    } else if($check_password === true){   
        $_SESSION["dataChange"] = time();     
        return true;
        exit();
    }   
}

