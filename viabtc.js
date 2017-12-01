var md5 = require("md5");
var r = require("request");
var url = 'https://www.viabtc.com/api/v1';
var access_id = '2972CFECC10042C6BFBD031FAD28FC7D';
var secret_key = 'D56616B51D9347879D3DAFCB507726461E6C2E3F074FB77C';
var params = {
	market:'BTCCNY',
	test:1,
	a:2,
}
function obc(object){
	console.log(object);
	var str = [];
	var strs = '';
	for(var i in object){
		str.push(i);
	}
	var arr = str.sort();
	console.log(arr);
	for(var i=0,l=arr.length;i<l;i++){
		strs +=  arr[i] + '=' + object[arr[i]] + '&';
	}
	console.log(strs);
	//strs = strs.substr(0,(strs.length - 1));
	strs = strs + 'secret_key=' + secret_key;
	console.log(strs);
	//console.log(md5(strs+'11')+'++');
	console.log(md5(strs).toUpperCase());
	return md5(strs).toUpperCase();

}
function ticker(pair){
var options = {
	url:url + '/market/ticker',
	qs:{
		market:pair
	
	}

}
r.get(options,function(err,data){
	console.log(err);
	console.log(data.body);
})
}
//ticker("BTCBTC");

function depth(market,merge,limit){
	var options = {url:url + '/market/depth',qs:{market:market,merge:merge,limit:limit}};
	r.get(options,function(err,data){
		console.log(err);
		console.log(data.body);
	})
}

depth("BCCBTC",0.01,10);

function deals(market,last_id){
	var options = {url:url + '/market/deals',qs:{market:market,last_id:last_id}};
	r.get(options,function(err,data){
		console.log(err);
		console.log(data.body);
	})
}

//deals("BTCCNY",0);

function balance(access_id){
	var options = {url:url + '/balance',header:{'authorization':obc({access_id:access_id})},qs:{access_id:access_id}};
	r.get(options,function(err,data){
		console.log(err);
		console.log(data.body);

	})
}
// /balance(access_id);
