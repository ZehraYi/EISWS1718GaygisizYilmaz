var dao = require('../../database/dataAxcessObject');

    exports.calculatAdvisedBudget = function (req, res) {
    //Events mit einer 20% Abweichung des angegebenen Budgets werden abgerufen
    return dao.read('event', req.query.userInput, function (e, docs) {


        // Budgetaufteilung der Events werden in % umgerechnet
        var j = 0;
        while (j < docs.length) {
            var totalBudget = docs[j].totalBudget;
            var locationBudget = docs[j].locationbudget;
            var djBudget = docs[j].dj;
            var cateringBudget = docs[j].catering;
            docs[j].locationBudgetPercent = (100 / totalBudget) * locationBudget;
            docs[j].djBudgetPercent = (100 / totalBudget) * djBudget;
            docs[j].cateringBudgetPercent = (100 / totalBudget) * cateringBudget;
            j++;
        }

        // Der Durchschnitt wird berechnet und zurückgegeben
        var i = 0;
        var locationBudget = 0;
        var cateringBudget = 0;
        var djBudget = 0;
        while (i < docs.length) {
            locationBudget += docs[i].locationBudgetPercent;
            cateringBudget += docs[i].cateringBudgetPercent;
            djBudget += docs[i].djBudgetPercent;
            i++;
        }
        locationBudget = (locationBudget / docs.length).toFixed(2);
        cateringBudget = (cateringBudget / docs.length).toFixed(2);
        djBudget =   (djBudget / docs.length).toFixed(2);
        locationBudget = parseFloat(locationBudget);
        cateringBudget = parseFloat(cateringBudget);
        djBudget = parseFloat(djBudget);

        var result = {};
        result.locationAverage = locationBudget;
        result.cateringAverage = cateringBudget;
        result.djAverage = djBudget;
        res.send(result);
    })
}