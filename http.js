'use strict';

var http = require("http");
//console.log(http);
var server = http.createServer(function(request,reponse){
	console.log(request.method+":"+request);
	reponse.writeHead(200,{'Content-Type':"text/html"});
	reponse.end('<h1>Hello world!</h1>');
});

server.listen(8080);
