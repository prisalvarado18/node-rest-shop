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
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);
	if (req.method === 'OPTIONS') {
		res.header(
			'Access-Control-Allow-Methods',
			'PUT, POST, PATCH, DELETE, GET'
		);
		return res.status(200).json({});
	}
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
