'use strict';

var error = function (name) {
    var e = function () {};
    Object.defineProperty(e, 'name', {
        value: name
    });
    e.prototype = Object.create(Error.prototype);
    return e;
};

var errors =  {
    400: error('BadRequest'),
    404: error('NotFound'),
    409: error('Conflict')
}

var err = {}

for (var code in errors) {
    var e = errors[code];
    err[e.name] = e;
}

err.parse = function (res, data) {
    return new errors[res.statusCode];
}

module.exports = err;
