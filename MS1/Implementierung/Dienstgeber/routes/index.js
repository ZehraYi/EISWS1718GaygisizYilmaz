var express = require('express');
var router = express.Router();

exports.register = function(app){
    router.get('/', function(req, res, next) {
        res.render('index', { title: 'Express' });
    });


}

/* GET home page. */

//module.exports = router;
