var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var mongo = require('mongodb');
var monk = require('monk');
//var path = require('path');
//var favicon = require('serve-favicon');
//var logger = require('morgan');
//var cookieParser = require('cookie-parser');

var index = require('./routes/index');
var eventRoute = require('./routes/eventRoute');
var locationRoute = require('./routes/locationRoute');


var app = express();
var server = http.createServer(app);
//app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
//app.use('/', index);
//app.use('/users', users);

var db = monk('localhost:27017/EventOrganization');
// db connection
app.use(function(req, res, next) {
    req.db = db;
    next();
});


// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


var server = app.listen(8181, function () {
    var port = server.address().port;
    console.log("Event Application at http://127.0.0.1:%s", port);
});

index.register(app);
eventRoute.register(app);
locationRoute.register(app);

