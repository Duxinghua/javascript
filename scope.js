function f1(){
	var a = 1;
	return function(){
		return a;
	}
}
function f2(){
	return a;
}
//console.log(f2());
//console.log(f1());
var c = f1();
console.log(c());


var n;
function f(){
	var b = "b";
	n = function(){
		return b;
	}
}
console.log(f());
console.log(n());


var getValue,setValue;
(function(){
	var secret = 0;
	getValue = function(){
		return secret;
	}
	setValue = function(v){
		secret = v;
	}
})()

console.log(getValue())
console.log(setValue(222))
console.log(getValue())


function setup(x){
	var i = 0;
	return function(){
		return x[i++];
	}
}

var next = setup(['a','b','c']);
console.log(next());

var a1 = 1;
function ff(){
	var a1 = 2;
	function n(){
		console.log(a1);
	}
	n();
}
ff();



var some_obj = {
	name:'Ninja',
	say:function(who){
		return 'haya ' + who +', i am a '+this.name;
	}
}
console.log(some_obj.say('Dude'))
var my_obj = {name:'Scripting guru'};
console.log(some_obj.say.call(my_obj,'dude'));
