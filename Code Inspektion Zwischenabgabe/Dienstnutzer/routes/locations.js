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
    return dao.call('http://localhost:8080', 'locations/prices',{});
}


exports.register = function (app) {

    app.get('/locations', function (req,res) {
        Q.allSettled([loadLocations(), loadLocationsPrices()])
            .then(function(locations) {
                var price = req.query.locationSuggesion;
                var resultLocations = [];

                if(isNaN(price)){
                    res.send(JSON.parse(locations[0].value).features);
                }else{
                    var resultLocation = [];
                    var locationPrices = locations[1].value.reduce(function(map, obj) {
                        map.set(obj.id, obj.value);
                        return map;
                    }, new Map());
                    res.send(JSON.parse(locations[0].value).features.filter(function (value) {
                        var locationID = value.attributes.OBJECTID;
                        var currentPrice = locationPrices.get(locationID);
                        return price >= currentPrice ;
                    }));
                }
            });

    });


    app.get('/locations/prices', function (req, res) {
        Q.allSettled([dao.call('http://localhost:8181', 'locations/prices', {})])
            .then(function(locations) {
                res.send(locations[0].value)
            });

    });

}