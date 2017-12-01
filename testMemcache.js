var memcache = require('./memcacheHandler.js');
memcache.setValue("abcd","abcd",60);
memcache.setValue("ab","ab",60);
memcache.getValue("abcd",function(error,data){
	console.log(data);
})
memcache.getValue("ab",function(error,data){
	console.log(data);
})