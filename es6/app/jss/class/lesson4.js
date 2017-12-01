{
	//简洁表示法
	let  o = 1;
	let k = 2;
	let es5 = {
		o:o,
		k:k
	}
	let es6 = {
		o,k
	}
	console.log(es5);
	console.log(es6);
	let  es5_method = {
		hello:function(){
			console.log('hello');
		}
	}
	console.log(es5_method.hello());
	let es6_method = {
		hello(){
			console.log('es6 hello');
		}
	}
	console.log(es6_method.hello())
}
{
	//属性表达式
	let a = 'b';
	let es5_obj = {
		a:'c',
	}
	let es6_obj = {
		[a]:'c'
	}
	console.log(es5_obj,es6_obj);

}
{
	//新增api
	console.log('string',Object.is('abc','abc'),'abc' === 'abc');
	console.log('array',Object.is([],[]),[] === []);//地址引用

	//copy
	console.log('copy',Object.assign({a:'a'},{b:'b'})); //浅复制 不会复制继承  不可枚举

	let test = {k:123,o:456};
	for(let [key,value] of Object.entries(test)){
		console.log([key,value]);
	}

}

{
	//扩展运算符
	//let {a,b,...c} = {a:'test',b:'kill',c:'ddd',d:'ccc'};
	//let {a,b,...c} = {a:'test',b:'kill',c:'ddd'}

}