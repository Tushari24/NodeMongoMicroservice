var express = require('express');
var app = express();

app.get('/', function (req, res) {
   
    var sql = require("mssql");

    // config for your database
    var config = {
        user: 'sa',
        password: 'Test1234$',
        //server: 'MD1YWKDC\\SQLEXPRESS', 
		server:'INAKR11123WSCL',
        database: 'ProductQualityDB' 
    };

    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query('select * from tblmeasures', function (err, recordset) {
            
            if (err) console.log(err)

            // send records as a response
			res.json(recordset);
            //res.send(recordset);
			//console.log(JSON.parse(recordset));
            
        });
    });
});

var server = app.listen(5000, function () {
    console.log('Server is running..');
});