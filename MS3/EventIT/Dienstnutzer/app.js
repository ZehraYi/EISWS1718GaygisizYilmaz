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
var dj = require('./routes/dj.js');
var caterer = require('./routes/caterer.js');

var app = express();
var server = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})


var server = app.listen(8080, function () {
    var port = server.address().port;
    console.log("Dienstnutzer at http://127.0.0.1:%s", port);
});

//index.register(app);
reports.register(app);
locations.register(app)
dj.register(app);
caterer.register(app);
module.exports = app;

