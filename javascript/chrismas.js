(function($) {
	function btnJump(){
		// window.location.href="http://digital.chinacloudsites.cn drawApple.html";
		window.location.href = "drawApple.html";
	}
	var btn = document.getElementById("button");
	btn.addEventListener('click', btnJump, false); //鼠标抬起事件 
	
	
	
	
	var canvas = document.getElementById('canvas');
		canvas.height = 3070;
		canvas.width = 640;
	if(canvas.getContext) {
		var cxt = canvas.getContext("2d");
		var stardeg = 0,
			starSpeed = 2, //星星的旋转速度
			sleepTime = 500,//今年圣诞你送苹果了吗     文字的速度 500
			merryChrismas = false,//merryChrismas是否可以绘制
		    leftSpeed = 480,//merryChrismas 距离左边的距离
		    snowflakeSpeed = 0.5, //雪花的旋转速度
		    snowflakedeg = 0, //雪花旋转的初始角度
		    appleseed = 1, //苹果下落的速度
			jiaSpeed = 1.5,  //苹果加速度
			textContainer=false, //是否绘制苹果
			bgoffset = 0,
			fps = 1, //背景图片移动速度
			index = 1,//控制字符串的下标
			pinggouStatus = false,//控制“ 咦，苹果，难道要送我？”是否可以打印
			printFontStatus = false,//判断打印是否结束
			printFontStatus1 = false,//你只有 10 秒钟的记忆时间哟！
			textcon,//打印文字的定时器
			timeStatus = false,//控制    活动时间：12.1-12.5
			moveTopStatus = false,//控制元素整体向上移动
			moveSpeed = 1,//元素整体向上每步移动的距离
			boxImgStatus = false,//控制 “记下它的样子让我们一起来动手”
			isStop = false,//是否停止向上移动
			dialogbox1ImgStatus = false,//控制 "十秒钟的记忆"
			bgImgTime ,//定时器
			time = 20; //每隔的毫秒数刷新
			
		//背景
		var bgImg = new Image();bgImg.src = " images/bgimg.png";
		//星星
		var starImg = new Image();starImg.src = " images/start.png";
		//圣诞树
		var treeImg = new Image();treeImg.src = " images/tree.png";
		//雪花
		var snowflakeImg = new Image();snowflakeImg.src = " images/snowflake.png";
		//首页苹果
		var appleImg0 = new Image();appleImg0.src = " images/apple0.png";
		//圣诞老人
		var chrismasImg = new Image();chrismasImg.src = " images/chrismasOld.gif";
		//对话框
		var dialogboximg = new Image();dialogboximg.src = " images/dialogBox.png";
		//时间
		var timeImg = new Image();timeImg.src = " images/time.png";
		//今年圣诞你送苹果苹果了吗？
		var jinImg = new Image();jinImg.src = " images/jin.png";
		var nianImg = new Image();nianImg.src = " images/nian.png";
		var shengImg = new Image();shengImg.src = " images/sheng.png";
		var danImg = new Image();danImg.src = " images/dan.png";
		var niImg = new Image();niImg.src = " images/ni.png";
		var songImg = new Image();songImg.src = ' images/song.png';
		var pingImg = new Image();pingImg.src = " images/ping.png";
		var guoImg = new Image();guoImg.src = " images/guo.png";
		var leImg = new Image();leImg.src = " images/le.png";
		var maImg = new Image();maImg.src = " images/ma.png";
		var queryImg = new Image();queryImg.src = " images/query.png";
		// merryChrismas		
		var merryChrismasImg = new Image();merryChrismasImg.src = " images/merryChrismas.png";
		//记下它的样子让我们一起来动手
		var boxImg = new Image();boxImg.src = " images/box.png";
		//苹果样式2
		var apple1Img = new Image();apple1Img.src = " images/apple1.png";
		//对话框样式2
		var dialogbox1Img = new Image();dialogbox1Img.src = " images/dialogbox1.png";
		//圣诞树样式2
		var tree1Img = new Image();tree1Img.src = " images/tree1.png";
		//圣诞树样式3
		var tree2Img = new Image();tree2Img.src = " images/tree2.png";
		
		bgImg.addEventListener("load", function() {
			var bgImgHeight = bgImg.height;
			var thisdrawBgImg = true;
			
			
			function drawBgImg() {
				//背景
				cxt.save();
				cxt.translate(0, bgoffset);
				bgoffset = bgoffset - fps;
				cxt.drawImage(bgImg, 0, 0);
				cxt.drawImage(bgImg, 0, bgImgHeight);
				cxt.restore();
				if(Math.abs(bgoffset) > canvas.height) {
					bgoffset = 0;
				};
				//星星
				drawStar(starImg,310, 55); //参数为星星的位置
				drawImg(treeImg, 120, 110); //圣诞树
				drawSnowflake(480, 90); //雪花左上
				drawSnowflake(40, 470); //雪花右下
				
				//今年你送苹果了吗？
				if(thisdrawBgImg != true) {
					drawImg(jinImg, 88, 185);
					drawImg(nianImg, 198, 185);
					drawImg(shengImg, 303, 185);
					drawImg(danImg, 403, 185);
					drawImg(niImg, 42, 320);
					drawImg(songImg, 128, 320);
					drawImg(pingImg, 212, 320);
					drawImg(guoImg, 295, 320);
					drawImg(leImg, 371, 320);
					drawImg(maImg, 448, 320);
					drawImg(queryImg, 548, 320);
				};
				//merryChrismas
				if(merryChrismas==true){
					drawmerryImg(merryChrismasImg,leftSpeed, 440);
					if(leftSpeed>180){
						leftSpeed = leftSpeed -20;
					}else{
						leftSpeed = 180;
					};
				};
				//苹果
				if(textContainer==true){
					drawImg(appleImg0, 180, appleseed); //首页苹果
					if(appleseed < 520){
						jiaSpeed+= 0.5;
						appleseed = appleseed + jiaSpeed;
					}else{
						appleseed = 520;
					}
				}
				//对话框   "咦，苹果，难道要送我？"
				if(pinggouStatus==true){
					drawImg(dialogboximg, 160, 740) //对话框
					if(printFontStatus==false){
						printFontStatus = printFont("咦，苹果，难道要送我？", 175, 775);
					}else{
						clearInterval(textcon);
						drawFont("咦，苹果，难道要送我？","normal", 24, 175, 775);
					};
				};
				//活动时间：12.1-12.5
				if(timeStatus == true){
					drawImg(timeImg, 120, 870); //时间
					drawFont("活动时间：12.23-12.27","normal", 34, 185, 900); //绘制文字，第二个参数为字号
				};
				//记下它的样子让我们一起来动手
				drawImg(boxImg,65,970);
				if(dialogbox1ImgStatus == true){
					drawImg(dialogbox1Img, 120, 1280) //对话框
					if(printFontStatus1==false){
						printFontStatus1 = printFont("你只有 5 秒钟的记忆时间哟！",135,1315);
					}else{
						clearInterval(textcon);
						drawFont("你只有 5 秒钟的记忆时间哟！","normal", 24, 135, 1315);
					};
					
				}
				//苹果样式2
				drawImg(apple1Img, 20, 1330) //苹果样式2
				//雪花左上
				drawSnowflake(550, 1130); //雪花左上
				drawSnowflake(60, 1330); //雪花右下
				drawImg(tree2Img,20,1460);//圣诞树样式2
				drawImg(tree1Img,390,1560);//圣诞树样式3
//				drawFont("我记住了，点击跳过此步骤","bold",25, 155, 1800);
				
				

			};
			bgImgTime = setInterval(drawBgImg, time);
			//今年你送苹果了吗？
			function titleText() {
				clearInterval(bgImgTime);
				drawImg(jinImg, 88, 185);
				var nianTime = setTimeout(function() {
					drawImg(nianImg, 198, 185);
					clearTimeout(nianTime);
				}, sleepTime);
				var shengTime = setTimeout(function() {
					drawImg(shengImg, 303, 185);
					clearTimeout(shengTime);
				}, sleepTime * 2);
				var danTime = setTimeout(function() {
					drawImg(danImg, 403, 185);
					clearTimeout(danTime);
				}, sleepTime * 3);
				var niTime = setTimeout(function() {
					drawImg(niImg, 42, 320);
					clearTimeout(niTime);
				}, sleepTime * 4);
				var songTime = setTimeout(function() {
					drawImg(songImg, 128, 320);
					clearTimeout(songTime);
				}, sleepTime * 5);
				var pingTime = setTimeout(function() {
					drawImg(pingImg, 212, 320);
					clearTimeout(pingTime);
				}, sleepTime * 6);
				var guoTime = setTimeout(function() {
					drawImg(guoImg, 295, 320);
					clearTimeout(guoTime);
				}, sleepTime * 7);
				var leTime = setTimeout(function() {
					drawImg(leImg, 371, 320);
					clearTimeout(leTime);
				}, sleepTime * 8);
				var maTime = setTimeout(function() {
					drawImg(maImg, 448, 320);
					clearTimeout(maTime);
				}, sleepTime * 9);
				var queryTime = setTimeout(function() {
					drawImg(queryImg, 548, 320);
					clearTimeout(queryTime);
					clearTimeout(titleTextTime);
					thisdrawBgImg = false;
					bgImgTime = setInterval(drawBgImg, time);
				}, sleepTime * 10);
				
			};
			//打印文字
			function printFont(fontText,left,top){
				clearInterval(bgImgTime);
				var dislogBoxArr = fontText;
				var dislogBoxtext="";
				textcon = setInterval(function(){
					dislogBoxtext=dislogBoxArr.substr(0,index);
					index++;
					drawFont(dislogBoxtext,"normal",24,left,top);
					if(index == dislogBoxArr.length+1){
						clearInterval(textcon);
						bgImgTime = setInterval(drawBgImg, time);
						index = 1;
						return true;
					}
				},100);
			};
			var titleTextTime = setTimeout(titleText,1000);
		});
		animate();//控制主界面中，各个控件的显示
		function animate(){
			$('.chrismasOld').removeClass("hidden").addClass("show");
			var topNum = 50,//控制圣诞老人出现的位置
				index = 1//控制字符串的下标
				;//
			var chrismasOld = setInterval(function(){
				$('.chrismasOld').css("top",topNum+"px");
				topNum ++;
				if(topNum == 280){
					moveTopStatus = true;
				};
				if(topNum == 300){
					merryChrismas = true;
					 //是否绘制苹果
					textContainer=true;
					moveTopStatus = true;
				};
				if(topNum == 390){//苹果文字
					pinggouStatus = true;
				};
				if(topNum == 440){
					timeStatus = true;
				};
				if(topNum == 540){
					dialogbox1ImgStatus = true;//你只有 10 秒钟的记忆时间哟！
				};
				if(topNum == 670){
					dialogbox1ImgStatus = false;//你只有 10 秒钟的记忆时间哟！
				};
				if(topNum == 670){
					isStop = true;
				};
				if(topNum==671){
					clearInterval(chrismasOld);
					clearInterval(bgImgTime);
					$(".box").removeClass('hidden').addClass('show');
//					var ii = 10;
//					var numberCon = setInterval(function(){
//						$('.number').html(ii);
//						ii--;
//						if(ii<=0){
//							clearInterval(numberCon);
////							window.location.href="http://digital.chinacloudsites.cn drawApple.html";
//						};
//					},1000);
				};
			},30);
		};
		
		//向左走动
		function drawmerryImg(imgSrc,left,top){
			cxt.save();
			if(moveTopStatus == true){
				if(moveSpeed > 970){
					top = top- 970;
				}else{
					top = top- moveSpeed;
					moveSpeed = moveSpeed+0.1;
				}
			}
			cxt.translate(left, top);
			cxt.drawImage(imgSrc, 0, 0);
			cxt.restore();
		};
		//绘制文字
		function drawFont(textContain,fontWeight, fontSize, left, top) {
			cxt.save();
			cxt.font =fontWeight+" "+ fontSize + "px 微软雅黑";
			cxt.fontFamily = "miscosoft yahei";
			cxt.fontWeight = "bold";
			cxt.fillStyle = "#d61b21";
			if(moveTopStatus == true){
				if(moveSpeed > 970){
					top = top- 970;
				}else{
					top = top- moveSpeed;
					moveSpeed = moveSpeed+0.1;
				}
			}
			cxt.fillText(textContain, left, top);
		}
		//星星
		function drawStar(imgSrc,left, top) {
			cxt.save(); //保存状态
			cxt.translate(left, top); //设置画布上的(0,0)位置，也就是旋转的中心点
			cxt.rotate(stardeg * Math.PI / 180);
			cxt.drawImage(imgSrc, -imgSrc.width / 2, -imgSrc.height / 2); //把图片绘制在旋转的中心点，
			cxt.restore(); //恢复状态
			stardeg = stardeg + starSpeed;
		}
		//绘制图片
		function drawImg(imgSrc, left, top) {
			cxt.save();
			if(moveTopStatus == true){
				if(moveSpeed > 970){
					top = top- 970;
				}else{
					top = top- moveSpeed;
					moveSpeed = moveSpeed+0.1;
				}
			}
			cxt.translate(left, top);
			cxt.drawImage(imgSrc, 0, 0);
			cxt.restore();
		}
		//雪花
		function drawSnowflake(left, top) {
			cxt.save();
			cxt.translate(left, top);
			cxt.rotate(snowflakedeg * Math.PI / 180);
			cxt.drawImage(snowflakeImg, -snowflakeImg.width / 2, -snowflakeImg.height / 2);
			cxt.restore();
			snowflakedeg = snowflakedeg + snowflakeSpeed;
		}
	}
})(jQuery);