'use strict';

let http = require('./http');
let error = require('./error');

let parse = function (params) {
    let type = typeof params;
    if (type === 'string') return { id: params };

    return params;
}

module.exports = function (config) {
    let call = http(config);

    return {

        get: function (params) {
            params = parse(params);
            return call('GET', '/' + params.id, params).then(function (response) {
                if (response.statusCode === 200) return response.body;
                throw error.parse(response);
            });
        }
    };
};
