<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

  include_once 'db_hand.php';

  if(isset($_POST['action'])){

    if ($_POST['action'] === 'defaultContent') {

      $contentMoveCount = $_POST['contentMoveCount'];

      if(isset($_POST['contentCheckMore'])){      

        $contentCheckMore = $_POST['contentCheckMore'];
  
        $contentCheck = $contentCheckMore + $contentMoveCount;
  
      } 
      
      if(isset($_POST['contentCheckLess'])){
  
        $contentCheckLess = $_POST['contentCheckLess'];
  
        $contentCheck = $contentCheckLess - $contentMoveCount;
  
      }

      $sql = "SELECT * FROM drukarki ORDER BY data_utworzenia DESC LIMIT ?, ?";

      $stmt = mysqli_stmt_init($conn);

      if(!mysqli_stmt_prepare($stmt, $sql)){
        echo json_encode(array('content' => 0));        
      } else{
        
        mysqli_stmt_bind_param($stmt, "ss", $contentCheck, $contentMoveCount);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
        mysqli_stmt_close($stmt);  
        mysqli_close($conn);

        if(mysqli_num_rows($result) > 0){

          echo json_encode(array('content' => 1));
  
        } else{
          echo json_encode(array('content' => 0));
        }

      }

    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////

    if($_POST['action'] === 'searchContent'){
      
      $contentSearchMoveCount = $_POST['contentSearchMoveCount'];
      $search = mysqli_real_escape_string($conn, $_POST['search']);

      if(isset($_POST['contentSearchCheckMore'])){      

        $contentSearchCheckMore = $_POST['contentSearchCheckMore'];
  
        $contentSearchCheck = $contentSearchCheckMore + $contentSearchMoveCount;
  
      } 
      
      if(isset($_POST['contentSearchCheckLess'])){
  
        $contentSearchCheckLess = $_POST['contentSearchCheckLess'];
  
        $contentSearchCheck = $contentSearchCheckLess - $contentSearchMoveCount;
  
      }

      $sql = "SELECT * FROM drukarki WHERE model LIKE '%$search%' OR firma LIKE '%$search%' OR 
      rodzaj LIKE '%$search%' OR predkosc_wydruku LIKE '%$search%' OR pojemnosc LIKE '%$search%' ORDER BY data_utworzenia DESC LIMIT ?, ?";

      $stmt = mysqli_stmt_init($conn);

      if(!mysqli_stmt_prepare($stmt, $sql)){
        echo json_encode(array('content' => 0));       
      } else{
        
        mysqli_stmt_bind_param($stmt, "ss", $contentSearchCheck, $contentSearchMoveCount);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
        mysqli_stmt_close($stmt);  
        mysqli_close($conn);

        if(mysqli_num_rows($result) > 0){

          echo json_encode(array('content' => 1));
  
        } else{
          echo json_encode(array('content' => 0));
        }

      }

    }

  }else{
    echo json_encode(array('content' => 0));
  }

}else {
  echo "Access denied";
}