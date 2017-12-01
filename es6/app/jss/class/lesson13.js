// export let a = 123;
// export function test(){
// 	console.log('test');
// }
// export class H{
// 	test(){
// 		console.log('class');

// 	}
// }
let a = 13;
let test = function(){
	console.log('test');
}
class Hello{
	test(){
		console.log('class');
	}
}

export default{
	a,
	test,
	Hello
}