/*This line imports the 'express' module, which is a popular framework for building web applications 
in Node.js. It allows us to create a web server and handle HTTP requests and responses.*/
import express from 'express';
/*We create a router object using the Router method provided by the Express framework. 
The router object allows us to define routes and their corresponding handlers. */
const router = express.Router();

/*This code defines a GET route handler for the path /. When a GET request is made to this path, 
the callback function is executed. In this case, it sends a JSON response with a message indicating 
that it is handling GET requests to the /products path.*/
router.get('/', (req, res, next) => {
	res.status(200).json({
		message: 'Handling GET requests to /products',
	});
});

router.post('/', (req, res, next) => {
	const product = {
        name: req.body.name,
        price: req.body.price
    }
    res.status(201).json({
		message: 'Handling POST requests to /products',
        createdProduct: product
	});
});

router.get('/:productId', (req,res,next)=>{
    const id = req.params.productId;
    if(id=== 'special'){
        res.status(200).json({
            message: 'You discovered the special ID',
            id: id
        });
    }else{
        res.status(200).json({
            message: 'You passed an ID'
        })
    }
})

router.patch('/:productId', (req,res,next)=>{
    res.status(200).json({
        message: 'Updated product'
    });
});

router.delete('/:productId', (req,res,next)=>{
    res.status(200).json({
        message: 'Deleted product'
    });
});

export default router;
