<?php
	session_start();
?>
<!DOCTYPE html>
<html lang="pl">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge"/>
	<title>Strona Główna 2</title>
	<link rel="stylesheet" href="bootstrap-4.5.3-dist/css/bootstrap.min.css">
	<link rel="stylesheet" href="CSS/style.css">
	<link rel="stylesheet" href="CSS/fixed.css">
	<script src="https://kit.fontawesome.com/a81368914c.js"></script>
	<link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Lobster&family=Montserrat:wght@400;600&display=swap" 
	rel="stylesheet"
	/> 	 
</head>
<body>

<div class="web-content">

<nav class="navbar navbar-dark fixed-top">
	<h1 class="navbar-brand mx-auto">DRUKARKI</h1>
</nav>

<div class="video-background">
		<div class="video-wrap">
			<div id="video">
				<video id="bgvid" autoplay loop muted>
					<source src="VIDEO/Printer_Background_2.mp4" type="video/mp4">	
				</video>
			</div>
		</div>

<div class="web-center">	
	
			<?php			
				if(isset($_SESSION["userid"])){
					header("location: ./session.php");
				}
				if(isset($_GET['regerror'])){
					if($_GET["regerror"] == "none"){						
						echo "<script type='text/javascript'> 
									let form = 'reg_form';																
									sessionStorage.setItem('form', form);									
									let error = 'none';									
									sessionStorage.setItem('error', error);
							  </script>
									<div class='alert hide' id='alert_1'>
									<span class='fas fa-check-circle'></span>
									<span class='msg'></span>
									<span class='close-btn' id='msg-btn-1'>
											<span class='fas fa-times'></span>
									</span>
								</div>";
					}
				} 
				if(isset($_GET['regerror'])){
					if($_GET["regerror"] == "stmtfailed"){						
						echo "<script type='text/javascript'> 
									let form = 'reg_form';																
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
				}
				if(isset($_GET['reseterror'])){
					if($_GET["reseterror"] == "none"){						
						echo "<script type='text/javascript'> 
									let form = 'reset_form';																
									sessionStorage.setItem('form', form);									
									let error = 'none';									
									sessionStorage.setItem('error', error);
							</script>
									<div class='alert hide' id='alert_1'>
									<span class='fas fa-check-circle'></span>
									<span class='msg'></span>
									<span class='close-btn' id='msg-btn-1'>
											<span class='fas fa-times'></span>
									</span>
								</div>";
					}
				} 
				if(isset($_GET['resetstatus'])){
					if($_GET["resetstatus"] == "updated"){
						if(isset($_SESSION["userid"])){
							header("location: ./session.php?resetstatus=updated");
						}							
						echo "<script type='text/javascript'> 
									let form = 'reset_form';																
									sessionStorage.setItem('form', form);									
									let error = 'updated';									
									sessionStorage.setItem('error', error);
							</script>
									<div class='alert hide' id='alert_1'>
									<span class='fas fa-check-circle'></span>
									<span class='msg'></span>
									<span class='close-btn' id='msg-btn-1'>
											<span class='fas fa-times'></span>
									</span>
								</div>";
					}
				} 
				if(isset($_GET['verifyerror'])){
					if($_GET["verifyerror"] == "none"){						
						echo "<script type='text/javascript'> 
									let form = 'reg_form_verify';																
									sessionStorage.setItem('form', form);									
									let error = 'none';									
									sessionStorage.setItem('error', error);								
							</script>
									<div class='alert hide' id='alert_1'>
									<span class='fas fa-check-circle'></span>
									<span class='msg'></span>
									<span class='close-btn' id='msg-btn-1'>
											<span class='fas fa-times'></span>
									</span>
								</div>";
					}
					if($_GET["verifyerror"] == "accountvalidordoesntmatchvkey"){						
						echo "<script type='text/javascript'> 
									let form = 'reg_form_verify';																
									sessionStorage.setItem('form', form);									
									let error = 'accountvalidordoesntmatchvkey';									
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
					if($_GET["verifyerror"] == "emailsendfail"){						
						echo "<script type='text/javascript'> 
									let form = 'reg_form_verify';																
									sessionStorage.setItem('form', form);									
									let error = 'emailsendfail';									
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
					if($_GET["verifyerror"] == "verificationfailed"){						
						echo "<script type='text/javascript'> 
									let form = 'reg_form_verify';																
									sessionStorage.setItem('form', form);									
									let error = 'verificationfailed';									
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
				}								
			?>
			<div class="web-center-content">	
			<div class="caption">
				<h1>BAZA MODELI DRUKAREK</h1>	
				<a class="btn btn-outline-light btn-lg" href="#footer">PRZEJDŹ DO STRONY GŁÓWNEJ</a>
			</div>
			<div class="form-overflow">
			<div class="login-container">	
				<div class="button-box">
					<div id="btn" class="button-change"></div>
						<button type="button" class="toggle-btn" onclick="login()">LOGOWANIE</button>
						<button type="button" class="toggle-btn-2" onclick="register()">REJESTRACJA</button>
				</div>
				<div class="login-content">
					<div id="form-container" class="forms form1">
						<form id="form1" action="DATABASE_HAND/login.php" method="POST" novalidate>
							<div class="input-div">
								<div class="i">
										<i class="fas fa-user"></i>
								</div>
								<div class="div">
										<h5>Login</h5>
										<?php
										if(isset($_GET['login'])){
											$login = $_GET['login'];
											echo '<input type="text" id="login_value_1" class="input" name="login_1" value="'.$login.'">';
										} else{
											echo '<input type="text" id="login_value_1" class="input" name="login_1">';											
										}									
										?>																	
										<small>Error message</small>
										<small class="secondary" id="secondary-log"></small>										
								</div>
							</div>
							<div class="input-div">
								<div class="i"> 
									<i class="fas fa-lock"></i>
								</div>
								<div class="div">
									<h5>Hasło</h5>
									<?php
										if(isset($_GET['password'])){
											$password = $_GET['password'];
											echo '<input type="text" id="password_value_1" class="input" name="pass_1" value="'.$password.'">';
										} else{
											echo '<input type="password" id="password_value_1" class="input" name="pass_1">';											
										}									
									?>
									
									<small class="primary">Error message</small>	
									<div class="i-eye"> 
										<i class="fas fa-eye eye-toggle-1 eye"></i>
									</div>					
								</div>					
							</div>
							<div class="pass-forger-parent">
								<a class="pass-forget" href="reset-password.php">Nie możesz się zalogować?</a>
							</div>
							<input type="submit" name="submit_log" id="login" class="btn2" value="Zaloguj się">	
							
							<?php 
							if(isset($_GET['logerror'])){								
								if($_GET["logerror"] == "wrongloginpassword"){
									echo "<script type='text/javascript'> 
									let form = 'log_form';																
									sessionStorage.setItem('form', form);									
									let error = 'wrongloginpassword';									
									sessionStorage.setItem('error', error);
									</script>";
								} 
								if($_GET["logerror"] == "emptyinput"){
									echo "<script type='text/javascript'> 
									let form = 'log_form';																
									sessionStorage.setItem('form', form);									
									let error = 'emptyinput';									
									sessionStorage.setItem('error', error);
									</script>";
								} 
							}
							?>														
						</form>
					</div>
					
				<div id="form-container-2" class="forms form2">
					<form id="form2" action="DATABASE_HAND/signup.php" method="POST" novalidate>
						<div class="input-div">
							<div class="i">
									<i class="fas fa-user"></i>
							</div>
							<div class="div">
									<h5>Nazwa użytkownika</h5>
									<?php
										if(isset($_GET['name'])){
											$name = $_GET['name'];
											echo '<input type="text" id="nazwa_value_2" class="input" name="nazwa_2" maxlength="30" value="'.$name.'">';
										} else{
											echo '<input type="text" id="nazwa_value_2" class="input" name="nazwa_2" maxlength="30">';											
										}									
									?>									
									<small>Error message</small>
									<small class="secondary" id="secondary-reg"></small>	
							</div>
						</div>						
						<div class="input-div">
							<div class="i">
									<i class="fas fa-envelope"></i>
							</div>
							<div class="div">
									<h5>E-mail</h5>
									<?php
										if(isset($_GET['email_2'])){
											$email_2 = $_GET['email_2'];
											echo '<input type="email" id="email_value_2" class="input" name="email_2" value="'.$email_2.'">';
										} else{
											echo '<input type="email" id="email_value_2" class="input" name="email_2">';										
										}									
									?>										
									<small>Error message</small>
							</div>
						</div>
						<div class="input-div">
							<div class="i">
									<i class="fas fa-user"></i>
							</div>
							<div class="div">
									<h5>Login</h5>
									<?php
										if(isset($_GET['login_2'])){
											$login_2 = $_GET['login_2'];
											echo '<input type="text" id="login_value_2" class="input" name="login_2" maxlength="60" value="'.$login_2.'">';
										} else{
											echo '<input type="text" id="login_value_2" class="input" name="login_2" maxlength="60">';											
										}									
									?>										
									<small>Error message</small>
							</div>
						</div>
						<div class="input-div">
							<div class="i"> 
								<i class="fas fa-lock"></i>
							</div>
							<div class="div">
								<h5>Hasło</h5>
								<input type="password" id="password_value_2" class="input" name="pass_2" autocomplete="new-password">
								<small>Error message</small>
								<div class="i-eye"> 
									<i class="fas fa-eye eye-toggle-2 eye"></i>
								</div>
						</div>
						</div>
						<div class="input-div">
							<div class="i"> 
								<i class="fas fa-lock"></i>
							</div>
							<div class="div">
								<h5>Powtórz hasło</h5>
								<input type="password" id="password_value_2_repeat" class="input" name="pass_repeat_2" autocomplete="new-password">
								<small id="clear-pass-repeat">Error message</small>
								<div class="i-eye"> 
									<i class="fas fa-eye eye-toggle-3 eye"></i>
								</div>
						</div>
						</div>				
						<input type="submit" name="submit_reg" id="register" class="btn2 btn2-margin" value="Zajerestruj się">
						<?php 
							if(isset($_GET['regerror'])){
								if($_GET["regerror"] == "emptyinput"){
									echo "<script type='text/javascript'> 
									let form = 'reg_form';
									sessionStorage.setItem('form', form);									
									let error = 'emptyinput';									
									sessionStorage.setItem('error', error);
									</script>";
								}
								if($_GET["regerror"] == "invalidname"){
									echo "<script type='text/javascript'> 
									let form = 'reg_form';
									sessionStorage.setItem('form', form);									
									let error = 'invalidname';									
									sessionStorage.setItem('error', error);
									</script>";
								}
								if($_GET["regerror"] == "invalidlogin"){
									echo "<script type='text/javascript'> 
									let form = 'reg_form';
									sessionStorage.setItem('form', form);									
									let error = 'invalidlogin';									
									sessionStorage.setItem('error', error);
									</script>";
								}							
								if($_GET["regerror"] == "logintaken"){
									echo "<script type='text/javascript'> 
									let form = 'reg_form';
									sessionStorage.setItem('form', form);									
									let error = 'logintaken';									
									sessionStorage.setItem('error', error);
									</script>";
								}
								if($_GET["regerror"] == "emailtaken"){
									echo "<script type='text/javascript'> 
									let form = 'reg_form';
									sessionStorage.setItem('form', form);									
									let error = 'emailtaken';									
									sessionStorage.setItem('error', error);
									</script>";
								}
								if($_GET["regerror"] == "passwordsdontmatch"){
									echo "<script type='text/javascript'> 
									let form = 'reg_form';
									sessionStorage.setItem('form', form);									
									let error = 'passwordsdontmatch';									
									sessionStorage.setItem('error', error);
									</script>";
								}							
								if($_GET["regerror"] == "invalidemail"){
									echo "<script type='text/javascript'> 
									let form = 'reg_form';
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
</div>

<script src="JS/jquery-3.3.1.min.js"></script>
<script src="bootstrap-4.5.3-dist/js/bootstrap.min.js"></script>
<script src="JS/app.js"></script>
</body>

</html>