'use strict';

let http = require('http');
let querystring = require('querystring');

let parseResponse = function (resolve) {
    return function (res) {
        res.setEncoding('utf8');

        let data = '';

        res.on('data', function (chunk) {
            data += chunk;
        });

        res.on('end', function () {
            if(data) res.body = JSON.parse(data);
            resolve(res);
        });
    };
};

module.exports = function (config) {

    let preparePath = function (path) {
        return '/' + config.db + path;
    };

    let request = function (method, path, params) {
        let headers = {};
        if (params.rev) headers['If-Match'] = params.rev;

        let r = {
            method: method,
            protocol: config.protocol,
            host: config.host,
            port: config.port,
            path: preparePath(path),
            headers: headers
        }

        return r;
    }

    return function (method, path, params, body) {

        return new Promise(function (resolve, reject) {
            let req = http.request(
                request(method, path, params),
                parseResponse(resolve)
            );

            if (body) req.write(JSON.stringify(body));
            req.end();
        });
    };
};
