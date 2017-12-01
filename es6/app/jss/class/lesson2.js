{
	let arr = Array.of(2,3,4,77,9,11);
	console.log(arr);
	let empty = Array.of();//空
	console.log("empty =>",empty);

}
{
	let p = document.querySelectorAll("p");
	let pFm = Array.from(p);
	//console.log(pFm);
	pFm.forEach(function(item){
		console.log(item.textContent);
	})
	//第一个参数是数组，第二个是函数，相当于map
	console.log(Array.from([1,3,5],function(item){
		return item + 2;
	}))



}

{
	//兼容性问题
	console.log('fil-8',[1,'a',undefined].fill(7));
	console.log('fill,pos',['a','b','c'].fill(7,1,3));
}
{
	//兼容性问题
	for(let index of['1','c','ks'].keys()){
			console.log('keys',index);
	}
	for(let value of['1','c','ks'].values()){
		console.log('values',value);
	}
}
{
	for(let [index,value] of ['1','c','kc'].entries()){
		console.log('index,value',index,value);
	}
}

{
	console.log([1,2,3,4,5].copyWithin(0,3,4));
}
{
	//数组查找 find就找到第一个
	console.log([1,2,3,4,5,6].find(function(item){
		return item > 3;
	}))
	//findIndex 下标
	console.log([1,2,3,4,5,6].findIndex(function(item){
		return item > 3;
	}))
	//includes 可以查找nan
	console.log([1,NaN].includes(1));
	console.log([1,NaN].includes(NaN));
}