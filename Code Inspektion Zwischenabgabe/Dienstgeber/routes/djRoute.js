var dao = require('../eventit/database/dataAxcessObject');

exports.register = function (app) {
    app.get('/dj', function(req,res){
        var collection = dao.getCollection('dj')
        collection.find(req.query,{},function(e,docs){
            res.send(docs);
        })
    })
}