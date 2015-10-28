'use strict';

let url = require('url');

const DEFAULT = Object.freeze({
    protocol: 'http',
    host: 'localhost',
    port: 5984,
    db: 'database'
});

let merge = function (custom) {
    let config = {};
    Object.keys(DEFAULT).forEach(key => config[key] = custom[key] || DEFAULT[key]);
    return Object.freeze(config);
}

let parse = function (string) {
    let parsed = url.parse(string);

    return {
        protocol: parsed.protocol.substring(0, parsed.protocol.length - 1),
        host: parsed.hostname,
        port: parseInt(parsed.port),
        db: parsed.pathname.substring(1)
    }
}

module.exports = function (custom) {
    if (!custom) custom = {};
    if (typeof custom === 'string') custom = parse(custom);
    return merge(custom);
};
