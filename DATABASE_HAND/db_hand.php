<?php

$serverName = "localhost";
$dBUsername = "user";
$dBPassword = "";
$dBName = "baza_drukarek";

$conn = mysqli_connect($serverName, $dBUsername, $dBPassword, $dBName);

if(!$conn){
    die("Connection failed: " . mysqli_connect_error());
}

