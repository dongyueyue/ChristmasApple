	function drawApple(){
		$('#myCanvas1').addClass('disable');
		var canvas = document.getElementById("myCanvas");
		var ii = 5;
		if(canvas.getContext){
			var ctx = canvas.getContext("2d");
			var apple0 = new Image();
			apple0.src = "images/apple2.png";
			apple0.addEventListener('load',function(){
				ctx.save();
				ctx.drawImage(apple0,43,25);
				ctx.restore();
				var numberCon = setInterval(function(){
					ii--;
					ctx.clearRect(193,275,50,50);
					ctx.save();
					ctx.font ="bold 54px 微软雅黑";
					ctx.fontFamily = "miscosoft yahei";
					ctx.fontWeight = "bold";
					ctx.fillStyle = "#d61b21"
					ctx.fillText(ii, 200, 320);
					ctx.restore();
					if(ii<0){
						clearInterval(numberCon);
						ctx.clearRect(0,0,canvas.width,canvas.height);
						$('#myCanvas1').removeClass('disable');
					};
				},1000);
			});
		}
	}
	drawApple();
(function(){
	var canvas = document.getElementById("myCanvas1"); //获取canvas   
	var context = canvas.getContext('2d'); //canvas追加2d画图
	var linex = new Array(); //横坐标
	var liney = new Array(); //纵坐标
	var linen = new Array(); //移动坐标 
	var lastX = -1; //路径坐标，从起始到下一个的坐标 
	var lastY = -1; //路径坐标
	var flag = 0; //标志，判断是按下后移动还是未按下移动 重要
	var penwidth = 7; //画笔宽度
	var pencolor = "#d61b21"; //画笔颜色
	var canvasLeft;//相对于画布的左边距离
	var canvasTop;//相对于画布的上边距离
	var rangeNum = 8;//匹配坐标点的范围
	var dataFen = 0;//匹配到点的个数
	var mark = 0;//总分数
	var DATASAVE = [
		{dot:[256,112]},	
		{dot:[222,152]},	
		{dot:[237,124]},
		{dot:[275,100]},
		{dot:[150,146]},	
		{dot:[88,180]},	
		{dot:[59,243]},	
		{dot:[53,301]},	
		{dot:[73,369]},	
		{dot:[109,436]},	
		{dot:[137,462]},	
		{dot:[171,464]},
		{dot:[219,470]},
		{dot:[262,464]},
		{dot:[298,461]},
		{dot:[317,445]},
		{dot:[329,428]},
		{dot:[342,395]},
		{dot:[346,386]},
		{dot:[362,348]},
		{dot:[370,317]},
		{dot:[375,290]},
		{dot:[375,263]},
		{dot:[365,223]},
		{dot:[258,147]},
		{dot:[280,146]},
		{dot:[331,170]},
		{dot:[364,222]},
		{dot:[205,151]},
		{dot:[63,345]},
		{dot:[100,421]},
	];
	
	var data = [
		{dot:[256,112]},	
		{dot:[222,152]},	
		{dot:[237,124]},
		{dot:[275,100]},
		{dot:[150,146]},	
		{dot:[88,180]},	
		{dot:[59,243]},	
		{dot:[53,301]},	
		{dot:[73,369]},	
		{dot:[109,436]},	
		{dot:[137,462]},	
		{dot:[171,464]},
		{dot:[219,470]},
		{dot:[262,464]},
		{dot:[298,461]},
		{dot:[317,445]},
		{dot:[329,428]},
		{dot:[342,395]},
		{dot:[346,386]},
		{dot:[362,348]},
		{dot:[370,317]},
		{dot:[375,290]},
		{dot:[375,263]},
		{dot:[365,223]},
		{dot:[258,147]},
		{dot:[280,146]},
		{dot:[331,170]},
		{dot:[364,222]},
		{dot:[205,151]},
		{dot:[63,345]},
		{dot:[100,421]},
	];
	
//	********寻找点坐标 start  测试代码******************
function aa(){
	for(var i=0 ;i<data.length;i++){
		drawDot(data[i].dot[0],data[i].dot[1]);
	}
	function drawDot(left,top){
		context.save();
		context.beginPath();
		context.arc(left,top,5,0,Math.PI*2,true);
		context.fillStyle = "#2ab73a";
		context.fill();
		context.closePath();
		context.restore();
	}
}
//	aa();
//	********寻找点坐标 end******************
	
	//handle
	canvas.addEventListener('touchmove', onMouseMove, false); //鼠标移动事件 
	canvas.addEventListener('touchstart', onMouseDown, false); //鼠标按下事件 
	canvas.addEventListener('touchend', onMouseUp, false); //鼠标抬起事件 
	
	function onMouseMove(event) {
		if(flag == 1) {
			canvasLeft = document.getElementsByClassName("canvasBox")[0].offsetLeft;
			canvasTop = document.getElementsByClassName("canvasBox")[0].offsetTop;
			linex.push(event.changedTouches[0].clientX-canvasLeft); //坐标存入数组
			liney.push(event.changedTouches[0].clientY - canvasTop);
			var thisDataLeft = parseInt(event.changedTouches[0].clientX-canvasLeft);
			var thisDateRight = parseInt(event.changedTouches[0].clientY - canvasTop);
			//计算共有多少坐标点
			for(var i=0 ;i<data.length;i++){
				if((data[i].dot[0]-rangeNum<thisDataLeft)&&(thisDataLeft<data[i].dot[0]+rangeNum)&&(data[i].dot[1]-rangeNum<thisDateRight)&&(thisDateRight<data[i].dot[1]+rangeNum)){
					dataFen = dataFen +1;
//					var datax = data[i].dot[0],
//					datay = data[i].dot[1];
					data[i].dot[0] = "";
					data[i].dot[1] = "";
//					DATASAVE.push()
				};
			}
			//总分数
			mark = parseInt(100/data.length*dataFen);
			console.log("共有"+data.length+"个点，匹配到的点共有"+dataFen+"个，得分为"+mark);
			linen.push(1); //移动1位
			context.save(); //存储当前画布状态，破坏以前
			context.beginPath(); //开始绘制路径
			context.lineWidth = penwidth; //线宽度

			for(var i = 0; i < linex.length; i++) { //移动鼠标，这个数组会不断push插入1，计算移动次数
				lastX = linex[i]; //移动坐标
				lastY = liney[i];
				if(linen[i] == 0) { //刚按下那个坐标位置，移动开始前
					context.moveTo(lastX, lastY); //绘制路径的起始点坐标
				} else { //发生移动
					context.lineTo(lastX, lastY); //绘制以后的左边点
				}
			}
			context.shadowBlur = 10;
			context.strokeStyle = pencolor;
			context.stroke(); //绘制
			context.restore(); //释放画布以前状态，不能写字就破坏了
		}
	};

	function onMouseDown(event) {
		flag = 1; //标志按下
		linex.push(event.changedTouches[0].clientX - canvasLeft); //坐标存入数组
		liney.push(event.changedTouches[0].clientY - canvasTop);
		linen.push(0); //按下0位
	}

	function onMouseUp(event) {
		flag = 0;
		linex.push(event.changedTouches[0].clientX - canvasLeft); //坐标存入数组
		liney.push(event.changedTouches[0].clientY - canvasTop);
		linex=[];
		liney=[];
		linen.push(0);
	}
	//清除画布内容
	var redrawBtn = document.getElementById("redraw"); 
	redrawBtn.addEventListener('touchend', redraw, false); //鼠标抬起事件 
	function redraw(){
		context.save();
		context.beginPath();
		context.clearRect(0,0,canvas.width,canvas.height);
		context.closePath();
		context.restore();
		resetFun();
//		aa(); 
	};
	var finishBtn = document.getElementById("finish"); 
	finishBtn.addEventListener('touchend', finish, false); //鼠标抬起事件 
	function finish(){
		var image = new Image();
		image.src = canvas.toDataURL("image/png");
		$('.bottomBox').html(image);
		$('#mark').html(mark);
		context.save();
		context.beginPath();
		context.clearRect(0,0,canvas.width,canvas.height);
		context.closePath();
		context.restore();
	};
	$('.again').click(function(){
		resetFun();
		drawApple();
//		aa();
	})
	//重置画布
	function resetFun(){
		mark = 0;//重置得分
		$('#mark').html("0");
		data = [
		{dot:[256,112]},	
		{dot:[222,152]},	
		{dot:[237,124]},
		{dot:[275,100]},
		{dot:[150,146]},	
		{dot:[88,180]},	
		{dot:[59,243]},	
		{dot:[53,301]},	
		{dot:[73,369]},	
		{dot:[109,436]},	
		{dot:[137,462]},	
		{dot:[171,464]},
		{dot:[219,470]},
		{dot:[262,464]},
		{dot:[298,461]},
		{dot:[317,445]},
		{dot:[329,428]},
		{dot:[342,395]},
		{dot:[346,386]},
		{dot:[362,348]},
		{dot:[370,317]},
		{dot:[375,290]},
		{dot:[375,263]},
		{dot:[365,223]},
		{dot:[258,147]},
		{dot:[280,146]},
		{dot:[331,170]},
		{dot:[364,222]},
		{dot:[205,151]},
		{dot:[63,345]},
		{dot:[100,421]},
	];
		dataFen = 0;
		
	}
	$('.prize').height($(".swiper-slide").height()-650);
	$('.lottery').click(function(){
		$('.marsk').removeClass('hidden').addClass('show');
	})
	//安卓上input 获取光标位置，往上提
	$('input').focus(function(){
		$('.marskContainer').css("margin-top","-100px");
	});
	$('input').blur(function(){
		$('.marskContainer').css("margin-top","200px");
	});
	//提交
	$('.submitBtn').click(function(){
		var name = $("#name").val();
		var tel = $("#tel").val();
		var address = $("#address").val();
		var alertText = "";
		if(name==""){
			alertText +="姓名不能为空!\n";
		};
		if(tel==""){
			alertText +="电话不能为空!\n";
		};
		if(address==""){
			alertText +="地址不能为空!\n";
		};
		if(alertText != ""){
			alert(alertText);
			return false;
		}else{
			$("#name").val("");
			$("#tel").val("");
			$("#address").val("");
			$('.marsk').removeClass('show').addClass('hidden');
		};
	});
	$('.close').click(function(){
		$('.marsk').removeClass('show').addClass('hidden');
	})
	setTimeout(function(){
		$('.fighting').removeClass('hidden').addClass('show');
	},6000);
})();