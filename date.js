var time = new Date("2017-5-31 00:00:00");
var year = time.getFullYear();
var month = time.getMonth();
var day = time.getDate();
var mounts = 24 * 60 * 60 * 1000;
console.log(mounts);
console.log(new Date(new Date(year,month,day).getTime()+mounts));;
var times = new Date(new Date(year,month,day).getTime()+mounts);
console.log(times.getFullYear()+"---"+(times.getMonth()+1)+"----"+times.getDate());