exports.register = function(app) {

    function getCollection(db) {
        return db.get('location');
    }

    app.get('/locations/prices', function(req, res) {
        var collection = getCollection(req.db);
        collection.find(req.query,{},function(e,docs){
            res.send(docs);
        })
    });

}