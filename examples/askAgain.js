#!/usr/bin/env node

var Rawr = require('../lib/promptosaurus');

var rawr = new Rawr();

rawr.add('Give the sum of "1 + 1" to proceed: ', function(data){
    this.hasValidResponse = data === '2';
    this.log('your answer is ' + data);
})
.done(function(){
    this.log('Thas\'s all folks!');
})
.ask();