/**
 * Created by emin on 18.01.18.
 */
var Q = require('q');
var Request = require('rest-request');

exports.call = function (host, path, param) {
    return new Q.promise(function (resolve, reject) {
        var locationKoelnRestApi = new Request(host);
        locationKoelnRestApi.get(path, param).then(function (data) {
            resolve(data);
        })
    });
}