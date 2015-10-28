'use strict';

var http = require('http');
var Promise = require('bluebird');
var err = require('./error');

var call = function (config, expectedCodes, data) {
    return new Promise(function (resolve, reject) {
        var req = http.request(config, function (res) {
            res.setEncoding('utf8');

            var data = '';

            res.on('data', function (chunk) {
                data += chunk;
            });

            res.on('end', function () {
                if (expectedCodes.indexOf(res.statusCode) >= 0 ) resolve(JSON.parse(data));
                else reject(err.parse(res, data));
            });
        });

        if (data) req.write(JSON.stringify(data));

        req.end();
    });
}


module.exports = function (db) {

    return {

        get: function (id, opts) {
            let idType = typeof id;
            if(idType != 'string') {
                id = id.id;
            }
            return call({
                method: 'GET',
                port: db.port,
                host: db.host,
                path: '/' +db.db + '/' + id
            }, [200]);
        },

        put: function (id, rev, doc) {
            var headers = {
                'Content-Type': 'application/json'
            };

            if (rev) headers['If-Match'] = rev;

            return call({
                method: 'PUT',
                port: db.port,
                host: db.host,
                path: '/brewlab/' + id,
                headers: headers
            }, [201, 202], doc);
        }

    };
};
