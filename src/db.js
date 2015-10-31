'use strict';

let prepareConfig = require('./config');
var doc = require('./doc');
var err = require('./error');

const DEFAULT_CONFIG = {
    protocol: 'http',
    host: 'localhost',
    port: 5984,
    db: 'database'
};

module.exports = function (customConfig) {

    let config = prepareConfig(customConfig);
    return {
        config: config,
        doc: doc(config),
        err: err
    };
};
