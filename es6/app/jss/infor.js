var tele=true
$(".inforTop li").click(function(){
	$(this).css({"background-color":"#00b5ac","color":"#fff",'cursor': 'pointer'}).siblings().css({"background":"none","color":"#000"})
})

// 用户名
$('.user').click(function(){
	var userText=$(this).children('span').text()
	console.log(userText)
	if(userText=='修改'){
	$(this).children('span').text("确定").parent().prev().children('input').css({"border":"1px solid #ccc","background":"#fff"}).attr("disabled",false)
}else if(userText=='确定'){
	$(this).children('span').text("修改").parent().prev().children("input").css({'border':"none",'background':"none"}).attr('disabled','disabled')
}

})

var windowHeight=$(window).height();

var bodyHeight=$('body').height()
var foot=$(".foot").height();
$(".foot").css({"padding-top":windowHeight-bodyHeight-foot+'px'});


// 绑定邮箱
$("body").on('click','.btn',function(){
	var parent=$(this).parent();
	// 页面邮箱
		var mail=$(this).parent().prev();
		//创建邮箱弹窗
		addmodify1('绑定邮箱','邮箱');
		// 点击确定时获取邮箱value同步页面上
		$(".modifyBtn>button:eq(0)").on("click",function(){
			// 新邮箱的value值
			var val=$(".inp").val();
			var isEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
			 if(val == ""){  
           $(".ts").html("邮箱不能为空");  
     }  else if(!(isEmail.test(val))){  
           $(".ts").html("邮箱格式不正确");  
     }  else{  
     	$(".ts").html("")
     	mail.text(val);
     	$('.modify,.bg').remove();
     	parent.append('<span>修改</span>|<span>解绑</span>');
			parent.children("span").css({"color":'#19B4B1',"padding":"0.05rem"})
			$(".btn").remove();
                   //此处可以操作向后台发送json数据，然后返回验证结果  
        }  

			// 修改
			parent.children("span:first").click(function(){
				// 创建修改邮箱的弹窗
				addmodify1('修改邮箱','新的邮箱')

				// 点击确定获取新邮箱的密码同步到页面中
				$(".modifyBtn>button:eq(0)").on("click",function(){
					// 新邮箱的value值
					var val=$(".inp").val();
					var isEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
				if(val == ""){  
			           $(".ts").html("邮箱不能为空");  
			     }  else if(!(isEmail.test(val))){  
			           $(".ts").html("邮箱格式不正确");  
			     }  else{  
				     	$(".ts").html("")
				     	mail.text(val);
				     	$('.modify,.bg').remove()
				  }

				})
			
				$(".modifyBtn>button:nth-child(2)").on("click",function(){
					$('.modify,.bg').remove()
				})


		})

			parent.children("span:last").click(function(){
				var operName='操作提示';
				var operTit='确定解绑邮箱？'
				deleoper(operName,operTit)
				$(".deleFoot>button:eq(0)").click(function(){
					parent.html('')
					parent.prev().text('您还没有绑定邮箱')
					parent.append('<button class="btn">立即绑定</button>');
				})

			})
		})
	
		
		$(".modifyBtn>button:nth-child(2)").on("click",function(){
				$('.modify,.bg').remove()
			})

})


// 修改手机号
$(".number").click(function(){
	var numPar=$(this).prev();
	original('修改手机号','原手机号')

	$(".modifyBtn>button").click(function(){
		$('.modify,.bg').remove()
		addmodify('修改手机号','新手机号码');
		$(".modifyBtn>button:eq(0)").on("click",function(){
		// console.log(numPar)
		var val=$(".inp").val();
		if(val==""){
				$(".ts").html("号码不能为空")
			}else if(!(/^1[34578]\d{9}$/.test(val))){
				$(".ts").html("请输入正确的手机号码")
			
			}else{
				$(".ts").html('')
				numPar.text(val)
				$('.modify,.bg').remove()
			}
			
	})
	})
	
	
	
})

// 动态添加邮箱
function addmodify1(title,name){
	$("#main").append('<div class="bg"></div><div class="modify">'+
					'<div style="height: 0.6rem;border-bottom: 1px solid #dddddd;line-height:0.6rem;font-size: 0.18rem;font-weight:bold;background-color: #eeeeee;">'+
						'<span style="float:left;padding-left:0.21rem">'+title+'</span>'+
						'<img src="static/img/close.png" class="close1" style="float:right;width:0.16rem;height:0.16rem;margin:0.22rem">'+
					'</div>'+
					'<div class="modifyMain" >'+
						'<div class="modifyMainAuto">'+
							'<div><span>'+name+'：</span><input type="text" class="inp"></div>'+
							'<p class="ts"></p>'+
							'<div style="margin-top:0.2rem"><span>验证码：</span><input type="text" class="inp1"><input type="submit" value="获取验证码" class="submit"></div>'+
						'</div>'+
					'</div>'+
					'<div class="modifyBtn">'+
						'<button>确定</button><button>取消</button>'+
					'</div>'+
					'</div>');
		// 弹窗样式
		var auto=$(".modifyMainAuto").height();
		$(".modifyBtn>button").css({"width":"1.18rem","height":"0.36rem","border":"none","margin":"0.1rem","font-size":"0.16rem","border-radius":"0.05rem"})
		$(".modifyBtn>button:eq(0)").css({"background-color":"#19B4B1","color":"#fff"})
		$(".modifyBtn>button:eq(1)").css({"background-color":"#eee","border":"1px solid #ccc","color":"#555555"})
		$(".bg").css({"width":"100%","height":"100%"})


// 删除窗口
		$(".close1").on("click",function(){
			$('.modify,.bg').remove()
		})
		$(".modifyBtn>button:nth-child(2)").click(function(){
			$('.modify,.bg').remove()
		})
}


// 修改手机号
function addmodify(title,name){
	$("#main").append('<div class="bg"></div><div class="modify">'+
					'<div style="height: 0.6rem;border-bottom: 1px solid #dddddd;line-height:0.6rem;font-size: 0.18rem;background-color: #eeeeee;">'+
						'<span style="float:left;padding-left:0.21rem">'+title+'</span>'+
						'<img src="static/img/close.png" class="close1" style="float:right;width:0.16rem;height:0.16rem;margin:0.22rem">'+
					'</div>'+
					'<div class="modifyMain" >'+
						'<div class="modifyMainAuto">'+
							'<div><span>'+name+'：</span><input type="text" class="inp"></div>'+
							'<p class="ts"</p>'+
							'<div style="margin-top:0.2rem"><span>验证码：</span><input type="text" class="inp1"><input type="submit" value="获取验证码" class="submit"></div>'+
						'</div>'+
					'</div>'+
					'<div class="modifyBtn">'+
						'<button>确定</button><button>取消</button>'+
					'</div>'+
					'</div>');
		// 弹窗样式
		var auto=$(".modifyMainAuto").height();
		$(".modifyBtn>button").css({"width":"1.18rem","height":"0.36rem","border":"none","margin":"0.1rem","font-size":"0.16rem","border-radius":"0.05rem"})
		$(".modifyBtn>button:eq(0)").css({"background-color":"#19B4B1","color":"#fff"})
		$(".modifyBtn>button:eq(1)").css({"background-color":"#eee","border":"1px solid #ccc","color":"#555555"})
		$(".bg").css({"width":"100%","height":"100%"})

			
	



// 删除窗口
		$(".close1").on("click",function(){
			$('.modify,.bg').remove()
		})
		$(".modifyBtn>button:nth-child(2)").click(function(){
			$('.modify,.bg').remove()
		})
}



// 信息密码切换
$(".inforTop li").click(function(){
	var ind=$(this).index();
	$(".infor>div").eq(ind).css({"display":"block"}).siblings().css({"display":"none"})
})

$(".inforPassList input").focus(function(){
	var val=$(this).val();
	$(this).val("");

})



$(".nav li:first").hover(function(){
	$(this).children("img").attr("src","static/img/Hover.png")

},function(){
	$(this).children("img").attr("src","static/img/settings.png")
})

$(".nav>ul>li:nth-child(5)").hover(function(){
	$(this).find('a').css("color","#22b7b4")
	$(this).children("img").attr("src",'static/img/infor—Hover.png')
},function(){
	$(this).find('a').css("color","#000")
	$(this).children("img").attr("src",'static/img/infor—Hover.png')
})


function original(title,name){
	$("#main").append('<div class="bg"></div><div class="modify">'+
					'<div style="height: 0.6rem;border-bottom: 1px solid #dddddd;line-height:0.6rem;font-size: 0.18rem;background-color: #eeeeee;">'+
						'<span style="float:left;padding-left:0.21rem">'+title+'</span>'+
						'<img src="static/img/close.png" class="close1" style="float:right;width:0.16rem;height:0.16rem;margin:0.22rem">'+
					'</div>'+
					'<div class="cle"></div>'+
					'<div class="modifyMain" >'+
						'<div class="modifyMainAuto">'+
							'<div><span>'+name+'：</span><input type="number" class="inp" ></div>'+
							'<p class="ts"></p>'+
							'<div style="margin-top:0.2rem"><span>验证码：</span><input type="text" class="inp1"><input type="submit" value="获取验证码" class="submit"></div>'+
						'</div>'+
					'</div>'+
					'<div class="modifyBtn">'+
						'<button>下一步</button>'+
					'</div>'+
					'</div>');
		// // 弹窗样式
		$(".modifyBtn>button").css({"width":"1.18rem","height":"0.36rem","border":"none","margin":"0.1rem","font-size":"0.16rem","border-radius":"0.05rem"})
		$(".modifyBtn>button:eq(0)").css({"background-color":"#19B4B1","color":"#fff"})
		$(".modifyBtn>button:eq(1)").css({"background-color":"#eee","border":"1px solid #ccc","color":"#555555"})
		$(".bg").css({"width":"100%","height":"100%"})
		
		$(".modifyMainAuto>div .inp").change(function(){
			var val=$(this).val()
			if(val==""){
				$(".modifyBtn>button").attr({"disabled":"disabled"})
				$(".ts").html("号码不能为空")
			}else if(!(/^1[34578]\d{9}$/.test(val))){
				$(".modifyBtn>button").attr({"disabled":"disabled"})
				$(".ts").html("请输入正确的手机号码")
			
			}else{
				$(".ts").html('')
				$(".modifyBtn>button").removeAttr("disabled")
			}
	
		})
	
// 删除窗口
		$(".close1").on("click",function(){
			$('.modify,.bg').remove()
		})
}


