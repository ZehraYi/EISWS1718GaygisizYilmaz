var reporter = require('../eventit/report/boundary/reporter.js');
var eventManager = require('../eventit/events/boundary/eventManager.js');

exports.register = function(app){

    app.post('/event', function(req, res) {
        eventManager.createEvent(req.body);
        res.send('Event eingetragen mit folgenden Werten Localizationbudget/DJ/Catering: '+ req.body.locationbudget + '%/' + req.body.catering + '%/' + req.body.dj + '%');
    });

    app.get('/statistik', function (req,res) {
        reporter.calculatAdvisedBudget(req,res);
    });
}