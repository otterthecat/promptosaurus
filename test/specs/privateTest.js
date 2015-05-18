// assertion library
// /////////////////////////////////////////////////////////
var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
chai.should();
chai.use(sinonChai);

// modules to test
// /////////////////////////////////////////////////////////
var pvt = require('../../lib/private');

describe('private', function(){
    'use strict';

    describe('#askAgain', function(){
        var fakeScope = {
                "log": sinon.stub(),
                "tryAgain": {},
                "line": {
                    "question": function(){}
                }
            },
            fakeArg = {};

        pvt.askAgain.call(fakeScope, fakeArg);
        it('should log message', function(){
            fakeScope.log.should.have.been.calledOnce;
        });
    });

    describe('#getQHandler', function(){

        var fakeScope = {
        },
        fakeArg = {};

        var returnValue = pvt.getQHandler.call(fakeScope, fakeArg);
        it('should return a function', function(){
            returnValue.should.be.a('function');
        });
    });

    describe('#whenNotValid', function(){

        var fakeScope = {
                'hasValidResponse': null,
                'handleInvalidResponse': null
            },
            fakeBoolean = true,
            fakeCallback = function(){};

        pvt.whenNotValid.call(fakeScope, fakeBoolean, fakeCallback);
        it('should apply passed boolean', function(){
            fakeScope.hasValidResponse.should.equal(fakeBoolean);
        });

        it('should apply passed callback', function(){
            fakeScope.handleInvalidResponse.should.equal(fakeCallback);
        });
    });
});
