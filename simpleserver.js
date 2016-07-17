var http = require('http');
var Cookies = require('cookies');

var PORT=8080;

var server = http.createServer(function(request, response) {
	var cookies = new Cookies(request, response);
	var authTokenCookie = cookies.get('AuthProxyToken');

	if (!authTokenCookie) {
		// No cookie, respond with an error.
		response.statusCode = 401;
		response.statusMessage = 'Authentication failed. No cookie.';
		response.end();
	} else {
		// TODO: Check the token value is an expected one.
		response.end();
	}

}).listen(PORT);
