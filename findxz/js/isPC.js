
//设备类型判断
function IsPC() {
	//判断浏览器信息
	var userAgentInfo = navigator.userAgent;
	var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
	var flag = true;
	for (var v = 0; v < Agents.length; v++) {
		if (userAgentInfo.indexOf(Agents[v]) > 0) {
		flag = false;
		break;
		}
	}
	return flag;
}
//判断设备类型
IsPC();
if (IsPC()) {
	$(".backg").width(375);
	$(".backg").height(667);
}else{
	$(".backg").width(document.documentElement.clientWidth);
	$(".backg").height(document.documentElement.clientHeight);
}