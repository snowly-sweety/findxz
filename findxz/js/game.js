
var gameTitle = document.querySelector(".game_title img");
var musicOn = document.querySelector(".on");
var musicOff = document.querySelector(".off");
var bgMus = document.querySelector(".bg_mus");
var centerWrap = document.querySelector(".center_wrap");
var gameWrap = document.querySelector(".game_wrap");
var gameImages = document.querySelector(".game_images");
var center = document.querySelector(".center");
var time = document.querySelector(".time");
var showImg = document.querySelector(".show_img");
var showImgs = document.querySelectorAll(".show_img img");
var imgDivs = document.getElementsByClassName("one");
var setTime = document.querySelector(".set_time");
var getShow = document.querySelector(".get_phone");
var centerImg = document.querySelector(".get_img");
var getImg = document.querySelectorAll(".get_img img");
var getWord = document.querySelector(".get_word");
var tipWord = document.querySelector(".tip_word");
var btnOne = document.querySelector(".btnOne");
var btnTwo = document.querySelector(".btnTwo");
var gameTrans = document.querySelector(".game_trans");
var gameCon = document.querySelector(".game_content");
var block = document.querySelector(".block");
var line = document.querySelector(".line");
var gameWrapper = document.querySelector(".game_wrapper");
var close = document.querySelector(".close");
var end = document.querySelector(".end");
var gameover = document.querySelector(".gameover");
var gift = document.querySelector(".gift");
var retrunGame = document.querySelector(".return_game");
var giftGet = document.querySelector(".gift_get");
var prizeType = document.querySelector(".prize_type");
var submitName = document.querySelector(".name");
var submitPhone = document.querySelector(".phone");
var formSubmit = document.getElementById("formSubmit");
var submitBtn = document.querySelector(".submit_btn");
var loadingWrap = document.querySelector(".loading_wrap");
var countdownNum = 60.00;
var countdownTimer = null;
var imgX = null;
var count = 1;
var bool = true;
var boolT = false;
var timer = null;
var prizeArray = ["港囧电影票一套","vivo充电宝一个","vivo耳机一个","徐峥或赵薇签名照一张"];

// 预加载
window.onload = function(){
	function preLoadImagesFun(obj,callBack){
		var didLoaded = 0;
		var needLoad = obj.length;
		var imagesArray = [];
		for(var i = 0; i < needLoad;i ++){
			imagesArray[i] = new Image();
			imagesArray[i].src = obj[i];
			imagesArray[i].onload = loadFun;
		}
		
		function loadFun(){
			didLoaded++;
			if (didLoaded >= needLoad) {
				callBack();
			};
		}
	}
	var preImgs = ["img/bg.jpg","img/ding.png","img/bg-2.png","img/game_trans.png","img/music_on.png","img/off.png","img/xingxing.png","img/sanjiao.png","img/duodian.png","img/tan1.png","img/tan2.png","img/tan3.png","img/tan4.png","img/tan5.png","img/tan6.png","img/tan7.png","img/tan8.png","img/end7.png","img/end8.png","img/end6.png","img/end3.png","img/end4.png","img/end1.png","img/end2.png","img/end5.png","img/chip5.png","img/guanbi.png","img/jiqiren.png","img/返回游戏.png","img/kong.png","img/xuzheng_succ_kuang.png","img/game_title1.png","img/game_title2.png","img/game_title3.png","img/game_title4.png","img/game_title5.png","img/game_title6.png","img/game_title7.png","img/game_title8.png","img/dingbu.png","img/baobei.png","img/guang.png","img/yanjing.png","img/end_phone.png","img/end-img.png"];

	preLoadImagesFun(preImgs,function(){
		loadingWrap.style.display = "none";
		gameWrap.style.display = "block";
		gameImages.style.display = "block";
		init();
	});

}

//背景音乐
function musicFun(){
	musicOn.onclick = function(){
		musicOn.style.display = "none";
		musicOff.style.display = "block";
		bgMus.pause();
		setTime.pause();
	}
	musicOff.onclick = function(){
		musicOff.style.display = "none";
		musicOn.style.display = "block";
		bgMus.play();
		setTime.play();
	}
}

//随机数
function randomNum(n,m){
	return parseInt(Math.random()*(m-n)+n);
}

//游戏倒计时
function gameTime() {
	setTime.play();
	countdownTimer = setInterval(function (){
		//定义一个时间减量
		countdownNum -= 0.01;
		//保留两位小数点，注意：此处必须定义一个新变量，否则为NaN
		var newCountdownNum = countdownNum.toFixed(2);
		//将"."通过replace的方法替换为":"
		newCountdownNum = newCountdownNum.replace(".",":");
		if (countdownNum <= 0){
			clearInterval(countdownTimer);
			setTime.pause();
			images("lose","img/lose.png",gameover);
			images("again","img/再试一次.png",gameover);
			images("gameText","img/游戏说明.png",gameover);
			end.style.display = "block";
			var again = document.querySelector(".again");
			var gameText = document.querySelector(".gameText");
			again.onclick = function(){
				console.log("123");
				window.location.href = "game.html";
			}
			gameText.onclick = function(){
				gameTrans.style.display = "block";
				move();
				close.onclick = function(){
					gameTrans.style.display = "none";
				}
			}
		}
		//将替换后的内容写到html中
		time.innerHTML = newCountdownNum;
	},10);
}

//清除
function remove(){
	var centerChildren = center.querySelectorAll(".one");
	for (var i = 0; i < centerChildren.length; i++) {
		centerChildren[i].remove();
	}
}

//创建图片
function addImages(){
	//游戏开始
	count ++;
	//标题
	if(count == 5 && bool == false){
		gameTitle.src = "img/game_title5.png";
	}else if(count == 7 && boolT == true){
		gameTitle.src = "img/game_title7.png";
		count --;
	}else if(count == 7 && boolT == false){
		gameTitle.src = "img/game_title" + (count - 1) + ".png";
		count --;
	}else if(count == 9){
		gameTitle.src = "img/game_title8.png";
		count = 7;
	}else {
		gameTitle.src = "img/game_title" + (count - 1) + ".png";
	}
	//创建图片
	var imgNum = Math.pow(count,2); 
	var divWidth = (center.clientWidth / count) + "px";
	for (var i = 0; i < imgNum; i++) {
		var divB = document.createElement("div");
		divB.className = "one";
		divB.style.width = divWidth;
		center.appendChild(divB);
		var imgOne = document.createElement("img");
		imgOne.src = "img/dingbu.png";
		divB.appendChild(imgOne);
		var imgTwo = document.createElement("img");
		imgTwo.src = "img/baobei.png";
		divB.appendChild(imgTwo);
	}
	centerWrap.style.opacity = "1";
	centerWrap.style.top = "0%";
	//出现"徐峥"
	appear(imgNum);
}

//弹窗消失
function popupWindow(){
	showImg.style.display = "none";
	showImgs[count-2].style.display = "none";
	gameTime();
	if (count == 7 && boolT == false) {
		count --;
		boolT = true;
	}
	remove();
	//第五关
	if (count == 5 && bool == true) {
		count --;
		bool = false;
	}
	addImages();
}

//出现"徐峥"
function appear(imgNum){
	var ran = randomNum(0,imgNum);
	//找出最后一个子级，替换图片
	var lastImg = imgDivs[ran].lastChild;
	lastImg.src = "img/guang.png";
	if((count == 5 && bool == false) || (count == 6 && boolT == true)){
		var ranArray = [];
		for (var i = 0; i < count; i++) {
			var ranNew = randomNum(0,imgNum);
			if(ran != ranNew && ranNew != ranArray[i]){
				ranArray.push(ranNew);
			}else{
				i --;
			}
		}
		for (var i = 0; i < ranArray.length; i++) {
			var changeImg = imgDivs[ranArray[i]].lastChild;
			changeImg.src = "img/yanjing.png";
		}
	}
	lastImg.onclick = function(){
		if ((count == 5 && bool == false) || (count == 6)) {
			if (count == 6 && boolT == true) {
				count = 7;
			}
				count ++;
				clearTimeout(countdownTimer);
				showImg.style.display = "block";
				showImgs[count-2].style.display = "block";
		}else if (count == 7 && boolT == true) {
				count = 9;
				//游戏结束
				gameOver();
				return;
		}else{
			clearTimeout(countdownTimer);
			showImg.style.display = "block";
			showImgs[count-2].style.display = "block";
		}
		timer = setTimeout(function(){
			popupWindow();
		},1000);
		showImgs[count-2].onclick = function(){
			clearTimeout(timer);
			popupWindow();
		}
		centerWrap.style.opacity	= "0";
		centerWrap.style.top = "-50%";
	};
}

//生成图片
function images(name,src,obj){
	var img = new Image;
	img.src = src;
	img.className = name;
	obj.appendChild(img);
}

//游戏说明的滑动(包括鼠标的滚轮事件)
function move(){
	//文字的移动div的移动最大距离
	var wordChangeDis = gameCon.offsetHeight - gameWrapper.clientHeight;
	//定义一个增量size
	var size = 1 / wordChangeDis;
	//滚动条上的小块的移动的最大距离
	var blockMaxHeight = line.clientHeight - block.offsetHeight;
	//文字的移动div的父级"外框"的offsetTop值
	var wrapTop = gameWrapper.offsetTop;
	//调用封装的函数
 	addScrollFun(gameCon,function(down){
 		//判断当前滚轮是否向后滑动，为true的时候向后滑动
 		if (down == true) {
 			//增量叠加
 			size += 10;
 			//当增量大于等于文字div移动的最大距离时，等于最大距离
 			if(size >= wordChangeDis){
 				size = wordChangeDis;
 			}
 			//文字div的top值
 			gameCon.style.top = - size + "px";
 			//移动距离的比值
			var blockMaxDis = size / wordChangeDis;
			//小块的top值
 			block.style.top = blockMaxDis * blockMaxHeight + "px";
 		} else {
 			//动态的获取文字div的top值
   			var top = gameCon.offsetTop;
   			if (top == gameCon.offsetTop) {
   				size = top;
   				//设置增量，否则没有向上滑动的效果
   				size += 10;
   			}
 			//判断当size是否大于0
 			if (size >= 0) {
 				size = 0;
 			}
 			gameCon.style.top = size + "px";
 			//移动距离的比值
			var blockMaxDis = size / wordChangeDis;
 			block.style.top = - blockMaxDis * blockMaxHeight + "px";
 		}
 	})
 	
 	//设备端滑动事件
	//滚动条
	//定义一个touch.js的方法的变量
	var slider = document.getElementsByClassName("block")[0];
	//定义一个变量(未赋值，为undefined类型)
	var dyB;
	//清除事件的默认行为
	touch.on(slider, 'touchstart', function(ev){
		ev.preventDefault();
	});
	//拖拽
	touch.on(slider, 'drag', function(ev){
		//定义dyB的值为其本身或是0，最初为0，因为dyB未初始化；
		dyB = dyB || 0;
		//定义一个变量，其值为本身的值加上y轴的值
		var offyB = dyB + ev.y;
		//判断：该元素是否超出上边框的值
		if (offyB <= 0) {
			offyB = 0;
		}
		//判断：该元素是否超出下边框的值
		if (offyB >= blockMaxHeight) {
			offyB = blockMaxHeight;
		}
		block.style.top = offyB + "px";
		//计算小块已滑动的距离与最大滑动距离的比例
		var scaleWord = offyB / blockMaxHeight;
		//根据滑动的比例生意文字DIV最大的移动距离得出当前文字DIV的top值
		gameCon.style.top = -wordChangeDis * scaleWord + "px";
	});
	//当结束拖拽时，记录当前小块的位置
	touch.on(slider, 'dragend', function(ev){
		dyB += ev.y;
	});
	//文本移动
//	touch.on(document, 'touchstart', function(ev){
//		ev.preventDefault();
//	});
//	var target = document.getElementsByClassName("game_wrapper")[0];
//	var dy;
//	touch.on(target, 'drag', function(ev){
//		dy = dy || 0;
//		var offy = dy + ev.y;
//		if (offy >= 0) {
//			offy = 0;
//		}
//		if (offy <= -wordChangeDis) {
//			offy = -wordChangeDis;
//		}
//		gameCon.style.top = offy + "px";
//		var scale = offy / wordChangeDis;
//		block.style.top = -blockMaxHeight * scale + "px";
//	});
//	touch.on(target, 'dragend', function(ev){
//		dy += ev.y;
//	});
}

//抽奖
function prize(){
	//拼手机
	var getPosTop = ["7.5%","8%","15%","21.5%","20.9%","33.9%","43.5%","49%","34%"];
	var getPosLeft = ["27.2%","48%","42%","27.7%","41%","53.6%","28.2%","43%","49%"];
	for (var i = 0; i < getImg.length; i++) {
		getImg[i].style.top = getPosTop[i];
		getImg[i].style.left = getPosLeft[i];
	}
	setTimeout(function(){
		//完整的手机
		images("onePhone","img/end-img.png",getShow);
		centerImg.style.display = "none";
	},1010);
	setTimeout(function(){
		var onePhone = document.querySelector(".onePhone");
		onePhone.src = "img/end_phone.png";
		tipWord.style.display = "block";
	},1600);
	btnOne.onclick = function(){
		//开始抽奖
		end.style.display = "block";
		gameover.style.display = "none";
		var ranNum = randomNum(0,100);
		if (ranNum >=0 && ranNum < 5) {
			gift.style.display = "block";
			retrunGame.onclick = function(){
				window.location.href = "game.html";
			}
		}else if(ranNum >= 5 && ranNum < 90){
			giftGet.style.display = "block";
			var ranNum = randomNum(0,4);
			prizeType.innerHTML = prizeArray[ranNum];
		}else if(ranNum >= 90 && ranNum < 100){
			//获得vivo手机
			prizeType.innerHTML = "vivo x5pro手机一部";
		}

		submitName.onblur = function(){
			var nameStr = submitName.value;
			var nameRe = /[0-9a-zA-Z\u4e00-\u9fa5]+/;
			if (nameStr != nameStr.match(nameRe)) {
				submitName.style.border = "1px solid red";
				submitName.value = "";
			}else{
				submitName.style.border = "";
			};
		};
		submitPhone.onblur = function(){
			var phoneStr = submitPhone.value;
			var phoneRe = /^1[3578]\d{9}$/;
			if (phoneStr != phoneStr.match(phoneRe)) {
				submitPhone.style.border = "1px solid red";
				submitPhone.value = "";
			}else{
				submitPhone.style.border = "";
			};
		};
		submitBtn.onclick = function(){
			if (submitName.value == "" || submitPhone.value == "") {
				alert("提交失败，请填写完整");
				return false;
			}else{
				alert("提交成功");
				return true;
			};
		};

	}
	btnTwo.onclick = function(){
		//游戏说明
		gameTrans.style.display = "block";
		move();
		close.onclick = function(){
			gameTrans.style.display = "none";
		}
	}
}




//游戏结束
function gameOver(){
	//弹框出现
	showImg.style.display = "block";
	showImgs[count-2].style.display = "block";
	setTimeout(function(){
		//停止计时
		setTime.pause();
		clearInterval(countdownTimer);
		//弹框消失
		showImg.style.display = "none";
		showImgs[count-2].style.display = "none";
		//游戏框消失
		gameWrap.style.display = "none";
		gameImages.style.display = "none";
		//一行一行的出现提示文字
		getShow.style.display = "block";
	},500);
	//出现手机碎片
	setTimeout(function(){
		getWord.style.display = "none";
		centerImg.style.display = "block";
	},1500);
	setTimeout(function(){
		prize();
		clearTimeout(timer);
	},2000)
}

//函数初始化
function init(){
	//背景音乐
	musicFun();
	
	//创建图片
	addImages();
	
	//游戏倒计时
	gameTime();
}