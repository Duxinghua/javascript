function Obj(value){
	this.value = value;
	this.next = null;
}

Obj.prototype[Symbol.iterator] = function (){
	var iterator  = {
		next: next
	};
	var current = this;
	function next(){
		if(current){
			var value = current.value;
			current = current.next;
			return {
				done:false,
				value:value
			};

		}else{
			return {
				done:true
			}
		}
		return iterator;
	}
}

var one = new Obj(1);
var two = new Obj(2);
var three = new Obj(3);
one.next = two;
two.next = three;
for(var i of one){
	console.log(i);
}

/*
Account ID:

GBDKBZUGEPEQT2CT7P6XCVSBMS3NIMRJZA4NWSHF6XSTXLH25I2UGYKC

Secret key:

SA52LB3QRKLCFL57BT25YWTSF464PD27NM5TQPGSYBFS55YWCYGZY3UK



GBDKBZUGEPEQT2CT7P6XCVSBMS3NIMRJZA4NWSHF6XSTXLH25I2UGYKC
*/