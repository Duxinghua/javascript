var numbers = [1,2,3];
console.log(numbers);
numbers.length = 0; //删除数组元素
console.log(numbers);
console.log(Array.isArray(numbers));//判断是否是数组


//生成数组
var nums = [];
for(var i=0;i<100;++i){
	nums[i]=i+1;
}

console.log(nums);
//通过for循环读取值并求和
var sum = 0;
for(var i=0;i<nums.length;++i){
	sum += nums[i];
}

console.log(sum);

//由字符串生成数组
var string = "the quick brown fox jumped over the lazy dog";
var words = string.split(" ");
console.log(words.length);

//数组浅复制 引用，其中一个改变，会影响另一个
var arr1 = words;
console.log(arr1);

//将数组中的每一个元素复制到新元素中，深复制
function copy(arr1,arr2){
	for(var i=0;i<arr1.length;++i){
		arr2[i]=arr1[i];
	}
}


//查找数组中的元素
var stringAr = ["a","a","b","c"];
console.log(stringAr.indexOf("a"));
console.log(stringAr.lastIndexOf("a"));
//数组字符串表示
console.log(stringAr.join());
console.log(stringAr.toString());
//由已有数组生成新数组
console.log(stringAr.concat(["a","d"]));
var c = stringAr.splice(1,0,"aa","bb");
console.log(c);
console.log(stringAr);
//添加元素
console.log(stringAr[stringAr.length] = "aa");
console.log(stringAr.push("aa"));
console.log(stringAr.unshift("tt"));
//删除元素
console.log(stringAr.pop());
console.log(stringAr.shift());

//从数组中间位置添加和删除元素
var nums = [1,2,3,7,8,9];
var newElements = [4,5,6];
console.log(nums.splice(1,0,4,5,6,99,99,9999,100000));
//sort()如果元素是字符串，可以使用它来排序
console.log(nums.sort());
//如果是数字
function compare(num1,num2){
	return num1 - num2;
}
console.log(nums.sort(compare));

//数据迭代器 对数组中的每个元素执行某种操作，要么返回一个值
function square(num){
	console.log(num,num*num);
}
nums.forEach(square);
nums.forEach(function(i,v){
	console.log(i,v);
})

//every 该方法接受一个返回值为布尔类型的函数，对数组中的每个元素使用该函数 ，所有返回true,则返回true.
function isEven(num){
	return num%2 == 0;
}

if(nums.every(isEven)){
	console.log("all");
}else{
	console.log("not all");
}

//some() 方法也接受一个返回值为布尔类型的函数,只要有一个元素使得该函数返回 true,该方法就返回 true。
if(nums.some(isEven)){
	console.log("some");
}else{
	console.log("no");
}

//reduce() 方法接受一个函数,返回一个值。该方法会从一个累加值开始,不断对累加值和 数组中的后续元素调用该函数,直到数组中的最后一个元素,最后返回得到的累加值。
function add(runningTotal, currentValue) {
    return runningTotal + currentValue;
}

console.log(nums.reduce(add));
//JavaScript 还提供了 reduceRight() 方法,和 reduce() 方法不同,它是从右到左执行。下面 的程序使用 reduceRight() 方法将数组中的元素进行翻转


//生成新数组的迭代器 map(),filter()
function curve(num){
	return num+5;
}

console.log(nums.map(curve));

function first(word){
	return word[0];
}
console.log(words.map(first));
//filter() 和 every() 类似,传入一个返回值为布尔类型的函数。和 every() 方法不同的是, 当对数组中的所有元素应用该函数,结果均为 true 时,该方法并不返回 true,而是返回 一个新数组,该数组包含应用该函数后结果为 true 的元素

console.log(nums.filter(isEven));

//JavaScript 只支持一维数组,但是通过在数组里保存数组元素的方式,可以轻松创建多维数组

//对象数组

function Point(x,y) {
this.x = x;
this.y = y; 
}
function displayPts(arr) {
   for (var i = 0; i < arr.length; ++i) {
   console.log(arr[i].x + ", " + arr[i].y);
   }
}
var p1 = new Point(1,2);
var p2 = new Point(3,5);
var p3 = new Point(2,8);
var p4 = new Point(4,4);
var points = [p1,p2,p3,p4];
for (var i = 0; i < points.length; ++i) {
    console.log("Point " + parseInt(i+1) + ": " + points[i].x + ", " + points[i].y);
}
var p5 = new Point(12,-3);
points.push(p5);
console.log("After push: ");
displayPts(points);
points.shift();
console.log("After shift: ");
displayPts(points);



