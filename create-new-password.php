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

<?php

		$selector = $_GET['selector'];
    	$validator = $_GET['validator'];

        if(empty($selector) || empty($validator)){ 
			header("location: ./reset-password.php?reseterror=stmtfailed");            
        } else{
            if(ctype_xdigit($selector) !== false && ctype_xdigit($validator) !== false){
                
?>

<div class="background">
			<div class="wrap">
				<div id="bg"></div>
            </div>

<div class="web-center">					
	    
			<?php
				if(isset($_GET['reseterror'])){
					if($_GET["reseterror"] == "stmtfailed"){						
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
				} 

			?>				
				<div class="web-center-content">	
						<div class="form-overflow">
							<div class="login-container">	
								<div class="login-content">
									<div id="form-container" class="forms form1">
											<form id="form-reset" action="./DATABASE_HAND/reset-password.inc.php" method="POST" novalidate>
                                                <input type="hidden" name="selector" value="<?php echo $selector; ?>">
                                                <input type="hidden" name="validator" value="<?php echo $validator; ?>">
                                                <div class="input-div">
                                                    <div class="i"> 
                                                        <i class="fas fa-lock"></i>
                                                    </div>
                                                    <div class="div">
                                                        <h5>Wpisz nowe hasło</h5>
                                                        <input type="password" id="password_value_2" class="input" name="pass_2" autocomplete="new-password">
                                                        <small>Error message</small>
														<small id="secondary"></small>	
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
                                                        <h5>Powtórz nowe hasło</h5>
                                                        <input type="password" id="password_value_2_repeat" class="input" name="pass_repeat_2" autocomplete="new-password">
                                                        <small>Error message</small>														
                                                        <div class="i-eye"> 
                                                            <i class="fas fa-eye eye-toggle-3 eye"></i>
                                                        </div>
                                                	</div>
                                                </div>												
												<input type="submit" name="reset_password_submit" id="login" class="btn2" value="Zresetuj hasło">
												<?php
													if(isset($_GET['reseterror'])){
														if($_GET["reseterror"] == "emptyinput"){
															echo "<script type='text/javascript'> 
															let form = 'reset_form';
															sessionStorage.setItem('form', form);									
															let error = 'emptyinput';									
															sessionStorage.setItem('error', error);
															</script>";
														}
													}
													if(isset($_GET['reseterror'])){
														if($_GET["reseterror"] == "passwordsdontmatch"){
															echo "<script type='text/javascript'> 
															let form = 'reset_form';
															sessionStorage.setItem('form', form);									
															let error = 'passwordsdontmatch';									
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

<?php
    } 
	else{
		header("location: ./reset-password.php?reseterror=stmtfailed");   
	} 
}         
?>

<div id="footer" class="row justify-content-center">
	<div class="col-md-8 text-center">
		<h1>USŁUGI INFORMATYCZNE</h1>		
		<a class="btn btn-secondary btn-sm" href="VISIT_PAGE/index.html" target="_blank">STRONA BAZOWA</a>
	</div>
</div>

<script src="JS/jquery-3.3.1.min.js"></script>
<script src="bootstrap-4.5.3-dist/js/bootstrap.min.js"></script>
<script src="FORGOT_PASS_JS/app_2.js"></script>
</body>

</html>