<?php
    include_once 'FILE_END/header.php';
    include_once 'DATABASE_HAND/db_hand.php';
?>


<div class="background">
			<div class="wrap">
            
<div class="active-popup">              
    <div class="popup-container">
        <div class="popup-window">
            <div class="modal-popup-content">
                <i class="fas fa-exclamation"></i>
                <h1>Czy potwierdzasz wprowadzenie zmian?</h1>
                <div class="popup-data">
                    
                </div>
                <div class="popup-window-btns">
                    <button type="button" id="popup-no" class="popup-window-btn popup-window-btn-decline">Nie</button>
                    <button type="submit" id="popup-yes" class="popup-window-btn popup-window-btn-accept">Tak</button>
                </div>   
            </div>
        </div>
    </div>
</div>

				<div id="bg"></div>
</div>

<div class="web-center">

    <div class='content-alert hide-content-alert' id='content-alert'>
        <span id='main-icon'></span>
        <span class='msg'></span>
        <div class='content-alert-read-more hide-content-alert-read-more'>
            <div class='read-more-wrap'>
                <span id='see-more'>Zobacz więcej</span>
                <i id='main-caret' class="fas fa-caret-down"></i>
            </div>
        </div>          
        <div class='msg-content-container'>
            <span class='msg-content'></span>
        </div>
        <span class='close-btn' id='content-msg-btn'>
                <span class='fas fa-times'></span>
        </span>
    </div>

<div class="web-center-content">

    <div class="title navbar-brand">
        <h1 class="drukarki-title">Drukarki</h1>
    </div>

					<nav class="drop hide" id="drop-1">							
								<ul>									
									<li class="profile"><a href="profile">Profil</a></li>
									<li><a href="information">Informacje</a></li>
									<li class="logout"><a href="DATABASE_HAND/logout">Wyloguj się</a></li>
								</ul>							
					</nav>

    <div class="data-pad">

        <div class="home-link-wrap">
            <a href="./" class="fas fa-home"></a>
        </div>

        <div id="searchContent" class="search-wrap">
			<div class="search-box">
                <form id="search-form" action="DATABASE_HAND/search.php" method="POST">
                    <input type="text" id="search-input" class="search-input" name="search" spellcheck="false" placeholder="Szukaj">
                    <div class="search-btn">
                        <button type="submit" class="fas fa-search" name="submit-search"></button>
                    </div>
                </form>
			</div>

		</div>

        <section>

            <div class="data-container" id="main-container">  

                <div class="accordion-buttons"> 

                    <button id="rewind-content" class="scroll-content scroll-backwards"><span>Cofnij</span></button>
                    <button id="see-more-content" class="scroll-content scroll-forward"><span>Zobacz więcej</span></button>          

                </div>
               
                <?php

                    $sql = "SELECT * FROM drukarki ORDER BY data_utworzenia DESC LIMIT 0, 5";
                    $result = mysqli_query($conn, $sql);

                    if(mysqli_num_rows($result) > 0){ 

                        while($row = mysqli_fetch_assoc($result)){

                            echo"

                                <div class='accordion'>
                                    <form id=".$row['id']." action='DATABASE_HAND/accordion-process' method='POST'>
                                    <div class='accordion-item'>
                                        <a class='accordion-link'>
                                            <input type='text' class='accordion-content-title' name='model' readonly='readonly' spellcheck='false' value=".$row['model'].">
                                            <input type='hidden' name='content_id' value=".$row['id'].">
                                            <input type='hidden' name='csrfToken' value=".$_SESSION['csrfToken'].">
                                            <i class='fas fa-plus'></i>
                                        </a>
                                        <div class='answer-parent'>
                                            <div class='answer'>
                                                <table>                                                    
                                                        <tr>
                                                            <th>
                                                                <p>
                                                                    Firma
                                                                </p>
                                                            </th>
                                                            <td>
                                                                <p>
                                                                    <textarea rows='1' class='autoresizing-accordion-content' name='firma' readonly='readonly' spellcheck='false'>".$row['firma']."</textarea>                                                     
                                                                </p>
                                                            </td>
                                                        </tr> 
                                                        <tr>
                                                            <th>
                                                                <p>
                                                                    Rodzaj
                                                                </p>
                                                            </th>
                                                            <td>
                                                                <p>
                                                                    <textarea rows='1' class='autoresizing-accordion-content' name='rodzaj' readonly='readonly' spellcheck='false'>".$row['rodzaj']."</textarea>                                                            
                                                                </p>
                                                            </td>
                                                        </tr> 
                                                        <tr>
                                                            <th>
                                                                <p>
                                                                    Prędkość wydruku
                                                                </p>
                                                            </th>
                                                            <td>
                                                                <p>
                                                                    <textarea rows='1' class='autoresizing-accordion-content' name='predkosc_wydruku' readonly='readonly' spellcheck='false'>".$row['predkosc_wydruku']."</textarea>                                                            
                                                                </p>
                                                            </td>
                                                        </tr> 
                                                        <tr>
                                                            <th>
                                                                <p>
                                                                    Pojemność
                                                                </p>
                                                            </th>
                                                            <td>
                                                                <p>
                                                                    <textarea rows='1' class='autoresizing-accordion-content' name='pojemnosc' readonly='readonly' spellcheck='false'>".$row['pojemnosc']."</textarea>                                                            
                                                                </p>
                                                            </td>
                                                        </tr> 
                                                </table>                                         
                                            </div>
                                            <button type='button' class='fas fa-check confirm-accordion-content'></button>
                                            <button type='button' class='far fa-edit edit-accordion-content'></button>
                                            <button type='button' class='far fa-trash-alt delete-accordion-content'></button>
                                        </div>
                                    </div>
                                </form>
                                </div>                            
                            ";
                        }

                    } else {
                        echo "<div class='accordion-buttons'> 

                                <button id='rewind-content' class='scroll-content scroll-backwards'><span>Cofnij</span></button>
                                <button id='see-more-content' class='scroll-content scroll-forward'><span>Zobacz więcej</span></button>          
        
                            </div>
        
                            <p class='out-of-records'> Brak kolejnych rekordów </p>";
                    }
                
                ?>

            </div>

        </section>
      
            
        </div>

    </div>

<script src="./DATABASE_JS/custom.js"></script>
<script src="./DATABASE_JS/instant-search.js" type="module"></script>

<?php
    include_once 'FILE_END/footer.php';
?>