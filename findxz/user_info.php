<?php
	function httpGet($url) {
	    $curl = curl_init();
	    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
	    curl_setopt($curl, CURLOPT_TIMEOUT, 500);
	    // 为保证第三方服务器与微信服务器之间数据传输的安全性，所有微信接口采用https方式调用，必须使用下面2行代码打开ssl安全校验。
	    // 如果在部署过程中代码在此处验证失败，请到 http://curl.haxx.se/ca/cacert.pem 下载新的证书判别文件。
	    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, true);
	    curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, true);
	    curl_setopt($curl, CURLOPT_URL, $url);
	
	    $res = curl_exec($curl);
	    curl_close($curl);
	
	    return $res;
	}
	
	mysql_connect("127.0.0.1","root","");
	mysql_select_db("bjh160303");
	
	function getuser_access_token(){
		$code = $_GET["code"];
		$appID = "wxf4fea5ca4039e0f2";
		$appsecret ="eeb274a4b84f5c48d684511049af1750";
		$accessTokenAPI = "https://api.weixin.qq.com/sns/oauth2/access_token?appid={$appID}&secret={$appsecret}&code={$code}&grant_type=authorization_code"; 
		$rs = httpGet($accessTokenAPI);
		// 把获取到json串转化为 php对象
		$array1 = json_decode($rs,true);		         
		$token = $array1["access_token"];
		$openID = $array1["openid"];
		
		return array("token"=>$token,"openID"=>$openID);;
	}
		$rsaArray = getuser_access_token();
	
		$access_token = $rsaArray["token"];
	//	echo $access_token;
		$openID = $rsaArray["openID"];
		// 第三步：拉取用户信息
	$userAPI = "https://api.weixin.qq.com/sns/userinfo?access_token={$access_token}&openid={$openID}&lang=zh_CN";
	$rsB = httpGet($userAPI);
	
	$rsBArray = json_decode($rsB,true);

	$userName = $rsBArray["nickname"];
	$head = $rsBArray["headimgurl"];
	
	// 把用户数据保存下来
	
	$sql1 = "SELECT *FROM user_ranking WHERE user_name='$userName'";
	$findrsResult = mysql_query($sql1);
	if (mysql_num_rows($findrsResult) > 0){
		$row = mysql_fetch_array($findrsResult);
		$score = $row["user_score"];
		$score += 100;
        mysql_query("UPDATE user_ranking SET user_score='$score' WHERE user_name='$userName'");
	}else{
		$insertSQL = "INSERT INTO user_ranking (user_name,user_header,user_score) VALUES('$userName','$head',100)";
		mysql_query($insertSQL);
	}

	// 查询当前所有分享过的用户
	$sql2 = "SELECT *FROM user_ranking ORDER BY user_score DESC";
	$allUserInfo = mysql_query($sql2);
	$userArray = array();
	while ($row = mysql_fetch_assoc($allUserInfo)) {
		$userArray[] = $row;
	}
	
	
?>
  