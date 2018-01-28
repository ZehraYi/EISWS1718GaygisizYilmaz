var reporter = require('../eventit/report/boundary/reporter.js');
var eventManager = require('../eventit/events/boundary/eventManager.js');
var dao = require('../eventit/database/dataAxcessObject');
var ObjectId = require('mongodb').ObjectID;

exports.register = function (app) {

    //Erstellen eines Events
    app.post('/event', function (req, res) {
        eventManager.createEvent(req.body);
        res.send('Event eingetragen mit folgenden Werten Localizationbudget/DJ/Catering: ' + req.body.locationbudget + '%/' + req.body.catering + '%/' + req.body.dj + '%');
    });

    //Erzeugen einer Statistik
    app.get('/statistik', function (req, res) {
        reporter.calculatAdvisedBudget(req, res);
    });

    app.get('/event/:id', function (req, res) {
            var id = req.param("id");
            var collection = dao.getCollection('event');
            collection.find({_id: ObjectId(id)}, {}, function (e, docs) {
                if (docs.length > 0) {
                    res.json(docs[0]);
                } else {
                    res.sendStatus(404)
                }
            });
        }
    );

    app.put('/event/:id', function (req, res) {
            var id = req.param("id");
            var collection = dao.getCollection('event');
            collection.find({_id: ObjectId(id)}, {}, function (e, docs) {
                if (docs.length > 0) {
                    collection.update({_id:ObjectId(id)}, req.body, {}, function (err, updatedEvent) {
                        res.send("updated Event")
                    });
                } else {
                    res.sendStatus(404)
                }
            });
        }
    );

    app.delete('/event/:id', function (req, res) {
            var id = req.param("id");
            var collection = dao.getCollection('event');
            collection.find({_id: ObjectId(id)}, {}, function (e, docs) {
                if (docs.length > 0) {
                    collection.remove({_id:ObjectId(id)});
                    res.send("removed event");
                } else {
                    res.sendStatus(404)
                }
            });
        }
    );

}