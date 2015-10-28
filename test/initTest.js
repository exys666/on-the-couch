'use strict';

var expect = require('chai').expect;
var onTheCouch = require('../');

describe('db', function () {

    it('should init with single string', function () {
        // given

        // when
        var db = onTheCouch('https://0.0.0.0:666/test');

        // then
        expect(db.config.protocol).to.be.eql('https');
        expect(db.config.host).to.be.eql('0.0.0.0');
        expect(db.config.port).to.be.eql(666);
        expect(db.config.db).to.be.eql('test');
    });

    it('should init with config object', function () {
        // given

        // when
        var db = onTheCouch({
            protocol: 'https',
            host: '0.0.0.0',
            port: 666,
            db: 'test'
        });

        // then
        expect(db.config.protocol).to.be.eql('https');
        expect(db.config.host).to.be.eql('0.0.0.0');
        expect(db.config.port).to.be.eql(666);
        expect(db.config.db).to.be.eql('test');
    });

    it('should init with defaults', function () {
        // given

        // when
        var db = onTheCouch();

        // then
        expect(db.config.protocol).to.be.eql('http');
        expect(db.config.host).to.be.eql('localhost');
        expect(db.config.port).to.be.eql(5984);
        expect(db.config.db).to.be.eql('database');
    });

    it('should freeze config', function () {
        // given

        // when
        var db = onTheCouch();

        // then
        expect(Object.isFrozen(db.config)).to.be.true;
    })
});
