'use strict';

var error = function (name) {
    var e = function () {};
    Object.defineProperty(e, 'name', {
        value: name
    });
    e.prototype = Object.create(Error.prototype);
    return e;
};

var UnknownError = function (response) {
    console.log(response);
};
UnknownError.prototype = Object.create(Error.prototype);

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

err.parse = function (res) {
    let error = errors[res.statusCode];
    return error ? new error : new UnknownError(res);
}

module.exports = err;
