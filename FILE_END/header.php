<?php
	session_start();
?>

<!DOCTYPE html>
<html lang="pl">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge"/>
	<title>Strona Główna 3</title>
	<link rel="stylesheet" href="bootstrap-4.5.3-dist/css/bootstrap.min.css">
	<link rel="stylesheet" href="DATABASE_CSS/style.css">
	<link rel="stylesheet" href="DATABASE_CSS/fixed.css">
	<script src="DATABASE_JS/jquery-3.3.1.min.js"></script>
	<script type="text/javascript" src="https://kit.fontawesome.com/a81368914c.js"></script>	
	<link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Lobster&family=Montserrat:wght@400;600&display=swap" 
	rel="stylesheet"
	/> 	 
</head>
<body>

<nav class="navbar navbar-dark fixed-top">
	<?php

	if(isset($_SESSION["userid"])){
		echo '<h1 class="navbar-brand mx-auto">' . $_SESSION["username"] . '</h1>';
	} else{
		header("location: ./index.php");
	}
	?>
	<i class="fas fa-cog btn-cog" id="cog-1" onclick="dropdown_menu_1()"></i>
</nav>



	    