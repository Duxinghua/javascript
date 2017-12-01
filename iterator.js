function makeIterator(array){
	var nextIndex = 0;
	return{
		next:function(){
			return nextIndex < array.length ? 
			{value:array[nextIndex ++],done:false} :
			{value:undefined,done:true};
		}
	};
}

var it = makeIterator(['a','b']);
console.log(it.next());


let arr = ['a','b','c'];
let lter = arr[Symbol.iterator]();
console.log(lter.next());
console.log(lter.next());
console.log(lter.next());
console.log(lter.next());
console.log(lter.next());
