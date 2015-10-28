'use strict';

let config = require('./config');
var doc = require('./doc');
var err = require('./error');

const DEFAULT_CONFIG = {
    protocol: 'http',
    host: 'localhost',
    port: 5984,
    db: 'database'
}

module.exports = function (customConfig) {

    return {
        config: config(customConfig),
        doc: doc(config),
        err: err
    };
};
