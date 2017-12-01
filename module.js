//准备module对象
var module = {
	id:'hello',
	exports:{}
};
var load = function (module){
	//读取的hello
	function greet(name){
		console.log('hello ,'+ name + "!");
	}
	module.exports = greet;
	return module.exports;
}
var exported = load(module);
var name = 'test';
console.log(exported(name));