<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

if(isset($_POST['formData']['action'])){

    session_start();

    include_once 'db_hand.php';

    if ($_POST['formData']['action'] === 'search_bar') {

        $contentSearchNewCount = $_POST['formData']['contentSearchNewCount'];
        $contentSearchMoveCount = $_POST['formData']['contentSearchMoveCount'];


        if(isset($_POST['formData']['search_id'])){

            $search_id = mysqli_real_escape_string($conn, $_POST['formData']['search_id']);

            $sqlOvr = "SELECT * FROM drukarki WHERE id = $search_id ORDER BY data_utworzenia DESC";

            $resultOvr = mysqli_query($conn, $sqlOvr);
            $queryOvrResult = mysqli_num_rows($resultOvr);

            $sql = "SELECT * FROM drukarki WHERE id = $search_id ORDER BY data_utworzenia DESC LIMIT $contentSearchNewCount, $contentSearchMoveCount";

        }else if($_POST['formData']['search']){

            $search = mysqli_real_escape_string($conn, $_POST['formData']['search']);

            $sqlOvr = "SELECT * FROM drukarki WHERE model LIKE '%$search%' OR firma LIKE '%$search%' OR 
            rodzaj LIKE '%$search%' OR predkosc_wydruku LIKE '%$search%' OR pojemnosc LIKE '%$search%' ORDER BY data_utworzenia DESC";

            $resultOvr = mysqli_query($conn, $sqlOvr);
            $queryOvrResult = mysqli_num_rows($resultOvr);

            $sql = "SELECT * FROM drukarki WHERE model LIKE '%$search%' OR firma LIKE '%$search%' OR 
            rodzaj LIKE '%$search%' OR predkosc_wydruku LIKE '%$search%' OR pojemnosc LIKE '%$search%' ORDER BY data_utworzenia DESC LIMIT $contentSearchNewCount, $contentSearchMoveCount";
        }

        $result = mysqli_query($conn, $sql);
        $queryResult = mysqli_num_rows($result);
        
        echo "
                    <div class='accordion-buttons'> 

                        <button id='rewind-search-content' class='scroll-content scroll-backwards'><span>Cofnij</span></button>
                        <button id='see-more-search-content' class='scroll-content scroll-forward'><span>Zobacz więcej</span></button>

                    </div>
        ";

        if($queryResult > 0){

                $currentIteration = $contentSearchNewCount+$contentSearchMoveCount;
                
                if($currentIteration > $queryOvrResult){
                    echo "<span class='query-result'>Znalezione elementy : &nbsp; ".$queryOvrResult." z ".$queryOvrResult."</span>";
                }else{
                    echo "<span class='query-result'>Znalezione elementy : &nbsp; ".$currentIteration." z ".$queryOvrResult."</span>";
                }

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
            echo "
            <div class='no-records-result-wrap'>
                <span class='no-records-result'>Nie znaleziono rekordów</span>
            </div>
            ";
        }
    }

}

///One way of receiving data

/*
function isValidJSON($str) {
    json_decode($str);
    return json_last_error() == JSON_ERROR_NONE;
}
 
$json_params = file_get_contents("php://input");

if (strlen($json_params) > 0 && isValidJSON($json_params)){

    $decoded_params = json_decode($json_params, true);
    $_POST = $decoded_params;

    if(isset($_POST['action'])){

        if($_POST['action'] === "instant_search"){

            //Sztuczne opóźnienie        
            function m_sleep($milliseconds) {
                return usleep($milliseconds * 1000); // Microseconds->milliseconds
            }
    
            m_sleep(700);
    
            include_once 'db_hand.php';
    
            $search = mysqli_real_escape_string($conn, $_POST['search']);
    
            $sql = "SELECT id, model, firma, rodzaj FROM drukarki WHERE model LIKE '%$search%' OR firma LIKE '%$search%' OR 
            rodzaj LIKE '%$search%' OR predkosc_wydruku LIKE '%$search%' OR pojemnosc LIKE '%$search%' ORDER BY data_utworzenia DESC LIMIT 5";
    
            $result = mysqli_query($conn, $sql);
            $resultArray = [];
            
            $row = mysqli_fetch_all($result);
    
            $resultArray = array_map(function($row){
                return $row;
            }, $row);
    
            if(count($resultArray) === 0){
                $resultArray = [];
            }
    
            $instantSearchResult = [
                "time" => gmdate(DATE_ISO8601),
                "query" => $search,
                "results" => $resultArray
            ];
            
            echo json_encode($instantSearchResult);
    
        }

    }    
    
}
*/

if(isset($_POST['action'])){

    if($_POST['action'] === "instant_search"){

        //Sztuczne opóźnienie        
        function m_sleep($milliseconds) {
            return usleep($milliseconds * 1000); // Microseconds->milliseconds
        }

        m_sleep(700);

        include_once 'db_hand.php';

        $search = mysqli_real_escape_string($conn, $_POST['search']);

        $sql = "SELECT id, model, firma, rodzaj FROM drukarki WHERE model LIKE '%$search%' OR firma LIKE '%$search%' OR 
        rodzaj LIKE '%$search%' OR predkosc_wydruku LIKE '%$search%' OR pojemnosc LIKE '%$search%' ORDER BY data_utworzenia DESC LIMIT 5";

        $result = mysqli_query($conn, $sql);
        $resultArray = [];
        
        $row = mysqli_fetch_all($result);

        $resultArray = array_map(function($row){
            return $row;
        }, $row);

        if(count($resultArray) === 0){
            $resultArray = [];
        }

        $instantSearchResult = [
            "time" => gmdate(DATE_ISO8601),
            "query" => $search,
            "results" => $resultArray
        ];
        
        echo json_encode($instantSearchResult);

    }

}

}













