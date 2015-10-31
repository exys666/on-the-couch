'use strict';

let nock = require('nock');
let chai = require('chai');
let chaiAsPromised = require('chai-as-promised');
let expect = require('chai').expect;
let onTheCouch = require('../');

chai.use(chaiAsPromised);

describe('db.doc', function () {

    let db = onTheCouch('http://couch.db:6666/db');
    let http = nock('http://couch.db:6666');

    describe('get()', function () {

        it('should get document by id', function () {
            // given
            let doc = {
                _id: 'test',
                _rev: 'revision',
                val: 'val'
            };

            http.get('/db/test').reply(200, doc);

            // when
            let promise = db.doc.get('test');

            // then
            return expect(promise).to.eventually.eql(doc);
        });

        it('should get document by id & rev', function () {
            // given
            let doc = {
                _id: 'test',
                _rev: '1-abc',
                val: 'val'
            };

            http.get('/db/test')
                .query({rev: '1-abc'})
                .reply(200, doc);

            // when
            let promise = db.doc.get({
                id: 'test',
                rev: '1-abc'
            });

            // then
            return expect(promise).to.eventually.eql(doc);
        });

        it('should handle 404', function () {
            // given
            http.get('/db/test').reply(404);

            // when
            let promise = db.doc.get('test');

            // then
            return expect(promise).to.be.rejectedWith(db.err.NotFound);
        });

    });

    describe('put()', function () {

        it('should put document with id when 201 response', function () {
            // given
            let doc = {
                val: 'val'
            };

            let res = {
                id: 'test',
                rev: '1-abc',
                ok: true
            };

            http.put('/db/test', doc).reply(201, res);

            // when
            let promise = db.doc.put('test', doc);

            // then
            return expect(promise).to.eventually.eql(res);
        });

        it('should put document with id when 202 response', function () {
            // given
            let doc = {
                val: 'val'
            };

            let res = {
                id: 'test',
                rev: '1-abc',
                ok: true
            };

            http.put('/db/test', doc).reply(202, res);

            // when
            let promise = db.doc.put('test', doc);

            // then
            return expect(promise).to.eventually.eql(res);
        });

    });

});
