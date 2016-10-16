#!/bin/bash

# Build the frontend.
cd /loginpage
grunt build

# Setup and start NGINX.
	# TODO: Setup NGINX config from config file.
nginx

# Start the authentication server.
node /authserver/authenticationserver.js /config/authentication.json