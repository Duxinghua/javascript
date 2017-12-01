var ApplicationMemcache = require("./memcache.js");
function memcacheHandler(){}

memcacheHandler.prototype.setValue = function(key,value,liftime){
	ApplicationMemcache.set(key, value, function(error, result){

	// lifetime is optional. the default is
	// to never expire (0)

	}, liftime);
}

memcacheHandler.prototype.getValue = function(key,callback){
	ApplicationMemcache.get(key, function(error, result){

	// all of the callbacks have two arguments.
	// 'result' may contain things which aren't great, but
	// aren't really errors, like 'NOT_STORED'
	if(error){
		callback(error,null);
	}else{
		callback(null,result);
	}

	});
}

module.exports = new memcacheHandler();