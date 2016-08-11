<?php 
	header("Content-Type:text/html;charset=utf-8");
	$name = $_POST["name"];
	$phone = $_POST["phone"];
	$time = date("Y-m-d H:i:s");

	// $con = mysql_connect("localhost","root","");
	$con = mysql_connect(SAE_MYSQL_HOST_M.':'.SAE_MYSQL_PORT,SAE_MYSQL_USER,SAE_MYSQL_PASS);
	if ($con) {
		// $se = mysql_select_db("bjh160303");
		$se = mysql_select_db(SAE_MYSQL_DB, $con);
		mysql_query("set names 'utf8'");
		if ($se) {
			mysql_query("INSERT INTO findxz (name,phone,time) VALUES ('$name','$phone','$time')");
		}
		$url = "http://snowlearnweixin.applinzi.com/findxz/game.html";
		echo "<script language='javascript' 
		type='text/javascript'>";  
		echo "window.location.href='$url'";  
		echo "</script>";
	}
 ?>