function addScrollFun(obj,handle){
	var isFF = navigator.userAgent.indexOf("Firefox");
	if (isFF != -1) {
		obj.addEventListener("DOMMouseScroll",scrollFun,false);
	} else{
		obj.onmousewheel = scrollFun;
	}
	function scrollFun(event){
		var ev = event || window.event;
		var down;
		if (isFF != -1) {
			down = ev.detail > 0;
		} else{
			down = ev.wheelDelta < 0;
		}
		handle(down);
	}
}
