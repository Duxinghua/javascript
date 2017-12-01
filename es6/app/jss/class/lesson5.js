{
	//Symbol的概念 为数据提供独一无二的值
	let a1 = Symbol();
	let a2 = Symbol();
	console.log(a1 === a2);
	//Symbol.for()会去检测全局是否有这个变量，如果有这个变量，则去取，如果没有，则用Symbol()再去初始化这个值
	let a3 = Symbol.for('a3');
	let a4 = Symbol.for('a3');
	console.log(a3 === a4);
	//什么场景用 当别人继承我的属性，让别人无法更改。我们就可以通过Symbol.for()来做这个功能

}
{
	let a1 = Symbol.for('abc');
	let obj = {
		'abc' : 345,
		'c': 456,
		[a1] : '123'
	}
	for (let [key,value] of Object.entries(obj)){
		console.log('let of ',key,value);
	}
	//可以拿到Symbol.for声明的
	Object.getOwnPropertySymbols(obj).forEach(function(item){
		console.log(obj[item]);
	})
	//Reflect.ownKeys
	Reflect.ownKeys(obj).forEach(function(item){
		console.log('ownKeys',item,obj[item]);
	})

}