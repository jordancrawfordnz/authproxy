FROM nginx

RUN apt-get update && apt-get install curl -y && curl -sL https://deb.nodesource.com/setup_4.x | bash -
RUN apt-get install nodejs -y
RUN apt-get install nano vim -y

RUN mkdir /authserver
COPY package.json /authserver/package.json
RUN cd /authserver && npm install

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY simpleserver.js /authserver/simpleserver.js

# TODO: Support automatically building the frontend, including pulling bower resources.
COPY loginpage/ /loginpage

CMD nginx && node /authserver/simpleserver.js