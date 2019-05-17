//load express
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());

//load mongoose
var mongoose = require('mongoose');

require('./book');
var Book = mongoose.model("book");


//database string
var dbUrl = 'mongodb+srv://tushari24:password1234@mongodbcluster-ifkse.mongodb.net/booksservice';


// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://tushari24:<password>@mongodbcluster-ifkse.mongodb.net/test?retryWrites=true";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

//connect
mongoose.connect(dbUrl, { useNewUrlParser: true }, (err) => {   
    console.log('booksservice database is Connected')
});


app.get('/', (req, res) => {
    res.send(" This is Our main Endpoint.. thank you");
});

//create Book function @API :/book
app.post('/book', (req, res) => {
    console.log(req.body);
    var newBook = {
        "title": req.body.title,
        "author": req.body.author,
        "numberPages": req.body.numberPages,
        "publisher": req.body.publisher
    }

    //create new book 
    var book = new Book(newBook);
    //console.log("bookmodel:",book);

    book.save( (err) => {
        console.log(err);
    });
    // .then( () => {
    //     console.log("new book created!");
    // }).catch( (err) => {
    //     if(err) {
    //         throw err;
    //     }
    // });

    res.send("new Book Created with success");

});


app.get('/books', (req,res) => {
    console.log("in Books");
    Book.find().then( (books) => {
        console.log(books);
    });
});





app.listen(4545, () => {
    console.log("Up and Running! -- This is Books Service @ http://localhost:4545");
});

