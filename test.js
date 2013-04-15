var ifthen = require('./ifthen');

var assert = require('assert');

describe('async if_', function () {
    it('then condition', function (done) {
        ifthen.if_(true).then_(
            function (callback) {
                callback(null, 1);
            }
        ).finally_(function (err, value) {
            assert.equal(value, 1);
            done();
        });
    });

    it('then condition called when else_ specified', function (done) {
        ifthen.if_(true).then_(
            function (callback) {
                callback(null, 1);
            }
        ).else_(function (callback) {
            callback('error');
        }).finally_(function (err, value) {
            assert.equal(value, 1);
            done();
        });
    });

    it('else condition called when then_ specified', function (done) {
        ifthen.if_(1 < 0).then_(
            function (callback) {
                callback('error');
            }
        ).else_(
            function (callback) {
                callback(null, 1);
            }
        ).finally_(function (err, value) {
            assert.equal(value, 1);
            done();
        });
    });

    it('else condition fails when then_ not specified', function () {
        assert.throws(function () {
            ifthen.if_(1 < 0).else_(
                function (callback) {
                    callback(null, 1);
                }
            ).finally_(function (err, value) {
                assert.equal(value, 1);
                done();
            });
        }, /else_ specified with no then_/);
    });

    it('if with no finally and ! condition times out', function (done) {
        setTimeout(done, 100);

        ifthen.if_(false).then_(function () {
            assert(false);
        });
    });
});
