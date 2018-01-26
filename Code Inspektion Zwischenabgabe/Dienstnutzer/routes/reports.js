var dao = require('../eventit/database/dataAxcessObject.js');
var Q = require('q');
var Request = require('rest-request');


exports.register = function (app) {
    app.get('/average/event', function (req, res) {
        var budgetPlan = {};
        Q.allSettled([dao.call('http://localhost:8181', 'statistik?userInput=' + req.query.userInput, {})])
            .then(function (avarages) {
                budgetPlan.locationSuggesion = req.query.userInput * (avarages[0].value.locationAverage / 100);
                budgetPlan.cateringSuggesion = req.query.userInput * (avarages[0].value.cateringAverage / 100);
                budgetPlan.djSuggesion = req.query.userInput * (avarages[0].value.djAverage / 100);
                res.send(budgetPlan);
            });
    });


    app.get('/sugession', function (req, res) {
        dao.call('http://localhost:8080', 'average/event?userInput=' + req.query.userInput, {})
            .then(function (results) {

                var locationPromis = dao.call('http://localhost:8080', 'locations',{locationSuggesion: results.locationSuggesion});
                var djPromis = dao.call('http://localhost:8080', 'dj',{djSuggesion: results.djSuggesion});
                var catererPromis = dao.call('http://localhost:8080', 'caterer',{cateringSuggesion: results.cateringSuggesion});
                //TODO: DJ and Catering
                // var locationPromis = dao.call('http://localhost:8080', 'locations',{locationSuggesion: req.query.locationSuggesion});
                // var locationPromis = dao.call('http://localhost:8080', 'locations',{locationSuggesion: req.query.locationSuggesion});

                Q.allSettled([locationPromis, djPromis, catererPromis]).then(function (results) {
                    res.send({
                        locations: results[0].value,
                        dj: results[1].value,
                        caterer: results[2].value
                    });
                })
            })




        var resourcesMatchedBudget = {};
    });
}

