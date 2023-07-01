import express from 'express';
import morgan from 'morgan';
import productRoutes from '../api/routes/products.js';
import productOrders from '../api/routes/orders.js';
import bodyParser from 'body-parser';
//The app constant represents the Express application
//and will be used to define the server's behavior
//and handle incoming HTTP requests
const app = express();

//const productRoutes = require('../api/routes/products');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
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
/**Defines a middleware that will be applied to all incoming requests in the Express application. 
 * This middleware takes three parameters: 
 * 1. req (request object)
 * 2. res (response object), 
 * 3. next (function to pass control to the next middleware). */
app.use((req, res, next) => {
    /**This allows any origin (domain) to have access to the application's resources through 
     * Cross-Origin Resource Sharing (CORS). By setting it to '*', access is allowed from any origin. */
	res.header('Access-Control-Allow-Origin', '*');
    /**This line sets the response header 'Access-Control-Allow-Headers' with a list of allowed headers in CORS requests. 
     * These headers include 'Origin', 'X-Requested-With', 'Content-Type', 'Accept', and 'Authorization'. 
     * By defining these headers, it allows browsers to send requests with these headers to the application. */
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);
	if (req.method === 'OPTIONS') {
        /**This condition checks if the request method is 'OPTIONS'. 
         * The 'OPTIONS' request is used to verify the allowed communication options between the client and the server. 
         * If the request is 'OPTIONS', it sets the 'Access-Control-Allow-Methods' header with a list of allowed methods, including 'PUT', 'POST', 'PATCH', 'DELETE', and 'GET'. Then, it returns a response with a status code of 200 and an empty JSON object {}. 
         * This indicates that the mentioned methods are allowed in subsequent requests. */
		res.header(
			'Access-Control-Allow-Methods',
			'PUT, POST, PATCH, DELETE, GET'
		);
		return res.status(200).json({});
	}
    /**This line calls the next() function, allowing the request to proceed to the next middleware in the request handling chain. 
     * This is important to ensure that requests are properly processed and continue to other middleware or routes defined in the application. */
    next();
});

app.use('/products', productRoutes);
app.use('/orders', productOrders);

app.use((req, res, next) => {
	const error = new Error('Not found');
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message,
		},
	});
});

export default app;
