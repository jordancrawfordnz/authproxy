# AuthProxy Login Page

This is the login page for AuthProxy.
Grunt is used to build the login page based on configuration or automatically re-build whilst developing.

## Command Line Options
**``config-path``**

Required. The login page is built using the configuration file provided. This option specifies the relative file path to the login page configuration file.

**``resources-prefix``**

Optional, defaults to no prefix. Specifies the prefix to use for supplementary files, e.g.: JavaScript and CSS files. This is not needed in development, but is required in AuthProxy where these resources may not be served relative to the path of the login page.

## Configuration
A JSON file of options is provided to build the login page. This consists of the following options at the root level:

**``title``**

Default: "Login". Typically this is the name of the service being authenticated.

**``subTitle``**

Optional. Typically this is a call to action or further description of the service.

**``accent``**

Default: #20A2E8. This is the colour of the icon bubble and the login button.

**``iconUrl``**

Optional, icon bubble not shown if not provided. The full path to an image URL to show in the icon bubble. This should be no bigger than 256x256. See the AuthProxy readme for how to host your own resources with AuthProxy.

## Usage
### Developing
1. Run ``npm install`` to setup the ``npm`` components.
2. Run ``grunt --config-path=[path to config file]`` to run a development server at ``localhost:9000``.
3. Changes to files (excluding the configuration) will be updated automatically when a change is detected. Refresh the page to see your changes.

### Building
1. Run ``npm install`` to setup the ``npm`` components.
2. Run ``grunt build --config-path=[path to config file] --resources-prefix=[resources prefix to use]`` to build.
3. Use the ``dist`` folder as the login page for AuthProxy.

This builds a completely static copy of the login page. The login page is built as part of the Docker build process, which will provide the appropriate build arguments.
