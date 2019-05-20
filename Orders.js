var express = require("express");
var app = express();





app.listen(7777, "127.0.0.1", () => {
    console.log("Up and Running - Orders Service @ http://localhost:7777");
});