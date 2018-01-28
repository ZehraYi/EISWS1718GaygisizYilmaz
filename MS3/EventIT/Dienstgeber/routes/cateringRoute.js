var dao = require('../eventit/database/dataAxcessObject');

//Holen der Caterer
exports.register = function (app) {
    app.get('/caterer', function(req,res){
        var collection = dao.getCollection('caterer')
        collection.find(req.query,{},function(e,docs){
            res.send(docs);
        })
    })
}