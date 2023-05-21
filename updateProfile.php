<?php
    include_once 'FILE_END/header.php';
?>

<div class="background">
			<div class="wrap">  

            <div class="cover-popup-box hide-popup-box" id="popup-box-cover-1">

            </div>
				<div id="bg"></div>
</div>	

<div class="web-center">

<?php

	if(isset($_SESSION["userid"]) && isset($_SESSION["dataChange"])){
        
        if(time() - $_SESSION["dataChange"] > 300){   
            unset($_SESSION["dataChange"]); 
            echo "<script type='text/javascript'> 
            let action = 'another_update';															
            sessionStorage.setItem('action', action);
            window.location='./profile.php?updaterror=timexpired';
            </script>";          
            exit();
        }        

        if(isset($_GET['updaterror'])){
            if($_GET["updaterror"] == "stmtfailed"){						
                echo "<script type='text/javascript'> 
                            let form = 'update_form';																
                            sessionStorage.setItem('form', form);									
                            let error = 'stmtfailed';									
                            sessionStorage.setItem('error', error);
                      </script>
                            <div class='alert hide-alert' id='alert_1'>
                            <span class='fas fa-exclamation-circle'></span>
                            <span class='msg'></span>
                            <span class='close-btn' id='msg-btn-1'>
                                    <span class='fas fa-times'></span>
                            </span>
                        </div>";
            }
        }
        
?>
                <div class="popup-box hide-popup-box" id="popup-box-1">
                        <i class="fas fa-exclamation"></i>
                        <h1>Czy potwierdzasz wprowadzenie zmian?</h1>
                        <div class="data">
                        </div>
                    <div class="btns">
                        <button type="button" class="btn1-confirm" id="no-1">Nie</button>
                        <button type="submit" name="accountUpdate" class="btn2-confirm" id="yes-1">Tak</button>
                    </div>      
                </div>


<div class="web-center-content">

					<nav class="drop hide" id="drop-1">							
								<ul>									
									<li class="profile"><a href="profile">Profil</a></li>
                                    <li><a href="session">Drukarki</a></li>
									<li><a href="information">Informacje</a></li>
									<li class="logout"><a href="DATABASE_HAND/logout">Wyloguj się</a></li>
								</ul>							
					</nav>
                    
<div class="update-form-parent">
    <div class="update-form">
    <h3>Dane użytkownika</h3>
        <form id="update-form" action="DATABASE_HAND/accountModify.php" method="POST">
            <input type="hidden" name="csrfToken" value="<?php echo $_SESSION['csrfToken']; ?>">
            <?php

                require_once 'DATABASE_HAND/db_hand.php';

                $currentUser = $_SESSION["userid"];

                $sql = "SELECT * FROM uzytkownicy WHERE id=?";

                $stmt = mysqli_stmt_init($conn);

                if(!mysqli_stmt_prepare($stmt, $sql)){
                    echo "<script type='text/javascript'> 
                        let action = 'profile_attempt';															
                        sessionStorage.setItem('action', action);
                        window.location.href = './profile.php?profilerror=stmtfailed';
                    </script>";
                    exit();
                }else{
                    mysqli_stmt_bind_param($stmt, "s", $currentUser);
                    mysqli_stmt_execute($stmt);                    
                }

                $resultData = mysqli_stmt_get_result($stmt);

                if($row = mysqli_fetch_assoc($resultData)){
                    $UserInfo = $row;                                
                }  

                mysqli_stmt_close($stmt);
                mysqli_close($conn);

            ?>
            <div class="form-group">
                <label>Nazwa</label>
                <div class="div">
                <?php
                    if(isset($_GET['name'])){
                        $nazwa = $_GET['name'];
                        echo '<input type="text" name="name" maxlength="30" class="form-control" id="name_value" readonly="readonly" value="'.$nazwa.'">';
                    } else{
                        echo '<input type="text" name="name" maxlength="30" class="form-control" id="name_value" readonly="readonly" value="'.$UserInfo['nazwa'].'">';											
                    }									
                    ?>                   
                    <small class="update-error"></small> 
                    <small class="secondary" id="secondary-update"></small> 
                </div>
                <div class="btn-edit">Zmień</div> 
            </div>
            <div class="form-group">
                <label>Login</label>
                <div class="div">
                <?php
                    if(isset($_GET['login'])){
                        $login = $_GET['login'];
                        echo '<input type="text" name="login" class="form-control" id="login_value" readonly="readonly" value="'.$login.'">';
                    } else{
                        echo '<input type="text" name="login" class="form-control" id="login_value" readonly="readonly" value="'.$UserInfo['login'].'">';											
                    }									
                    ?>                   
                    <small class="update-error"></small>  
                </div>
                <div class="btn-edit">Zmień</div>
            </div>
            <div class="form-group">
                <label>Nowe hasło</label>
                <div class="div">
                    <input type="password" name="password" class="form-control" id="password_value" autocomplete="new-password">
                    <small class="update-error"></small> 
                </div>
                <div class="i-eye-update"> 
                    <i class="fas fa-eye eye-toggle-1 eye"></i>
                </div>
            </div>
            <div class="form-group">
                <label>Powtórz nowe hasło</label>
                <div class="div">
                    <input type="password" name="password_repeat" class="form-control" id="password_value_repeat">
                    <small class="update-error"></small> 
                </div>
                <div class="i-eye-update"> 
                    <i class="fas fa-eye eye-toggle-2 eye"></i>
                </div>
            </div>
            <div class="form-group">
                <button class="btn btn-info" id="validate-update-btn">Potwierdź zmiany</button>
            </div>
            <?php

                if(isset($_GET['updaterror'])){
                    if($_GET["updaterror"] == "passwordsdontmatch"){						
                        echo "<script type='text/javascript'> 
									let form = 'update_form';
									sessionStorage.setItem('form', form);									
									let error = 'passwordsdontmatch';									
									sessionStorage.setItem('error', error);
							   </script>";
                    }
                    if($_GET["updaterror"] == "emptyinput"){						
                        echo "<script type='text/javascript'> 
									let form = 'update_form';
									sessionStorage.setItem('form', form);									
									let error = 'emptyinput';									
									sessionStorage.setItem('error', error);
							   </script>";
                    }
                    if($_GET["updaterror"] == "invalidname"){						
                        echo "<script type='text/javascript'> 
									let form = 'update_form';
									sessionStorage.setItem('form', form);									
									let error = 'invalidname';									
									sessionStorage.setItem('error', error);
							   </script>";
                    }
                    if($_GET["updaterror"] == "invalidlogin"){						
                        echo "<script type='text/javascript'> 
									let form = 'update_form';
									sessionStorage.setItem('form', form);									
									let error = 'invalidlogin';									
									sessionStorage.setItem('error', error);
							   </script>";
                    }
                    if($_GET["updaterror"] == "logintaken"){						
                        echo "<script type='text/javascript'> 
									let form = 'update_form';
									sessionStorage.setItem('form', form);									
									let error = 'logintaken';									
									sessionStorage.setItem('error', error);
							   </script>";
                    }
                }

            ?>
        </form>
    </div>
</div>

<?php

} else {
		header("location: ./profile.php");
}


    include_once 'FILE_END/footer.php';
?>