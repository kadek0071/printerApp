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
	<link rel="stylesheet" href="FORGOT_PASS_CSS/style.css">
	<link rel="stylesheet" href="FORGOT_PASS_CSS/fixed.css">
	<script src="https://kit.fontawesome.com/a81368914c.js"></script>
	<link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Lobster&family=Montserrat:wght@400;600&display=swap" 
	rel="stylesheet"
	/> 	 
</head>
<body>

<nav class="navbar navbar-dark fixed-top">
<h1 class="navbar-brand mx-auto">RESETOWANIE HASŁA</h1>
</nav>

<div class="background">
			<div class="wrap">
				<div id="bg"></div>
            </div>

<div class="web-center">			
	    	
			<?php				

				if(isset($_GET['reseterror'])){
					if($_GET["reseterror"] == "emaildontmatch"){
						if(isset($_SESSION["userid"])){
							header("location: ./session.php?reseterror=emaildontmatch");
						}						
						echo "<script type='text/javascript'> 
									let form = 'reset_form';																
									sessionStorage.setItem('form', form);									
									let error = 'emaildontmatch';									
									sessionStorage.setItem('error', error);
							  </script>
									<div class='alert hide' id='alert_1'>
									<span class='fas fa-exclamation-circle'></span>
									<span class='msg'></span>
									<span class='close-btn' id='msg-btn-1'>
											<span class='fas fa-times'></span>
									</span>
								</div>";
					}
					if($_GET["reseterror"] == "timexpired"){						
						if(isset($_SESSION["userid"])){
							header("location: ./session.php?reseterror=timexpired");
						}						
						echo "<script type='text/javascript'> 
									let form = 'reset_form';																
									sessionStorage.setItem('form', form);									
									let error = 'timexpired';									
									sessionStorage.setItem('error', error);
							  </script>
									<div class='alert hide' id='alert_1'>
									<span class='fas fa-exclamation-circle'></span>
									<span class='msg'></span>
									<span class='close-btn' id='msg-btn-1'>
											<span class='fas fa-times'></span>
									</span>
								</div>";
					}
					if($_GET["reseterror"] == "stmtfailed"){
						if(isset($_SESSION["userid"])){
							header("location: ./session.php?reseterror=stmtfailed");
						}						
						echo "<script type='text/javascript'> 
									let form = 'reset_form';																
									sessionStorage.setItem('form', form);									
									let error = 'stmtfailed';									
									sessionStorage.setItem('error', error);
							  </script>
									<div class='alert hide' id='alert_1'>
									<span class='fas fa-exclamation-circle'></span>
									<span class='msg'></span>
									<span class='close-btn' id='msg-btn-1'>
											<span class='fas fa-times'></span>
									</span>
								</div>";
					}
					if($_GET["reseterror"] == "tokendontmatch"){
						if(isset($_SESSION["userid"])){
							header("location: ./session.php?reseterror=tokendontmatch");
						}						
						echo "<script type='text/javascript'> 
									let form = 'reset_form';																
									sessionStorage.setItem('form', form);									
									let error = 'tokendontmatch';									
									sessionStorage.setItem('error', error);
							  </script>
									<div class='alert hide' id='alert_1'>
									<span class='fas fa-exclamation-circle'></span>
									<span class='msg'></span>
									<span class='close-btn' id='msg-btn-1'>
											<span class='fas fa-times'></span>
									</span>
								</div>";
					}
				}else if(isset($_SESSION["userid"])){
					header("location: ./session.php");
				}

			?>
						<div class="web-center-content">		
						<div class="form-overflow">
							<div class="login-container">	
								<div class="login-content">
									<div id="form-container" class="forms form1">
											<form id="form1" action="./DATABASE_HAND/reset-request.php" method="POST" novalidate>
												<div class="input-div">
													<div class="i"> 
														<i class="fas fa-envelope"></i>
													</div>
													<div class="div">
														<h5>Email</h5>
														<?php
															if(isset($_GET['email'])){
																$email = $_GET['email'];
																echo '<input type="text" id="email" class="input" name="email" value="'.$email.'">';
															} else{
																echo '<input type="text" id="email" class="input" name="email">';											
															}									
														?>						
														<small class="primary">Error message</small>					
													</div>					
												</div>												
												<input type="submit" name="reset_request_submit" id="login" class="btn2" value="Wyślij Email">
												<?php
													if(isset($_GET['reseterror'])){
														if($_GET["reseterror"] == "invalidemail"){
															echo "<script type='text/javascript'> 
															let form = 'reset_form';
															sessionStorage.setItem('form', form);									
															let error = 'invalidemail';									
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

<div id="footer" class="row justify-content-center">
	<div class="col-md-8 text-center">
		<h1>USŁUGI INFORMATYCZNE</h1>		
		<a class="btn btn-secondary btn-sm" href="VISIT_PAGE/index.html" target="_blank">STRONA BAZOWA</a>
	</div>
</div>

<script src="JS/jquery-3.3.1.min.js"></script>
<script src="bootstrap-4.5.3-dist/js/bootstrap.min.js"></script>
<script src="FORGOT_PASS_JS/app.js"></script>
</body>

</html>