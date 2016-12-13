#!/bin/bash

# Build the frontend.
cd /loginpage
grunt build

# Setup and start NGINX.
nginx

# Start the authentication server.
node /authserver/authenticationserver.js /config/authentication.json
