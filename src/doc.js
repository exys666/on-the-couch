'use strict';

let http = require('./http');
let error = require('./error');

let parse = function (args) {
    let params = args[0];
    if (!params) params = {};

    let type = typeof params;
    if (type === 'string')  params = {id: params};

    let doc = args[1];
    if (doc) params.doc = doc;

    return params;
}

module.exports = function (config) {
    let call = http(config);

    return {

        get: function () {
            let params = parse(arguments);
            return call('GET', '/' + params.id, params).then(function (response) {
                if (response.statusCode === 200) return response.body;
                throw error.parse(response);
            });
        },

        put: function () {
            let params = parse(arguments);
            return call('PUT', '/' + params.id, params, params.doc).then(function (response) {
                if(response.statusCode === 201 || response.statusCode === 202) return response.body;
                throw error.parse(response);
            });
        }
    };
};
