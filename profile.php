<?php
    include_once 'FILE_END/header.php';
?>

<div class="background">
			<div class="wrap">
				<div id="bg"></div>
            </div>	

<div class="web-center">

        <?php

        if(isset($_GET['updaterror'])){
            if($_GET["updaterror"] == "timexpired"){						
                echo "<script type='text/javascript'> 
                            let form = 'update_form';																
                            sessionStorage.setItem('form', form);									
                            let error = 'timexpired';
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
        if(isset($_GET['updatestatus'])){
            if($_GET["updatestatus"] == "updated"){						
                echo "<script type='text/javascript'> 
                            let form = 'update_form';																
                            sessionStorage.setItem('form', form);									
                            let error = 'updated';									
                            sessionStorage.setItem('error', error);
                    </script>
                            <div class='alert hide-alert' id='alert_1'>
                            <span class='fas fa-check-circle'></span>
                            <span class='msg'></span>
                            <span class='close-btn' id='msg-btn-1'>
                                    <span class='fas fa-times'></span>
                            </span>
                        </div>";
            }
        }
        if(isset($_GET['profilerror'])){
            if($_GET["profilerror"] == "stmtfailed"){						
                echo "<script type='text/javascript'> 
                            let form = 'profile_form';																
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


<div class="web-center-content">

					<nav class="drop hide" id="drop-1">							
								<ul>									
									<li class="profile"><a href="session">Drukarki</a></li>
									<li><a href="information">Informacje</a></li>
									<li class="logout"><a href="DATABASE_HAND/logout">Wyloguj się</a></li>
								</ul>							
					</nav>

<div class="update-form-parent">   
    <div class="update-form">
    <h3>Dane użytkownika</h3>
        <form id="update-form" action="confirm.php?entry=profileupdate" method="POST">
            <?php

                require_once 'DATABASE_HAND/db_hand.php';

                $currentUser = $_SESSION["userid"];

                $sql = "SELECT * FROM uzytkownicy WHERE id=?";

                $stmt = mysqli_stmt_init($conn);

                if(!mysqli_stmt_prepare($stmt, $sql)){
                    echo "<script type='text/javascript'>
                        let action = 'profile_attempt';															
                        sessionStorage.setItem('action', action);
                        window.location.href = './session.php?profilerror=stmtfailed';
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
                <div>
                <input type="text" name="Name" class="form-control" readonly="readonly" value="<?php echo $UserInfo['nazwa']; ?>">
                <small class="secondary" id="secondary-update"></small>
                </div>
            </div>
            <div class="form-group">
                <label>Adres E-mail</label>
                <div>
                <input type="email" name="Email" class="form-control" readonly="readonly" value="<?php echo $UserInfo['email']; ?>">
                </div>
            </div>
            <div class="form-group">
                <label>Login</label>
                <div>
                <input type="password" name="Login" class="form-control" readonly="readonly" value="111111111">
                </div>
            </div>
            <div class="form-group">
                <label>Hasło</label>
                <div>
                <input type="password" name="Password" class="form-control" readonly="readonly" value="111111111" autocomplete="new-password">
                </div>
            </div>
            <div class="form-group">
                <input type="submit" name="updateProfile" class="btn btn-info" value="Zaaktualizuj dane">
            </div>
        </form>
    </div>
</div>


<?php
    include_once 'FILE_END/footer.php';
?>