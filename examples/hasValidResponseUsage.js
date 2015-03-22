#!/usr/bin/env node
var Promptosaurus = require('../lib/promptosaurus');
var rawr = new Promptosaurus();

rawr.add('Would you like to play a game of chess (y | n)?', function(answer){

    // tell promptosaurus if you wish to accept the answer.
    // A value of 'false' will have Promptosaurus ask the question again
    // until an accepted response is given.
    // *Important* - be sure if you set the flag to false, you allow it to
    // then be set true with acceptable answer, or it will continue to loop
    // the same question over and over.
    this.hasValidResponse = (answer === 'y' || answer === 'n');
    this.log('You have responded with: ' + answer);
})
.done(function(){
    // this callback will execute once all questions have been successfully answered
    this.log('You were asked: ' + this.queries[0].prompt);
    this.log('You responded with: ' + this.queries[0].response);
})
.ask();
