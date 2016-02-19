"use strict";

var querystring = require("querystring"),
	fs = require("fs");




// get app.js to browser
function app (response) {
	console.log("Request handler 'app' was called.");

	fs.readFile("app.js", "binary", function(error, data) {
		if(error) {
			console.log (error);
		} else {
			response.writeHead(200, {"Content-Type": "text/script"});
			response.write(data, "binary");
			response.end();
		}
	});

}

exports.app = app;
