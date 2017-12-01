var array = [{a:'a',b:1},{a:'a',b:1},{a:'a',b:1},{a:'a',b:1},{a:'b',b:2},{a:'b',b:2}];
var aa=[];
var obj={};
array.forEach(function(i){
	console.log(i.a)
	if(!obj[i.a]){
	obj[i.a] = i.b;
	aa.push(obj[i.a]);
	//obj = {};
   }else{
   	obj[i.a] += i.b;
   }
})
console.log(obj)
console.log(aa)