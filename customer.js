var mongoose = require('mongoose');

mongoose.model('customer',{

    name: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        require: true
    },
    address: {
        type: String,
        require: false
    }

});