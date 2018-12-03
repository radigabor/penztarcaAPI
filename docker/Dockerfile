FROM node:latest
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app

RUN npm install -g swagger
RUN npm install
EXPOSE 8080
EXPOSE 5432
EXPOSE 8001
EXPOSE 8000
EXPOSE 8443
EXPOSE 10010
EXPOSE 10011

CMD node app.js