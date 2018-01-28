var Request = require('rest-request');
var Q = require('q');
var dao = require('../eventit/database/dataAxcessObject.js');

function loadLocations(){
    var param = {};

    param.geometryType='esriGeometryPoint';
    param.spatialRel='esriSpatialRelIntersects';
    param.where='objectid is not null';
    param.returnCountOnly=false;
    param.returnIdsOnly=false;
    param.returnGeometry=true;
    param.outSR=4326;
    param.outFields='*';
    param.f='json';

    return dao.call('https://geoportal.stadt-koeln.de', '/arcgis/rest/services/Stadtplanthemen/MapServer/2/query',param);
}

function loadLocationsPrices() {
    return dao.call('http://localhost:8181', 'locations/prices',{});
}

function loadTopLocations() {
    return dao.call('http://localhost:8181', 'locations/toplocations',{});
}

exports.register = function (app) {

    app.get('/locations', function (req,res) {
        Q.allSettled([loadLocations(), loadLocationsPrices()])
            .then(function(locations) {
                var price = req.query.locationSuggesion;
                var genre = req.query.genre;
                var resultLocations = [];

                if(isNaN(price)){
                    res.send(JSON.parse(locations[0].value).features);
                } else {
                    var locationPrices = locations[1].value.reduce(function(map, obj) {
                        map.set(obj.id, obj.value);
                        return map;
                    }, new Map());

                    var locationGenres = locations[1].value.reduce(function(map, obj) {
                        map.set(obj.id, obj.genre);
                        return map;
                    }, new Map());

                    var locationsFilteredByPricesAndGenre = JSON.parse(locations[0].value).features.filter(function (value) {
                        var locationID = value.attributes.OBJECTID;
                        var currentPrice = locationPrices.get(locationID);
                        var currentGenres = locationGenres.get(locationID);
                        var match = price >= currentPrice && currentGenres.includes(genre);
                        if(match) {
                            value.preis = currentPrice;
                        }
                        return match;
                    });

                    res.send(locationsFilteredByPricesAndGenre);
                }
            });

    });

    app.get('/toplocations', function(req, res) {
        Q.allSettled([loadLocations(), loadTopLocations()])
            .then(function(result){
                var locationsFromDb = result[1].value;
                var locations = JSON.parse(result[0].value).features;
                for(var i = 0; i < locations.length; i++) {
                    for(var j=0; j < locationsFromDb.length; j++) {
                        if(locationsFromDb[j].id == locations[i].attributes.OBJECTID) {
                            locations[i].gesamtbewertung = locationsFromDb[j].gesamtbewertung;
                        }
                    }
                }

                locations.sort(function(a, b) {
                    return b.gesamtbewertung - a.gesamtbewertung;
                });

                res.send(locations.length > 10?locations.slice(0, 10):locations);

            }, function (err) {
                console.log("Rejected");
                res.send(err)
            });
    });

}