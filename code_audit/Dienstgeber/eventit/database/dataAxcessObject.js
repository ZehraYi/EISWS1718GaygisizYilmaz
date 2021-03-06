var monk = require('monk');
var db = monk('localhost:27017/EventOrganization');


exports.getCollection = function(collection) {
    return db.get(collection);
};

exports.read = function (collection) {
    var collection = this.getCollection(collection);
    var userInput = 2000;

    //collection.find(query, {}, toApply);
    return collection.find({ totalBudget: { $gt: 0.8*userInput, $lt: 1.2*userInput } });
};

exports.create = function(collection, entity){
    var result = this.getCollection(collection).insert(entity);
    console.log("ergebnis", result)
};


/*
var dao = {
    db : monk('localhost:27017/EventOrganization'),

    getCollection: function (collection) {
        return this.db.get(collection);
    },

    read : function (collection, query, toApply) {
        var collection = getCollection(collection);
        collection.find(req.query, {}, toApply);
    },

    create(collection, entity){
        var result = this.getCollection(collection).insert(entity);
        console.log("ergebnis", result)
    }
}*/