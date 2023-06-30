// Import the http module from Node.js
//This module provides functionality for creating 
//HTTP servers and making HTTP requests
import http from 'http';
import app from './app.js';

//which allows the server to use the port specified by the hosting environment 
//(such as Heroku or a cloud provider)
const port = process.env.PORT || 3000;

//Create an HTTP server 
//The app object handles incoming HTTP requests 
//and defines the server's behavior.
const server = http.createServer(app);

//starts the server and makes it listen 
//on the specified port
server.listen(port);
// Once the server is started, 
//it will be able to handle incoming HTTP requests on that port