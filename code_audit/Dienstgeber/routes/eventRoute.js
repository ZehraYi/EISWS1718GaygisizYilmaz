var reporter = require('../eventit/report/boundary/reporter.js');
var eventManager = require('../eventit/events/boundary/eventManager.js');

exports.register = function(app){

    app.post('/event', function(req, res) {
       // eventManager.printtest();
        eventManager.createEvent(req.body);
        res.send('Event eingetragen mit folgenden Werten Localizationbudget/DJ/Catering: '+ req.body.locationbudget + '%/' + req.body.catering + '%/' + req.body.dj + '%');
    });

    app.get('/statistik', function (req,res) {
        /*var budget = reporter.calculatAdvisedBudeget(req,res);
        dao.read('event', req.query, budget);*/

        var promise = reporter.calculatAdvisedBudget(req);
        promise.then(function(docs) {
            res.setHeader('Content-Type','application/json');
            res.send(docs);
        })

    });
}