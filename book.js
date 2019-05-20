var mongoose = require('mongoose');

// here model name is "book" followed by prototype
mongoose.model("book",{
    //Title, Author, numberPages , publisher

    title: {
        type: String,
        require: true
    },
    author: {
        type: String,
        require: true
    },
    numberPages: {
        type: Number,
        require: false
    },
    publisher: {
        type: String,
        require: false
    }

});