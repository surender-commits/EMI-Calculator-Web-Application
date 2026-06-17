<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

  if ((isset($_POST['name']) && $_POST['name'] != '') && (isset($_POST['email']) && $_POST['email'] != '') && (isset($_POST['sub']) && $_POST['sub'] != '') && (isset($_POST['msg']) && $_POST['msg'] != '')) {

    $name = $_POST['name'];
    $email = $_POST['email'];
    $sub = $_POST['sub'];
    $msg = $_POST['msg'];

    $ip = $_SERVER['REMOTE_ADDR'];

    if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {

      $ip = explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']);
      $ip = trim($ip[0]);
    }

    require_once("db-config.php");

    $db_name = $conn->real_escape_string($name);
    $db_email = $conn->real_escape_string($email);
    $db_sub = $conn->real_escape_string($sub);
    $db_msg = $conn->real_escape_string($msg);

    $sql = "INSERT INTO $tableName ($tableRows) VALUES ('" . $name . "','" . $email . "', '" . $sub . "', '" . $msg . "', '" . $ip . "')";

    if (!$result = $conn->query($sql)) {

      die('There was an error running the query [' . $conn->error . ']');
    } else {

      echo "Thank you! We will contact you soon";
          
    }
  } else {

    echo "error";
  }
}
