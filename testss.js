var a = 100000000;
var b = 1000000000000000000;
function user(a,b){
	var al = new String(a).length;
	var bl = new String(b).length;
	var e = al - bl > 0 ? al : bl;
	console.log(e);

}
user(a,b);