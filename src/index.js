'use strict';

var doc = require('./doc');
var err = require('./error');

module.exports = function (config) {


    return {
        doc: doc(config),
        err: err
    };
};
