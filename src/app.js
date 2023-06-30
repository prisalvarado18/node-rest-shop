import express from 'express';
import productRoutes from '../api/routes/products.js';
//The app constant represents the Express application 
//and will be used to define the server's behavior 
//and handle incoming HTTP requests
const app = express();

//const productRoutes = require('../api/routes/products');

//Set up a middleware function that will be executed 
//for every incoming request to the server 
//It then defines a middleware function using app.use() 
//to handle incoming requests and 
//send a JSON response with the message 'It works!'
/*app.use((req, res, next) => {
    res.status(200).json({
        message: 'It works!'
    });
});*/
app.use('/products', productRoutes);

export default app;