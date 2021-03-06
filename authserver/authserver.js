var express = require('express');
var jsonfile = require('jsonfile');
var bcrypt = require('bcryptjs');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser')

const saltRounds = 10;
var app = express();
app.use(bodyParser.json());
app.use(cookieParser());

// Get the file path from the command line arguments.
if (process.argv.length !== 3) {
	console.log('Invalid arguments.\nUse: node authserver [config file path]');
	process.exit();
}
var configFilePath = process.argv[2];
console.log('Loading config from: ' + configFilePath);

// Load the configuration file provided as an argument.
var configuration = jsonfile.readFileSync(configFilePath);

// Check required fields are provided.
var requiredFieldsProvided = true;
if (!configuration.users || Array.isArray(configuration.users)) {
	requiredFieldsProvided = false;
}

if (requiredFieldsProvided) {
	console.log('Required field not provided.');
	process.exit();
}

var usersValid = true;
var needsSave = false;

var users = {};
// Check each password is hashed and has a username and password.
configuration.users.forEach(function(details) {
	if (details.password) {
		// Bcrypt the password.
		var salt = bcrypt.genSaltSync(saltRounds);
		details.hashedPassword = bcrypt.hashSync(details.password, salt);
		delete details.password; // remove the plain text password.
		needsSave = true;
	} else if (!details.hashedPassword) {
		// If no hashed or plain text password, the user is invalid.
		usersValid = false;
	}
	// If this username has already been seen, the users aren't valid.
	if (users[details.username]) {
		usersValid = false;
	} else {
		users[details.username] = details; // Store the user in an object for easier lookup.
	}
});

if (!usersValid) {
	console.log('Not all users have a password or hashedPassword set.');
	process.exit();
}

// Re-write the config file if it needs to be saved.
if (needsSave) {
	jsonfile.writeFileSync(configFilePath, configuration, {spaces: 2});
}

// Generates the JWT token secret for a user.
function generateSecret(user) {
	// The secret relies on the username and password for this user.
		// If the user is removed or the password changed, existing tokens will stop working.
	return user.username + user.hashedPassword;
}

if(configuration.allowedOrigin) {
	app.use(function(req, res, next) {
		res.header('Access-Control-Allow-Origin', configuration.allowedOrigin);
		res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
		next();
	});

	app.options('*', function(req, res, next) {
		res.send(200);
	});
}

// Check the users credentials. If valid, provide a token.
app.post('/authproxy/login', function(req, res) {
	var username = req.body.username;
	var password = req.body.password;
	var rememberMe = req.body.rememberMe;

	if (!username || !password) {
		res.status(401).send();
		return;
	}
	// Find the user who is logging in.
	var user = users[username];

	// If the user can't be found, respond with an authentication error.
	if (!user) {
		res.status(401).send();
		return;
	}

	// Check the provided password against the user's password.
	if (!bcrypt.compareSync(password, user.hashedPassword)) {
		// If invalid, respond with an authentication error.
		res.status(401).send();
		return;
	}

	// If valid, generate a JWT token and return this.
	var token = jwt.sign({
		username : username
	}, generateSecret(user), {
		expiresIn : rememberMe ? '30d' : '3h'
	});
	res.send({
		token : token
	});
});

// Check the token in the cookies is valid.
app.get('/authproxy/auth', function(req, res) {
	// Check the cookie provided with the request.
	var token = req.cookies.AuthProxyToken;

	// If no cookie, respond with an authentication error.
	if (!token) {
		res.status(401).send();
		return;
	}

	// Get the user for this token.
	var decodedToken = jwt.decode(token);
	if (!decodedToken || !decodedToken.username) {
		res.status(401).send();
		return;
	}

	// If the user does not exist, respond with an authentication error.
	var user = users[decodedToken.username];
	if (!user) {
		res.status(401).send();
		return;
	}

	// TODO: Check if correct JWT authentication method?

	// Verify the token.
	jwt.verify(token, generateSecret(user), null, function(error) {
		if (error) {
			res.status(401).send();
		} else {
			// Valid token. Respond with a 200 status code.
			res.send();
		}
	});
});

var port = configuration.port || 3000;
app.listen(port, function() {
	console.log('AuthProxy server is running on port ' + port + '.');
});
