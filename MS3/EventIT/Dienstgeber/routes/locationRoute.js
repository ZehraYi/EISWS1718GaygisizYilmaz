exports.register = function (app) {

    function getCollection(db) {
        return db.get('location');
    }

    app.get('/locations/prices', function (req, res) {
        var collection = getCollection(req.db);
        collection.find(req.query, {}, function (e, docs) {
            res.send(docs);
        })
    });

    function calcSubBewertung(bewertungsPunkt) {
        if (bewertungsPunkt && bewertungsPunkt == 1) {
            return 0.5;
        } else if (bewertungsPunkt && bewertungsPunkt == 2) {
            return 1;
        } else {
            return 0;
        }
    }

    function calcDurchschnittsBenutzer(bewertung) {
        if (bewertung && bewertung != null ) {
            return (bewertung["1"] +
                    bewertung["2"] * 2 +
                    bewertung["3"] * 3 +
                    bewertung["4"] * 4 +
                    bewertung["5"] * 5
                ) / (
                    bewertung["1"] +
                    bewertung["2"] +
                    bewertung["3"] +
                    bewertung["4"] +
                    bewertung["5"]
                );
        } else {
            return 0;
        }
    }

    function calculateBewertung(location) {
        var res = calcSubBewertung(location.buhne) +
            calcSubBewertung(location.soundsystem) +
            calcSubBewertung(location.lichtsystem) +
            calcSubBewertung(location.sitzmöglichkeiten) +
            calcSubBewertung(location.bar);

        res += calcDurchschnittsBenutzer(location.bewertung);
        return res;
    }

    app.get('/locations/toplocations', function (req, res) {
        var collection = getCollection(req.db);
        collection.find(req.query, {}, function (e, docs) {
            for (var i = 0; i < docs.length; i++) {
                docs[i].gesamtbewertung = calculateBewertung(docs[i]);
            }

            res.send(docs);
        })
    });

}