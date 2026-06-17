<?php

$host = "localhost";
$userName = "u485154668_emiCountDbUser";
$password = "[GoT5hA2";
$dbName = "u485154668_emiCountDb";
$tableName = "contactdb";
$tableRows = "name ,email ,sub ,msg ,ip";

// Create database connection
$conn = new mysqli($host, $userName, $password, $dbName);

// Check connection
if ($conn->connect_error) {

    die("Connection failed: " . $conn->connect_error);
}
