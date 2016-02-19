// add dependencies
var http = require("http");
var url = require("url");
var chat = require("./server-blocks");

// create callback functions object
var handle = {};
handle["/app.js"] = chat.app;

// start server
http.createServer( (request, response) => {

    // get pathname to call function after
    var pathname = url.parse(request.url).pathname;

    // if we have function for this url => go there
    if (typeof handle[pathname] === 'function') {
        handle[pathname](response, request);

    // if we don't have function => 404 error
    } else {
        console.log("No request handler found for " + pathname);
        response.writeHead(404, {"Content-Type": "text/html"});
        response.write("404 Not found");
        response.end();
    }

}).listen(8080);