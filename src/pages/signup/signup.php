<?php
	//require('config.php');
	
	$servername = "localhost";
	$username = "gdittmer";
	$password = "Dittmer1996";
	$database = "onpoynt";
	
	// Create connection
	$conn = new mysqli($servername, $username, $password, $database);
	
	// Check on connection
	if($conn->connect_error){
		die("Connection failed: " . $conn->connect_error);
	}else{
		echo "Connected to server!";
	}
	
	$sql = "CREATE TABLE TestPersons (
						PersonID int,
						LastName varchar(255),
						FirstName varchar(255),
						Address varchar(255),
						City varchar(255) 
						)";
						
	if($conn->query($sql) == TRUE){
		echo "Table created successfully!";
	}else{
		echo "Error creating table: " . $conn->error;
	}

?>