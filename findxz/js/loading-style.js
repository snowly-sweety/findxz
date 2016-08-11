
//获取元素
var loadingWrap = document.querySelector(".loading_wrap");
var musicOn = document.querySelector(".on");
var musicOff = document.querySelector(".off");
var bgMus = document.querySelector(".bg_mus");
var wordMusic = document.querySelector(".word_mus");
var synopsis = document.querySelector(".synopsis");
var synWord = document.querySelector(".syn_word");
var bgImg = document.querySelector(".bg_img");
var synNewW = document.querySelector(".syn_newW");
var sanImg = document.querySelector(".sanImg");
var qiu = document.querySelector(".qiu");
var leftMove = document.querySelector(".left_move");
var personBody = document.querySelector(".person_body");
var person = document.querySelector(".person");
var phoneShow = document.querySelector(".phone_show");
var phoneSplit = document.querySelector(".phone_split");
var qiu2 = document.querySelector(".qiu2");
var phonewrap = document.querySelector(".phone_wrap");
var phonePart = document.querySelector(".phone_part");
var imgDiv = phonePart.getElementsByTagName("div");
var imgArrays = phonePart.getElementsByTagName("img");
var stars = document.querySelector(".stars");
var starsImgs = stars.getElementsByTagName("img");
var bottom = document.querySelector(".bottom");



//图片预加载
window.onload = function(){
	//提前加载图片的封装函数（本地图片也需要加载，本地图片由物理硬盘加载到内存里面）
	//参数：obj(需要是一个装载图片路径的数组)
	function preLoadImagesFun(obj,callBack){
		//已经加载完的图片
		var didLoaded = 0;
		//需要加载的图片
		var needLoad = obj.length;
		//定义一个用于接收图片的空数组
		var imagesArray = [];
		//循环传进来的数组obj
		for(var i = 0; i < needLoad;i ++){
			//创建新图片对象
			imagesArray[i] = new Image();
			//添加图片的src
			imagesArray[i].src = obj[i];
			//图片在加载完毕后，执行loadFun函数
			imagesArray[i].onload = loadFun;
		}
		
		function loadFun(){
			//每加载一张图片didLoaded变量就加一
			didLoaded++;
			//判断当前加载的图片的张数
			if (didLoaded >= needLoad) {
				//当已加载的图片数等于所需的图片数时，执行callBack回调函数
				callBack();
			};
		}
	}
	var imgArrays = ["/img/chip1.png", "/img/zhong.png", "/img/yuanxing.png", "/img/yuan.png", "/img/yanjing.png", "/img/yan.png", "/img/vivo.png", "/img/tou3.png","/img/sijiao.png", "/img/shang.png", "/img/sanxing.png", "/img/sanjiao.png", "/img/sanguang.png", "/img/quanxing.png", "/img/qiu3.png", "/img/phone.png","/img/hengxing.png","/img/guang.png","/img/xingqiu.png","/img/xing.png","/img/wen.png","/img/qiu2.png", "/img/dingbu.png", "/img/chip2.png", "/img/qiu1.png", "/img/bg_word.png", "/img/baobei.png", "/img/qiu.png","/img/background.png","/img/chip3.png","/img/chip4.png","/img/chip5.png","/img/chip6.png","/img/chip7.png","/img/chip8.png"];
	//处理图片：去除图片的第一个“/”符号
	for (var i = 0; i < imgArrays.length; i++) {
		imgArrays[i] = imgArrays[i].substring(1);
	}
	
	//执行预加载函数
	preLoadImagesFun(imgArrays,function(){
		//图片加载完毕后，执行动画
		loadingWrap.style.display = "none";
		synopsis.style.display = "block";
		//执行初始化函数
		init();
	});
}

//背景音乐
function musicFun(){
	musicOn.onclick = function(){
		musicOn.style.display = "none";
		musicOff.style.display = "block";
		bgMus.pause();
	}
	musicOff.onclick = function(){
		musicOff.style.display = "none";
		musicOn.style.display = "block";
		bgMus.play();
	}
}

//渐隐渐现函数
function slowChange(obj,attr){
	if (attr == "none") {
		var opa = 1;
		var timer = setInterval(function(){
			opa -= 0.1;
			if(opa < 0){
				obj.style.display = attr;
				clearInterval(timer);
			}
			obj.style.opacity = opa;
		},100);
	}else {
		var opa = 0;
		var timer = setInterval(function(){
			opa += 0.1;
			if(opa > 1){
				obj.style.display = attr;
				clearInterval(timer);
			}
			obj.style.opacity = opa;
		},100);
	}
}

//动画
function ballAction(){
	var opa = 1;
	var timer = setInterval(function(){
		opa -= 0.1;
		if(opa < 0){
			synNewW.style.display = "none";
			clearInterval(timer);
		}
		synNewW.style.opacity = opa;
		wordMusic.pause();
		if (synNewW.style.display == "none") {
			sanImg.style.left = "60%";
			sanImg.style.top = "27%";
			leftMove.style.left = "30%";
			leftMove.style.top = "70%";
			qiu.style.left = "60%";
			qiu.style.top = "75%";
			//超人飞到屏幕中间
			person.style.left = "10%";
			person.style.top = "-65%";
			setTimeout(function(){
				person.style.left = "-100%";
				person.style.top = "-100%";
				//手机出现
				phoneShow.style.display = "block";
				phoneShow.style.width = "47%";
				phoneShow.style.height = "50.5%";
				if (phoneShow.style.display == "block") {
					setTimeout(function(){
						//手机旁边的小星球消失
						slowChange(sanImg,"none");
						slowChange(leftMove,"none");
						slowChange(qiu,"none");
						slowChange(qiu2,"none");
					},2000);
					setTimeout(function(){
						//手机消失
						slowChange(phoneShow,"none");
						//碎片手机出现
						phoneSplit.style.display = "block";
					},4000);
					setTimeout(function(){
						slowChange(phoneSplit,"none");
						phonewrap.style.display = "block";
						//把“头”放到每个碎片里
						for (var i = 0; i < imgDiv.length;i++) {
							var headImg = new Image();
							headImg.className = "heads";
							headImg.src = "img/tou3.png";
							imgDiv[i].appendChild(headImg);
						}
					},4800);
					setTimeout(function(){
						//碎片散开
						var topArrays = ["-70%","-10%","-50%","55%","74%","143%","130%","170%"];
						var leftArrays = ["80%","30%","-40%","80%","-20%","17%","-50%","90%"];
						var posArrays = ["30","145","45","73","30","36","-30","30"];
						var headImgs = phonePart.getElementsByClassName("heads");
						stars.style.display = "block";
						for (var i = 0; i < starsImgs.length; i++) {
							starsImgs[i].style.top = topArrays[i];
							starsImgs[i].style.left = leftArrays[i];
						}
						for (var i = 0; i < imgDiv.length; i++) {
							//碎片旋转度数
							imgDiv[i].style.webkitTransform = "rotate("+ posArrays[i] +"deg) scale(0)";
							imgDiv[i].style.transform = "rotate("+ posArrays[i] +"deg) scale(0)";
							imgDiv[i].style.top = topArrays[i];
							imgDiv[i].style.left = leftArrays[i];
						}
					},5800);
					setTimeout(function(){
						bottom.style.display = "block";
					},6800);
				}
			},2000);	
		}
	},100);
}

//文字一行一行出现
function showWord(){
	var str = synWord.innerHTML.toString();
	var array = str.split("<br>");
	var i = 0;
	var timer = setInterval(function(){
		//打字音乐
		if(musicOn.style.display == "none"){
			wordMusic.pause();
		}else{
			wordMusic.play();
		}
		synNewW.innerHTML = synNewW.innerHTML + "<br/>" + array[i];
		i ++;
		if(i > array.length - 1){
			clearInterval(timer);
			//动画
			ballAction();
		}
	},800);
}

//飞人
setInterval(flyMan,300);
var array = ["sanxing","sijiao","wen"];
var index = 0;
function flyMan (){
	index ++;
	if (index == array.length) {
		index = 0;
	}
	personBody.src = "img/" + array[index] + ".png";
}

//初始化
function init(){
	
	//音乐
	musicFun();
	
	//文字一行一行出现
	showWord();
}