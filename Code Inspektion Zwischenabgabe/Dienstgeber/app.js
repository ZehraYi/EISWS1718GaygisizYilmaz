var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var mongo = require('mongodb');
var monk = require('monk');

var index = require('./routes/index');
var eventRoute = require('./routes/eventRoute');
var djRoute = require('./routes/djRoute.js');
var cateringRoute = require('./routes/cateringRoute.js');
var locationRoute = require('./routes/locationRoute');


var app = express();
var server = http.createServer(app);

var db = monk('localhost:27017/EventOrganization');
// db connection
app.use(function(req, res, next) {
    req.db = db;
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


var server = app.listen(8181, function () {
    var port = server.address().port;
    console.log("Event Application at http://127.0.0.1:%s", port);
});

index.register(app);
eventRoute.register(app);
djRoute.register(app);
locationRoute.register(app);
cateringRoute.register(app);


