console.time("setTimoutLabel"); //标记时间开始  
setTimeout(function() {  
    console.timeEnd("setTimoutLabel");  //标记时间结束  
}, 100);  
for (var i = 0; i < 100000; i++) { 
	console.log(i);
}  

console.log("test");

for(var i=1; i<=5; i++){  
    setTimeout(function timer(){  
        console.log(i);  
    }, i*100);  
}

for(var i=1; i<=5; i++){  
    setTimeout(function timer(){  
        console.log(i);  
    }, i*1000);  
}
  