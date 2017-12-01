{
	//Decorator修饰器是一个函数，修饰类的行为 1是一个函数，2修改类的行为，扩展类的功能，3，在类中有用
	//npm install babel-plugin-transform-decorators-legacy --save-dev
	let readonly = function(target,name,descriptor){
		descriptor.writable = false;
		return descriptor
	}
	class Test{
		@readonly
		time(){
			return '2017-03-11'
		}
	}
	let a = new Test();
	// a.time = function(){
	// 	return '1';
	// }
	console.log(a.time());

}
{
	let typename = function(target,name,descriptor){
		target.myname = 'hello';
	}
	@typename
	class Test{

	}
	console.log('类修饰 ：第三方库 core-decorators',Test.myname);
}
{
	//日志
	let log = (type)=>{
		return function(target,name,descriptor){
			let src_method = descriptor.value;
			descriptor.value = (...arg) => {
				src_method.apply(target,arg);
				console.info(`log ${type}`);
			}
		}
	}

	class AD{
		@log('show')
		show(){
				console.log('ad is show');
		}
		@log('click')
		click(){
			console.log('ad is click');

		}
	}

	let a = new AD();
	a.show();
	a.click();
}