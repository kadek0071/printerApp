<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    session_start();

    if (!isset($_POST['csrfToken']) || !hash_equals($_SESSION['csrfToken'], $_POST['csrfToken'])) {
        $errors = [];
        $data = [];
        $errors['csrfToken'] = 'Error! CSRF token jest nieważny.';
        $data['success'] = false;
        $data['errors'] = $errors;
        echo json_encode($data);
        // redirection to access denied page or any other logic
        exit();
    }

    if(isset($_POST['action'])){

        if ($_POST['action'] == 'button_save') {

            if(isset($_POST['id'])){

                $id = $_POST['id'];
                $model = $_POST['model'];
                $firma = $_POST['firma'];
                $rodzaj = $_POST['rodzaj'];
                $predkosc_wydruku = $_POST['predkosc_wydruku'];
                $pojemnosc = $_POST['pojemnosc'];

                $id = trim($id);
                $model = trim($model);
                $firma = trim($firma);
                $rodzaj = trim($rodzaj);
                $predkosc_wydruku = trim($predkosc_wydruku);
                $pojemnosc = trim($pojemnosc); 

                if($id > 0){

                    require_once 'db_hand.php';

                    ///Custom Error Display

                    $errors = [];
                    $data = [];

                    if (empty($_POST['model'])) {
                        $errors['model'] = 'Wymagana nazwa drukarki.';                       
                    }
                    /*
                    if (empty($_POST['firma'])) {
                        $errors['firma'] = 'Firma is required.';
                    }

                    if (empty($_POST['rodzaj'])) {
                        $errors['rodzaj'] = 'Rodzaj is required.';
                    }

                    if (empty($_POST['predkosc_wydruku'])) {
                        $errors['predkosc_wydruku'] = 'Predkosc wydruku is required.';
                    }

                    if (empty($_POST['pojemnosc'])) {
                        $errors['pojemnosc'] = 'Pojemnosc is required.';
                    }
                    */

                    if(empty($errors)){

                        $sql = "UPDATE drukarki SET model=?, firma=?, rodzaj=?, predkosc_wydruku=?, pojemnosc=? WHERE id=?";

                        $stmt = mysqli_stmt_init($conn);

                        if(!mysqli_stmt_prepare($stmt, $sql)){
                            $errors['action'] = 'Failed to perform statement.';
                        } else{
                            mysqli_stmt_bind_param($stmt, "ssssss", $model, $firma, $rodzaj, $predkosc_wydruku, $pojemnosc, $id);
                            mysqli_stmt_execute($stmt);
                            mysqli_stmt_close($stmt);  
                            mysqli_close($conn);                   
                        }
                    }

                    if (!empty($errors)) {
                        $data['success'] = false;
                        $data['errors'] = $errors;
                    } else {    
                        $data['success'] = true;
                        $data['message'] = 'Success!';
                    }

                    echo json_encode($data);

                }

            }
            
        } 
        else if ($_POST['action'] == 'button_delete') {

            if(isset($_POST['id'])){

                $id = $_POST['id'];
                $id = trim($id);

                if($id > 0){                    
        
                    require_once 'db_hand.php';
        
                    ///Custom Error Display
        
                    $errors = [];
                    $data = [];
                    
                    if(empty($errors)){                       

                        $sql = "DELETE FROM drukarki WHERE id=?";
                        
                        $stmt = mysqli_stmt_init($conn);

                        if(!mysqli_stmt_prepare($stmt, $sql)){
                            $errors['action'] = 'Failed to perform statement.';
                        } else{
                            mysqli_stmt_bind_param($stmt, "s", $id);
                            mysqli_stmt_execute($stmt);
                            mysqli_stmt_close($stmt);  
                            mysqli_close($conn);                   
                        }
                    }                    
        
                    if (!empty($errors)) {
                        $data['success'] = false;
                        $data['errors'] = $errors;
                    } else {    
                        $data['success'] = true;
                        $data['message'] = 'Success!';
                    }
        
                    echo json_encode($data);

                }

            }

        }         
            
    }else {
        echo "Access denied";
    }
    
}else {
    echo "Access denied";
}







