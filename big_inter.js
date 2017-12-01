// var big = require('big.js');
// var x = new big(1000000);
// var y = new big(1000000000000000000);
// console.log(x.div(y).toFixed(18));


var bigDecimal = require('js-big-decimal');

var n1 = new bigDecimal(300000000000);
var n2 = new bigDecimal(1000000000000000000);
var quotient = n1.divide(n2); 

var a = 199999999999999999999999999999999;
var c = bigDecimal.round(quotient.value,18);
console.log(c);
var diff = bigDecimal.add("67.34", "-23.678"); // diff = "43.662"
console.log(diff);
