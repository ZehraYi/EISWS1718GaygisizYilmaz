var express = require('express');
var dao = require('../../database/dataAxcessObject');

exports.createEvent = function (event) {
    dao.create('event', event);
};