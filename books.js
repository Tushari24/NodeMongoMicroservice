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
//pass:password1234
var dbUrl = 'mongodb+srv://tushari24:password1234@mongodbcluster-ifkse.mongodb.net/booksservice?retryWrites=true';

//connect to DB
mongoose.connect(dbUrl, { useNewUrlParser: true }, (err) => {
    try {
        if (err) throw err;
        console.log('booksservice database is Connected!!');
    } catch (err) {
        console.log("error:" + err);
    }

});


app.get('/', (req, res) => {
    res.send(" This is Our main Endpoint.. thank you");
});

/****************************************************************** 
 * create Book function 
 * 
 * @API POST:http://localhost:4545/book  
 * 
 *  ***************************************************************/
app.post('/book', (req, res) => {
    console.log(req.body);

    //setting header
    req.accepts('application/json');

    var newBook = {
        "title": req.body.title,
        "author": req.body.author,
        "numberPages": req.body.numberPages,
        "publisher": req.body.publisher
    }
    //create new book 
    var book = new Book(newBook);
    //console.log("bookmodel:",book);

    book.save((err) => {
        try {
            if (err) throw err;
            console.log("new book created!");

        } catch (err) {
            console.log("Error on Book Save:" + err);
            res.json({ status: "failure" });
        }

    });

    res.type('application/json');
    res.json({ status: "Success" });

});

/****************************************************************** 
 * Get All Book function
 * 
 *  @API GET:http://localhost:4545/books
 * 
 * *****************************************************************/
app.get('/books', (req, res) => {
    console.log("in Books");
    Book.find().then((books) => {
        console.log(books);
        res.json(books);
    }).catch(error => {
        if (error)
            throw error;
        res.json({ status: "failure" });
    });
});

/****************************************************************** 
 * Get Book By ID function
 * 
 *  @API GET:http://localhost:4545/book/id
 * 
 * *****************************************************************/
app.get('/book/:id', (req, res) => {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        let validId = req.params.id;
        Book.findById(validId).then(book => {
            if (book) {
                res.json(book);
            } else {
                res.sendStatus(404);
            }
        }).catch(error => {
            if (error)
                throw error;
            res.json({ status: "failure" });
        });
    }else {
        res.sendStatus(404);
    }
});


/****************************************************************** 
 * Delete Book By ID function
 * 
 *  @API DELETE:http://localhost:4545/book/id
 * 
 * *****************************************************************/
app.delete('/book/:id', (req, res) => {
    console.log("in Books delete");

    Book.findOneAndDelete(req.params.id).then( () => {
        res.json( { status: "success"});
    }).catch( err => {
        if (err) {
            res.json( { status: "failure"});
            throw err;
        }
        
    });

});


app.listen(4545, () => {
    console.log("Up and Running! -- This is Books Service @ http://localhost:4545");
});

