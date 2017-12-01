var memcache = require('memcache');

var client = new memcache.Client(11211, 'localhost');
//client.port = 11211;
//client.host = 'localhost';

function ApplicationMemcache(){
  client.on('connect', function(){
    // no arguments - we've connected
    console.log("memcache connect")
  });

  client.on('close', function(){
    // no arguments - connection has been closed
    console.log("memcache close")
  });

  client.on('timeout', function(){
    // no arguments - socket timed out
    console.log("memcache timeout")
  });

  client.on('error', function(e){
    // there was an error - exception is 1st argument
    console.log("memcache error",e)
  });

// connect to the memcache server after subscribing to some or all of these events
  client.connect()
  return client;
}



module.exports = new ApplicationMemcache();