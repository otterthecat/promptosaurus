#!/usr/bin/env node

var Rawr = require('./promptosaurus');

var rawr = new Rawr();

rawr.add('what is this? ', function(data){
	console.log(data);
})
.add('who are you? ', function(data){
	console.log(data);
})
.done(function(){
	console.log('DONE! ', this.answers);
})
.ask();
