exports.register = function(app){

    function getCollection(db) {
        return db.get('event');
    }

    app.post('/event', function(req, res) {
        var collection = getCollection(req.db);
        var event = collection.insert(req.body);
        res.send('Event eingetragen mit folgenden Werten Localizationbudget/DJ/Catering: '+ req.body.locationbudget + '%/' + req.body.catering + '%/' + req.body.dj + '%');
//        res.render('index', { title: 'Express' });
    });

    app.get('/statistik', function (req,res) {
        var collection = getCollection(req.db);
        var result = {};
        collection.find(req.query,{},function (e,docs) {
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

            result.locationAverage = locationBudget;
            result.cateringAverage = cateringBudget;
            result.djAverage = djBudget;
            res.setHeader('Content-Type','application/json');
            res.send(result);
        })
    });




}