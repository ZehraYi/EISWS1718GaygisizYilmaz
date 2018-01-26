/**
 * Created by emin on 18.01.18.
 */
var Q = require('q');
var syncClient = require('sync-rest-client');
var Request = require('rest-request');

exports.call = function (host, path, param) {
    return new Q.promise(function (resolve, reject) {
        var locationKoelnRestApi = new Request(host);
        locationKoelnRestApi.get(path, param).then(function (data) {
            resolve(data);
        })
    });
}

exports.get = function (host, path, param) {
    return syncClient.get(host + path, param)
}

exports.post = function (host, path, param) {
    return syncClient.post(host + path, param)
}

exports.delete = function (host, path, param) {
    return syncClient.del(host + path, param)
}

exports.put = function (host, path, param) {
    return syncClient.put(host + path, param)
}