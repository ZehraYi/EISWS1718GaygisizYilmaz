var dao = require('../../database/dataAxcessObject');

exports.calculatAdvisedBudget = function (req) {
        return dao.read('event', req.query);

        /*return function(){
            dao.read('event', req.query, function (e,docs) {
                var totalBudget = 2000;
                var collection = dao.getCollection('event');
                var results = collection.find({totalBudget : {$gt: totalBudget - (totalBudget/5) , $lt: totalBudget + (totalBudget/5) }});
                console.log(results);



                var i = 0;
                var locationBudget = 0;
                var cateringBudget = 0;
                var djBudget = 0;
                while(i < docs.length){
                    locationBudget += docs[i].locationbudget;
                    cateringBudget += docs[i].catering;
                    djBudget += docs[i].dj;
                    i++;
                }

                locationBudget = (locationBudget / docs.length).toFixed(2);
                cateringBudget = (cateringBudget / docs.length).toFixed(2);
                djBudget = (djBudget / docs.length).toFixed(2);



                locationBudget = parseFloat( locationBudget );
                cateringBudget = parseFloat(cateringBudget );
                djBudget = parseFloat(djBudget );

                var result = {};
                result.locationAverage = locationBudget;
                result.cateringAverage = cateringBudget;
                result.djAverage = djBudget;
                res.setHeader('Content-Type','application/json');
                res.send(result);
            })
        }*/
    }