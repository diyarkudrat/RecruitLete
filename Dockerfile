# Node base docker image
FROM node:10

RUN apt-get -q update && apt-get -qy install netcat

# Directory to put code in app folder
WORKDIR /app

# Add package.json file into app directory
COPY package.json /app

# install dependencies
RUN npm install

# Copy code into app directory
COPY . /app

# command to run node app
CMD npm start server.js

# Application's default port
EXPOSE 3000
