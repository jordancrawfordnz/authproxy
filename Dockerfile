FROM nginx

# Setup the system dependencies.
RUN apt-get update && apt-get install curl ruby -y && curl -sL https://deb.nodesource.com/setup_4.x | bash -
RUN apt-get install nodejs -y

RUN gem install sass
RUN npm install -g bower
RUN npm install -g grunt

	# TODO Remove this, development only!
RUN apt-get install nano vim -y

# Setup the dependencies for the authentication server.
RUN mkdir /authserver
COPY authserver/ /authserver
RUN cd /authserver && npm install

# Setup the NGINX configuration.
	# TODO: Set this up dynamically on run.
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY start.sh /start.sh


# Setup the dependencies for the login page.
COPY loginpage/ /loginpage
RUN cd /loginpage && npm install
#bower install --allow-root	
	# TODO: Setup bower dependencies.

CMD /start.sh