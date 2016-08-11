<?php
	$cb = $_GET["cb"];
	$url = $_GET["url"];
	require_once "jssdk.php";
	$jssdk = new JSSDK["wxf4fea5ca4039e0f2","eeb274a4b84f5c48d684511049af1750",$url];
	$signPackage = $jssdk->getSignPackage();
	$cb($signPackage);
?>