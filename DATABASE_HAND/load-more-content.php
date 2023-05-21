<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

        session_start();

        include_once 'db_hand.php';

        $contentNewCount = $_POST['contentNewCount'];
        $contentMoveCount = $_POST['contentMoveCount'];

        $sql = "SELECT * FROM drukarki ORDER BY data_utworzenia DESC LIMIT $contentNewCount, $contentMoveCount";
        $result = mysqli_query($conn, $sql);

        if(mysqli_num_rows($result) > 0){

            echo "

                <div class='accordion-buttons'> 

                    <button id='rewind-content' class='scroll-content scroll-backwards'><span>Cofnij</span></button>
                    <button id='see-more-content' class='scroll-content scroll-forward'><span>Zobacz więcej</span></button>          

                </div>

            ";
                                
            while($row = mysqli_fetch_assoc($result)){

                echo"

                                <div class='accordion'>
                                    <form id=".$row['id']." action='DATABASE_HAND/accordion-process.php' method='POST'>
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

        } else{
            
            echo"

            <div class='accordion-buttons'> 

                <button id='rewind-content' class='scroll-content scroll-backwards'><span>Cofnij</span></button>
                <button id='see-more-content' class='scroll-content scroll-forward'><span>Zobacz więcej</span></button>          

            </div>

            <p class='out-of-records'> Brak kolejnych rekordów </p>
                    
            ";

           
        }

}else {
    echo "Access denied";
}
    
?>