

function abc(n){
var amount = Math.floor(Math.random()*100);
  return   new Array(n>(amount+'').length?(n-(''+amount).length+1):0).join(0)+amount
        

 }
 for(var i=0;i<1000;i++){
console.log(abc(2)/100);
}
