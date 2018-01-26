var dao = require('../eventit/database/dataAxcessObject.js');
var Q = require('q');

function loadDjs(){
    return dao.call('http://localhost:8181', 'dj',{});
}

exports.register = function (app) {
    app.get('/dj', function (req,res) {
        Q.allSettled([loadDjs()]).then(function(results){
            var price = req.query.djSuggesion;
            var genre = req.query.genre;
            var resultDjs = [];

            if(isNaN(price)){
                res.send(results);
            }else{
                var resultDjs = [];
                var djPrices = results[0].value.reduce(function(map, obj) {
                    map.set(obj.id, obj.preis);
                    return map;
                }, new Map());
                var filteredDjs = results[0].value.filter(function(results) {
                    var djID = results.id;
                    var currentPrice = djPrices.get(djID);
                    return price >= currentPrice;
                });
                res.send(filteredDjs);
            }
        });
    });
}