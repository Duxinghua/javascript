{
	//函数参数默认值的问题 默认值后面不能再有未赋值的参数
	function test(x,y = "world"){
		console.log(x,y);
	}
	test("hello");
	test("hello","abc");

}
{
	let x = 'test';
	function test2(x,y=x){
		console.log("作用域",x,y);
	}
	test2("kill");
	test2();
	function test3(c,y=x){
		console.log("作用域",c,y);
	}
	test3("a");
}
{
	//arg 自动转成数组，res之后再也没有参数
	function test4(...arg){
		for(let v of arg){
			console.log('rest',v);
		}
	}
	test4(1,2,3,4,5,"a");
	console.log(...[1,2,3]);//把这个数级转成离散的值
	console.log('a',...[1,2,3]);
}
{
	let arrow = v => v+2;
	console.log('arrow',arrow(3));
	//箭头函数  函数名  参数 返回值
	let arrow2 = () => 5;
	console.log('arrow2',arrow2());
	//尾调用 不断的嵌套多个函数，如果能写成尾调用，就可以换成尾调用

}
{
	function tail(x){
		console.log('tail',x);
	}
	function tx(x){
		return tail(x);

	}
	tail(123);
}

