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
            'query': {}
        },
        fakeArg = {
            'callback': sinon.spy()
        };

        it('should return a function', function(){
            var returnValue = pvt.getQHandler.call(fakeScope, fakeArg);
            returnValue.should.be.a('function');
        });

        describe('returned function', function(){

            var fnScope = {
                'hasValidResponse': true,
                'queries': [],
                'askNext': sinon.spy()
            }

            it('should update scoped array if scope has valid response', function(){
                var returnValue = pvt.getQHandler.call(fnScope, fakeArg);
                returnValue({});
                var len = fnScope.queries.length;
                len.should.equal(1);
            });

            it('should NOT update scoped array if scope does not have valid response', function(){
                var fnFalseScope = {
                    'hasValidResponse': false,
                    'queries': [],
                    'askNext': sinon.spy(),
                    'line': {
                        'question': function(){}
                    },
                    'tryAgain': function(){},
                    'log': function(){}
                }
                var returnValue = pvt.getQHandler.call(fnFalseScope, fakeArg);
                returnValue({});
                var len = fnFalseScope.queries.length;
                len.should.equal(0);
            });
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
