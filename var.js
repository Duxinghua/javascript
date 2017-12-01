//公共属性
function Person(name){
	this._name = name;
}

var person = new Person('Joe');
console.log(person._name);

//基于闭包 私有属性
function Persons(name){
	var _name = name;
	this.getName = function(){
		return _name;
	}
}

var tests = new Persons('test');
console.log(tests._name);
console.log(tests.getName());