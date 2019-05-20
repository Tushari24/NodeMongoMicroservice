//load express
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

//Allows App to recieve jason data
app.use(bodyParser.json());

//load mongoose
var mongoose = require('mongoose');

//load Model
require('./customer');
var Customer = mongoose.model("customer");

//database string
//pass:password1234
var dbUrl = 'mongodb+srv://tushari24:password1234@mongodbcluster-ifkse.mongodb.net/customerservice?retryWrites=true';

//connect to DB
mongoose.connect(dbUrl, { useNewUrlParser: true }, (err) => {
    try {
        if (err) throw err;
        console.log('customerservice database is Connected!!');
    } catch (err) {
        console.log("error:" + err);
    }

});

app.get('/', (req,res) => {

    res.send("your are at main point of Customers Service");
});

/****************************************************************** 
 * create Customer function 
 * 
 * @API POST:http://localhost:5555/customer 
 * 
 *  ***************************************************************/
app.post('/customer', (req,res) => {
     
    var newCustomer = {
        name: req.body.name,
        age: req.body.age,
        address: req.body.address
    }
    console.log(newCustomer);
    var customer = new Customer(newCustomer);

    customer.save().then( ()=> {
        res.json( { status: "Success" } );
    }).catch( err =>{
         if (err)
         throw err;
    })
})









app.listen("5555", () => {
    console.log("Up and Running - Customers Service @ http://localhost:5555/");
})