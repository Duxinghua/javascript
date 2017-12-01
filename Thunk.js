var fs = require("fs");
var thunkify = require("thunkify");
var x = 2;
function f(m){
	return m*2;
}
//f(x+5);
console.log(f(x+5));
//传名函数 将参数放到一个临时函数中，再将这个临时函数传入函数体，这个临时函数就叫做Thunk函数
//传名调用的一种实现策略，用来替换某个表达式
//在javascript语言中，tHUNK函数替换的不是表达式，而是多参数函数，将其替换成单参数的版本，且只接受回调函数作为参数


var thunk = function(){
	return x+5;
}
function fss(thunk){
	return thunk()*2;
}
// console.log(fss(thunk));
fs.readFile("./11.txt",'utf8',function(err,data){
	console.log(data);
})
var filename = "11.txt"
var readFileFound = Tests(filename);
readFileFound(function(data){
	console.log(data);
})
var Tests = function(filename){
	return function(callback){
		return fs.readFile(filename,"utf8",callback);
	}
}


var read = thunkify(fs.readFile);
read("11.txt")(function(err,str){console.log(str)});

