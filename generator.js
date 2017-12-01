function * helloWorldGener(){
	yield 'hello';
	yield 'world';
	return 'ending';
}

var hw = helloWorldGener();
console.log(hw.next());
console.log(hw.next());
console.log(hw.next());
console.log(hw.next());
console.log(hw.next());
function * gen(){
	yield 123 + 456;
}

var t = gen();
console.log(t.next());


function * f(){
	console.log("执行了!");
}

var generator = f();
setTimeout(function(){
	generator.next()
},2000);

var arr = [1, [[2, 3], 4], [5, 6]];

var flat = function＊ (a) {
  a.forEach(function item) {
    if (typeof item !== 'number') {
      yield* flat(item);
    } else {
      yield item;
    }
  });
};

for (var f of flat(arr)){
  console.log(f);
}
