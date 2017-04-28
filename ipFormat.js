//关于位移，代码中学的
//IP地址转换为数值
//
function ipForNumber(ip){
	var ipl = 0;
	//console.log(ip);
	if(!ip){
		return null;
	}
	ip.split('.').forEach(function(octet){
		ipl <<= 8;
		ipl += parseInt(octet);

	});
	return ipl >>> 0;
}

//数值转换为ip
function numberForIp(number){
	var d = number%256;
	 for (var i = 3; i > 0; i--)
    {
        num = Math.floor(num/256);
        d = num%256 + '.' + d;
    }
    return d;
}

var ips =["123.114.60.176","192.30.255.113","111.13.100.91","216.58.200.46"];
console.log(ipForNumber("123.114.60.176"));
for(var l = ips.length;l--;){
	console.log(ipForNumber(ips[l]));
}

