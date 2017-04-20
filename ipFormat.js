//关于位移，代码中学的
//IP地址转换为数值
//
function ipForNumber(ip){
	var ipl = 0;
	if(ip){
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