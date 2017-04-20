//检测对象是否为空 Jquery的写法 
//1.如果是空对象for语句中的return 是不会运行的，如果是对象，则运行
//2.for in遍历对象
function isEmptyObject(value){
	var b;
	for(b in value){
		return !1;
	}
	return !0;

}

isEmptyObject({a:1});
//原生写法，判断对象是否为空 使用到了instanceof（引用类型）  type（值类型）判断类型
//typeof输出的集中类型标识，其中上面的四种（undefined, number, string, boolean）属于简单的值类型，不是对象。
//剩下的几种情况——函数、数组、对象、null、new Number(10)都是对象 引用类型
var objects = {};

function emptyObject(objects){
if (typeof objects === "object" && !(objects instanceof Array)){  
    var result = true;  
    for (var prop in objects){  
        result = false;  
        break;  
    }  
    return result;   
} 
}
console.log(emptyObject(objects));



