# AuthProxy

### Building
Use ``docker build -t jordancrawford/authproxy .`` from the root directory of the project.
This will setup the image and download dependencies for the login page and authentication server.


### Running
When AuthProxy runs, the login page is built based on the configuration and the authentication server starts using the current configuration.
If the configuration changes, you should restart the container for the changes to take effect.

*Configuration:*
Run AuthProxy with:
``docker run -d -v [config location]:/config jordancrawford/authproxy``

<!-- TODO: Mention that the configuration will automatically produce the hashed password and clear out the plaintext password. -->

*Running with the command line:*


*Running through Docker Compose:*
<!-- TODO -->