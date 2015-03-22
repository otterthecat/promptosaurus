#!/usr/bin/env node

var Rawr = require('../lib/promptosaurus');

var rawr = new Rawr();

rawr.add('what is this? ', function(data){
    this.log(data);
})
.add('who are you? ', function(data){
    this.log(data);
})
.done(function(){
    this.log('We are done. You can go now');
})
.ask();
