# AuthProxy Auth Server

This is a small authentication server, based in NodeJS. This is used by AuthProxy to determine if a username and password is correct and if a token is valid.

## Configuration
The authserver configuration is a JSON file containing user credentials.

This file is of the format:
```
{
  "users" : [
    {
      "username" : "my_user",
      "password" : "my_password"
    }
    ...
  ],
  "port" : [optional port number, default: 3000],
  "allowedOrigin" : [optional allow origin header for CORS. For development purposes when authserver and loginpage are running separately]
}
```

See ``example-config/authserver_raw.json`` for an example.

For simplicity, these are entered in plain text. When the authserver starts, these passwords are hashed to ensure they are safely stored on the server.

After authserver hashes the password, these are of the format:
```
{
  "users" : [
    {
      "username" : "my_user",
      "hashedPassword" : [hashed password gibberish]
    }
    ...
  ],
  ...
}
```

## API Methods

### GET ``/authproxy/auth``
Requires a cookie called ``AuthProxyToken`` to be sent.

Determines if an AuthProxyToken is valid. If it is, responds with status code 200, otherwise 401.

### POST ``/authproxy/login``
Expects a request body containing a JSON object of the format:
```
{
  "username" : "my_user",
  "password" : "my_password",
  "rememberMe" : true
}
```

This checks the user's credentials. If correct, sends a response with the status code 200 and a JSON object of the form:
```
{
  token : [contents of the authentication token]
}
```

If incorrect, responds with a status code 401.

## Usage
- Install NodeJS on your system.
- Run ``npm install`` to install dependencies
- Run ``node authserver [config file path]``

The server will be running on port 3000.
