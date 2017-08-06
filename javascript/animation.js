//$(function(){
//	$('.chrismasOld').removeClass("hidden").addClass("show");
//	var topNum = 50,//控制圣诞老人出现的位置
//		index = 1//控制字符串的下标
//		;//
//	var chrismasOld = setInterval(function(){
//		$('.chrismasOld').css("top",topNum+"px");
//		topNum ++;
//		if(topNum == 350){
//			$('.merryChrismas').removeClass("hidden").addClass("show merryChrismasAni");
//		}
//		if(topNum == 400){
//			textContainer=true;
//		}
//		if(topNum == 500){
//			$('.dislogBox').removeClass('hidden').addClass('show');
//			var dislogBoxArr = "咦，苹果，难道要送我？";
//			var dislogBoxtext="";
//			var textcon = setInterval(function(){
//				dislogBoxtext=dislogBoxArr.substr(0,index);
//				index++;
//				$('.dislogBox').html(dislogBoxtext);
//				if(index == dislogBoxArr.length+1){
//					clearInterval(textcon);
//				}
//				console.log(dislogBoxtext);
//			},300)
//		}
//		if(topNum==631){
//			clearInterval(chrismasOld);
//		}
//	},20);
//	
//})
