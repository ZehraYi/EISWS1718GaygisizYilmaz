var dao = require('../eventit/database/dataAxcessObject.js');
var Q = require('q');

function loadCaterer(){
    return dao.call('http://localhost:8181', 'caterer',{});
}

exports.register = function (app) {
    app.get('/caterer', function (req,res) {
        Q.allSettled([loadCaterer()]).then(function(results){
            var price = req.query.catererSuggesion;

            if(isNaN(price)){
                res.send(results);
            }else{
                var catererPrices = results[0].value.reduce(function(map, obj) {
                    map.set(obj.id, obj.preis);
                    return map;
                }, new Map());
                var filteredCaterer = results[0].value.filter(function(results) {
                    var catererID = results.id;
                    var currentPrice = catererPrices.get(catererID);
                    return price >= currentPrice;
                });
                res.send(filteredCaterer);
            }
        });
    });
}