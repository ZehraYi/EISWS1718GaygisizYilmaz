var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');

//var index = require('./routes/index.js');
var reports = require('./routes/reports.js');
var locations = require('./routes/locations.js');

var app = express();
var server = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


var server = app.listen(8080, function () {
    var port = server.address().port;
    console.log("Dienstnutzer at http://127.0.0.1:%s", port);
});

//index.register(app);
reports.register(app);
locations.register(app)
module.exports = app;

