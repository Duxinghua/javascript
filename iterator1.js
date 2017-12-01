var it = idMaker();
function idMaker(){
	var index = 0;
	return {
		next:function(){
			return {value:index++,done:false};
		}
	}
}

console.log(it.next().value);
console.log(it.next().value);

console.log(it.next().value);

console.log(it.next().value);
console.log(it.next().value);

let arr = ['aa','bb','cc'];
let iter = arr[Symbol.iterator]();
console.log(iter.next());
console.log(iter.next());

for(let i of arr){
	console.log(i);
}

class RangeIterator{
	constructor(start,stop){
		this.value = start;
		this.stop = stop;
	}

	[Symbol.iterator](){return this;}
	next(){
		var value = this.value;
		if(value < this.stop){
			this.value++;
			return {done:false,value:value};
		}
		return {done:true,value:undefined}
	}
}

function range(start,stop){
	return new RangeIterator(start,stop);
}

for(var value of range(0,30)){
	console.log(value);
}

