// assertion library
// /////////////////////////////////////////////////////////
var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
chai.should();
chai.use(sinonChai);

// modules to test
// /////////////////////////////////////////////////////////
var Rawr = require('../../index');
var rawr;

describe('promptosaurus', function () {
    'use strict';

    beforeEach(function () {
        rawr = new Rawr();
    });

    afterEach(function () {
        rawr.line.close();
        rawr = null;
    });

    describe('#add()', function () {

        var fakeString = 'foo';
        var fakeFunc = function () {};

        it('should update internal queue using passed arguments', function () {
            rawr.add(fakeString, fakeFunc);
            rawr.queue[0].query.should.contain(fakeString);
            rawr.queue[0].callback.should.equal(fakeFunc);
        });

        it('should return promptosaurus instance', function () {
            var returnValue = rawr.add(fakeString, fakeFunc);
            returnValue.should.equal(rawr);
        });

        describe('when no callback is passed', function () {

            it('should push empty function to queue', function () {
                rawr.add(fakeString);
                rawr.queue[0].query.should.contain(fakeString);
                rawr.queue[0].callback.should.be.a('function');
            });
        });
    });

    describe('#setError', function () {
        it('should set .tryAgain message', function(){
            rawr.setError('foo');
            rawr.tryAgain.should.equal('foo');
        });
    });

    describe('#log()', function () {

        var processStub,
            str = 'foobar bazbuzz';

        beforeEach(function () {
            processStub = sinon.stub(process.stdout, 'write');
            rawr.log(str);
        });

        afterEach(function () {
            processStub = null;
            process.stdout.write.restore();
        });

        it('should pass string to stdout', function () {
            processStub.args[0][0].should.contain(str);
        });

        it('should return instance for chaining', function () {
            var returnValue = rawr.log('foobar bazbuzz');
            returnValue.should.equal(rawr);
        });
    });

    describe('#askAgain()', function () {
        it('should show the "ask again" message', function (){
            var fakeObj = {
                'query': 'this is s test',
                'callback': function(){}
            },
            logStub = sinon.stub(rawr, 'log'),
            handlerStub = sinon.stub(rawr, 'getQHandler');
            rawr.askAgain(fakeObj);

            logStub.should.have.been.calledWith(rawr.tryAgain);
            handlerStub.should.have.been.calledWith(fakeObj);
        });
    });

    describe('#askNext()', function () {

        describe('when queue property\'s length is > 0', function () {

            var fakeString = 'foo';
            var fakeFunc = function () {};

            it('should update counter property', function () {
                rawr.counter.should.equal(0);
                rawr.queue[0] = {
                    'query': fakeString,
                    'callback': fakeFunc
                };

                rawr.askNext();
                rawr.counter.should.equal(1);
            });

            it('should remove item from queue', function () {
                rawr.queue[0] = {
                    'query': fakeString,
                    'callback': fakeFunc
                };

                rawr.queue.length.should.equal(1);
                rawr.askNext();
                rawr.queue.length.should.equal(0);
            });

            it('should restore .tryAgain message to default', function () {
                rawr.queue[0] = {
                    'query': fakeString,
                    'callback': fakeFunc
                };

                var origMessage = rawr.tryAgain;
                rawr.setError('baz');
                rawr.askNext();
                rawr.tryAgain.should.equal(origMessage);
            });
        });

        describe('when queue property\'s length is <= 0', function () {

            var consoleStub;

            beforeEach(function () {
                consoleStub = sinon.stub(rawr, 'log');
            });

            afterEach(function () {
                consoleStub = null;
                rawr.log.restore();
            });

            it('should set counter property to 0', function () {
                rawr.counter = 1;
                rawr.askNext();
                rawr.counter.should.equal(0);
            });

            it('should call assigned #complete() callback', function () {
                var completeStub = sinon.stub(rawr, 'complete');
                rawr.askNext();
                completeStub.should.have.been.calledOnce;

                rawr.complete.restore();
            });

            it('should display farewell message', function () {
                rawr.askNext();

                consoleStub.should.have.been.calledOnce;
                consoleStub.should.have.been.calledWith(rawr.farewell);
            });

            it('should close readline interface', function () {
                var closeStub = sinon.stub(rawr.line, 'close');
                rawr.askNext();
                closeStub.should.have.been.calledOnce;
            });
        });
    });

    describe('#getQHandler()', function () {

        var fakeObj,
            nextStub,
            againStub;

        beforeEach(function () {
            // stub askNext to help clean test results in command line
            nextStub = sinon.stub(rawr, 'askNext');
            againStub = sinon.stub(rawr, 'askAgain');
            fakeObj = {
                'callback': function () {}
            }
        });

        afterEach(function () {
            nextStub = null;
            againStub = null;
            fakeObj = null;
            rawr.askNext.restore();
            rawr.askAgain.restore();
        });

        it('should return a function', function () {
            var returnValue = rawr.getQHandler(fakeObj);
            returnValue.should.be.a('function');
        });

        it('should call argument\'s callback when called', function () {
            var callbackStub = sinon.stub(fakeObj, 'callback');
            var fn = rawr.getQHandler(fakeObj);

            callbackStub.should.not.have.been.called;

            fn('data');

            callbackStub.should.have.been.calledOnce;
            callbackStub.should.have.been.calledWith('data');
            againStub.should.not.have.have.been.called;
        });

        it('should call #askAgain instead of #askNext() when .hasValidResponse is falsey', function () {
            var callbackStub = sinon.stub(fakeObj, 'callback');
            rawr.hasValidResponse = false;

            var fn = rawr.getQHandler(fakeObj);

            fn('data');

            againStub.should.have.been.calledWith(fakeObj);
        });
    });

    describe('#ask()', function () {

        var consoleStub;

        beforeEach(function () {
            consoleStub = sinon.stub(rawr, 'log');
        });

        afterEach(function () {
            consoleStub = null;
            rawr.log.restore();
        });

        it('should display greeting', function () {
            rawr.ask();
            consoleStub.should.have.been.calledWith(rawr.greeting);
        });

        it('should start the prompt process', function () {
            var nextStub = sinon.stub(rawr, 'askNext');
            rawr.ask();

            nextStub.should.have.been.calledOnce;
            rawr.askNext.restore();
        });
    });

    describe('#done()', function () {

        var callback = function () {};

        it('should set .complete property as passed callback', function () {
            rawr.done(callback);
            rawr.complete.should.equal(callback);
        });

        it('should return promptosaurus instance', function () {
            var returnValue = rawr.done(callback);
            returnValue.should.equal(rawr);
        });
    });
});
