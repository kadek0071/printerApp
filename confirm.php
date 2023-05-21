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
	<script src="https://kit.fontawesome.com/a81368914c.js"></script>
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

<div class="background">
			<div class="wrap">
				<div id="bg"></div>
            </div>

<div class="web-center">


					
	    	<div class="web-center-content">
				<div class="content">

				<nav class="drop hide" id="drop-1">							
								<ul>									
									<li class="profile"><a href="profile.php">Profil</a></li>
									<li><a href="session.php">Drukarki</a></li>
									<li><a href="information.php">Informacje</a></li>
									<li class="logout"><a href="DATABASE_HAND/logout.php">Wyloguj się</a></li>
								</ul>							
				</nav>								
						<div class="form-overflow">
							<div class="login-container">	
								<div class="login-content">
									<div id="form-container" class="forms form1">
											<form id="form1" action="DATABASE_HAND/accountModify.php" method="POST" novalidate>
                                            <div class="input-div">
                                                    <div class="i"> 
                                                        <i class="fas fa-lock"></i>
                                                    </div>
                                                    <div class="div">
                                                        <h5>Wpisz hasło</h5>														
                                                        <input type="password" id="password" class="input" name="password">
                                                        <small>Error message</small>	
                                                        <div class="i-eye"> 
                                                            <i class="fas fa-eye eye-toggle eye"></i>
                                                        </div>
                                                	</div>
											</div>
											
												<input type="submit" name="accountChange" class="btn2" value="Zatwierdź hasło">									

												<?php
													if(isset($_GET['confirmerror'])){
														if($_GET["confirmerror"] == "wrongpassword"){
															echo "<script type='text/javascript'> 
															let form = 'confirm_form';
															sessionStorage.setItem('form', form);									
															let error = 'wrongpassword';									
															sessionStorage.setItem('error', error);
															</script>";
														}
														if($_GET["confirmerror"] == "emptyinput"){
															echo "<script type='text/javascript'> 
															let form = 'confirm_form';
															sessionStorage.setItem('form', form);									
															let error = 'emptyinput';									
															sessionStorage.setItem('error', error);
															</script>";
														}
													}
												?>															
											</form>
									</div>
								</div>
							</div>
						</div>
				</div> 
		</div>
	</div>
</div>

<div id="footer" class="row justify-content-center">
	<div class="col-md-8 text-center">
		<h1>USŁUGI INFORMATYCZNE</h1>		
		<a class="btn btn-secondary btn-sm" href="VISIT_PAGE/index.html" target="_blank">STRONA BAZOWA</a>
	</div>
</div>

<script src="DATABASE_JS/jquery-3.3.1.min.js"></script>
<script src="bootstrap-4.5.3-dist/js/bootstrap.min.js"></script>
<script src="DATABASE_JS/app_2.js"></script>
<script src="DATABASE_JS/app.js"></script>
</body>

</html>