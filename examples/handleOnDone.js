#!/usr/bin/env node

var Rawr = require('../lib/promptosaurus');

var rawr = new Rawr();

rawr.add('What is stuff?')
.add('What color is hungry?')
.add('Who said things')
.done(function(inputs){
    for(item in inputs) {
        console.log(item + ' is ' + inputs[item]);
    }
})
.ask();
