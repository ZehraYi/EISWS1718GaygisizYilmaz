var Request = require('rest-request');
var Q = require('q');


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

    return call('https://geoportal.stadt-koeln.de', '/arcgis/rest/services/Stadtplanthemen/MapServer/2/query',param);
}

function loadLocationsPrices() {
    return call('http://localhost:8080', 'locations/prices',{});
}

function call(host, path, param) {
    return new Q.promise(function(resolve, reject) {
        var locationKoelnRestApi = new Request(host);
        locationKoelnRestApi.get(path, param).then(function (data) {
            resolve(data);
        })
    });
}

exports.register = function (app) {

    app.get('/locations', function (req,res) {
        Q.allSettled([loadLocations(), loadLocationsPrices()])
            .then(function(locations) {
                var price = parseFloat(req.query.price);
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
        Q.allSettled([call('http://localhost:8181', 'locations/prices', {})])
            .then(function(locations) {
                res.send(locations[0].value)
            });
        /*var jsono = [{"_id": "5a0740be785d316983668ef0", "id": 52, "value": 1613}, {
            "_id": "5a0740be785d316983668ef1",
            "id": 53,
            "value": 1802
        }, {"_id": "5a0740be785d316983668ef2", "id": 54, "value": 1423}, {
            "_id": "5a0740be785d316983668ef3",
            "id": 55,
            "value": 906
        }, {"_id": "5a0740be785d316983668ef4", "id": 56, "value": 1370}, {
            "_id": "5a0740be785d316983668ef5",
            "id": 57,
            "value": 1314
        }, {"_id": "5a0740be785d316983668ef6", "id": 58, "value": 934}, {
            "_id": "5a0740be785d316983668ef7",
            "id": 1,
            "value": 1026
        }, {"_id": "5a0740be785d316983668ef8", "id": 2, "value": 1900}, {
            "_id": "5a0740be785d316983668ef9",
            "id": 3,
            "value": 1436
        }, {"_id": "5a0740be785d316983668efa", "id": 4, "value": 1964}, {
            "_id": "5a0740be785d316983668efb",
            "id": 5,
            "value": 1508
        }, {"_id": "5a0740be785d316983668efc", "id": 6, "value": 165}, {
            "_id": "5a0740be785d316983668efd",
            "id": 7,
            "value": 1652
        }, {"_id": "5a0740be785d316983668efe", "id": 8, "value": 1090}, {
            "_id": "5a0740be785d316983668eff",
            "id": 9,
            "value": 1403
        }, {"_id": "5a0740be785d316983668f00", "id": 10, "value": 1453}, {
            "_id": "5a0740be785d316983668f01",
            "id": 11,
            "value": 1802
        }, {"_id": "5a0740be785d316983668f02", "id": 12, "value": 1755}, {
            "_id": "5a0740be785d316983668f03",
            "id": 13,
            "value": 1048
        }, {"_id": "5a0740be785d316983668f04", "id": 14, "value": 1190}, {
            "_id": "5a0740be785d316983668f05",
            "id": 15,
            "value": 1777
        }, {"_id": "5a0740be785d316983668f06", "id": 16, "value": 1239}, {
            "_id": "5a0740be785d316983668f07",
            "id": 17,
            "value": 438
        }, {"_id": "5a0740be785d316983668f08", "id": 18, "value": 1442}, {
            "_id": "5a0740be785d316983668f09",
            "id": 19,
            "value": 442
        }, {"_id": "5a0740be785d316983668f0a", "id": 20, "value": 839}, {
            "_id": "5a0740be785d316983668f0b",
            "id": 21,
            "value": 1703
        }, {"_id": "5a0740be785d316983668f0c", "id": 22, "value": 1371}, {
            "_id": "5a0740be785d316983668f0d",
            "id": 23,
            "value": 1430
        }, {"_id": "5a0740be785d316983668f0e", "id": 24, "value": 1990}, {
            "_id": "5a0740be785d316983668f0f",
            "id": 25,
            "value": 791
        }, {"_id": "5a0740be785d316983668f10", "id": 26, "value": 1135}, {
            "_id": "5a0740be785d316983668f11",
            "id": 27,
            "value": 1887
        }, {"_id": "5a0740be785d316983668f12", "id": 28, "value": 762}, {
            "_id": "5a0740be785d316983668f13",
            "id": 29,
            "value": 610
        }, {"_id": "5a0740be785d316983668f14", "id": 30, "value": 436}, {
            "_id": "5a0740be785d316983668f15",
            "id": 31,
            "value": 500
        }, {"_id": "5a0740be785d316983668f16", "id": 32, "value": 202}, {
            "_id": "5a0740be785d316983668f17",
            "id": 33,
            "value": 1733
        }, {"_id": "5a0740be785d316983668f18", "id": 34, "value": 455}, {
            "_id": "5a0740be785d316983668f19",
            "id": 35,
            "value": 1526
        }, {"_id": "5a0740be785d316983668f1a", "id": 36, "value": 1760}, {
            "_id": "5a0740be785d316983668f1b",
            "id": 37,
            "value": 1580
        }, {"_id": "5a0740be785d316983668f1c", "id": 38, "value": 800}, {
            "_id": "5a0740be785d316983668f1d",
            "id": 39,
            "value": 1236
        }, {"_id": "5a0740be785d316983668f1e", "id": 40, "value": 1565}, {
            "_id": "5a0740be785d316983668f1f",
            "id": 41,
            "value": 754
        }, {"_id": "5a0740be785d316983668f20", "id": 42, "value": 1957}, {
            "_id": "5a0740be785d316983668f21",
            "id": 43,
            "value": 896
        }, {"_id": "5a0740be785d316983668f22", "id": 44, "value": 1589}, {
            "_id": "5a0740be785d316983668f23",
            "id": 45,
            "value": 508
        }, {"_id": "5a0740be785d316983668f24", "id": 46, "value": 802}, {
            "_id": "5a0740be785d316983668f25",
            "id": 47,
            "value": 721
        }, {"_id": "5a0740be785d316983668f26", "id": 48, "value": 1104}, {
            "_id": "5a0740be785d316983668f27",
            "id": 49,
            "value": 1205
        }, {"_id": "5a0740be785d316983668f28", "id": 50, "value": 538}, {
            "_id": "5a0740be785d316983668f29",
            "id": 51,
            "value": 1554
        }];
        res.setHeader("Content-Type", "application/json");
        res.send(jsono);*/
    });

}