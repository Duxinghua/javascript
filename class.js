class point{
	constructor(x,y){
		this.x = x;
		this.y = y;
	}

	toString(){
		return '('+this.x+','+this.y+')';
	}
}
console.log(typeof point);
console.log(point === point.prototype.constructor)
Object.assign(point.prototype,{toValue(){
	return this.x;
}})




var b = new point(1,5);
console.log(b.toValue());
console.log(Object.keys(point.prototype));
console.log(Object.getOwnPropertyNames(point.prototype))