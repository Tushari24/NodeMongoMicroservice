var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var axios = require('axios');

app.use(bodyParser.json());

const successJSON = { "status": "success" };
const failureJSON = { "status": "failure" };

//DbString
const DBURL = 'mongodb+srv://tushari24:password1234@mongodbcluster-ifkse.mongodb.net/ordersservice?retryWrites=true';

mongoose.connect(DBURL, { useNewUrlParser: true }).then(() => {
    console.log("Connected to Orderservice Database!!!!");
}).catch((err) => {
    if (err)
        throw err;
});

//Load Model
require('./order')
var Order = mongoose.model('Order');



app.get('/', (req, res) => {

    res.json({ "status": "success" });
});

/****************************************************************** 
 * Create Order function 
 * 
 * @API POST:http://localhost:7777/order 
 * 
 *  ***************************************************************/
app.post("/order", (req, res) => {

    var newOrder = {
        CustomerID: mongoose.Types.ObjectId(req.body.CustomerID),
        BookID: mongoose.Types.ObjectId(req.body.BookID),
        intialDate: req.body.intialDate,
        deliveryDate: req.body.deliveryDate
    }

    var order = new Order(newOrder);

    order.save().then(() => {
        console.log("Order Saved !!!!");
        res.json(successJSON);
    }).catch((err) => {
        if (err) {
            res.sendStatus(404);
            throw err;
        }
    });

});

/****************************************************************** 
 * Get All Order function 
 * 
 * @API GET:http://localhost:7777/orders
 * 
 *  ***************************************************************/
app.get("/orders", (req, res) => {

    Order.find().then((orders) => {
        res.json(orders);
    }).catch((err) => {
        if (err)
            throw err;
    });

})

/****************************************************************** 
 * Get Order By Id function
 * 
 *  @API GET:http://localhost:7777/order/id
 * 
 * *****************************************************************/
app.get("/order/:id", (req, res) => {

    Order.findById( req.params.id ).then( (order) => {
        if (order) {
           // res.json(order);
            axios.get( "http://localhost:5555/customer/" + order.CustomerID ).then( ( responce ) => {
                //console.log( responce.data );

                var orderObject = { customerName: responce.data.name , bookTitle: '' };

                axios.get("http://localhost:4545/book/" + order.BookID ).then( ( responce ) => {
                    //console.log( responce.data );
                    
                    orderObject.bookTitle = responce.data.title;
                    res.json( orderObject );
                })

            }).catch( (err) => {
                if(err)
                throw err;
            })
            //res.send( "Order responce recived");
        } else {
                res.json(failureJSON);
        }
    })
});




app.listen(7777, "127.0.0.1", () => {
    console.log("Up and Running - Orders Service @ http://localhost:7777");
});