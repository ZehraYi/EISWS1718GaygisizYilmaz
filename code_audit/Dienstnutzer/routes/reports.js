exports.register = function(app) {

    app.get('/average/event', function(req, res) {
        var jsono = {
            "locationAverage" : 50,
            "cateringAverage" : 15,
            "djAverage" : 35
        }

        res.send(jsono);
    });

}