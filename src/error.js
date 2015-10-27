'use strict';

var codes =  {
    400: 'BadRequest',
    404: 'NotFound'
}

var err = {};

for (var code in codes) {
    var name = codes[code];

    var error = function () {};
    error.prototype = Object.create(Error.prototype);

    err[name] = error;
}

err.parse = function (res, data) {
    console.log(res.statusCode, data);
    var name = codes[res.statusCode];
    return new err[name];
}

module.exports = err;
