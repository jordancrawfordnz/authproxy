# AuthProxy Login Page

This is the login page for AuthProxy.
Grunt is used to automatically build the login page based on configuration or automatically re-build whilst developing.

## Developing
1. Run ``npm install`` to setup the ``npm`` components.
2. Run ``grunt`` to do a build and watch for changes to the files, automatically rebuilding when a change is detected.
3. Point a web server like MAMP at the ``dist`` folder.

## Building
1. Run ``npm install`` to setup the ``npm`` components.
2. Run ``grunt build`` to build.
3. Use the ``dist`` folder as the login page for AuthProxy.

Building is performed automatically when an AuthProxy Docker container is started.