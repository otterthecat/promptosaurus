#!/usr/bin/env node

var Rawr = require('../lib/promptosaurus');

// create new instance
var rawr = new Rawr();

// add new queries. First pass question as a string,
// then add a callback (optional, see the handleAllOnDone.js example).
// The callback will be passed the user's input.
rawr.add('what is this? ', function(data){

    // to keep your logging formatted as the rest of Promptosaurus'
    // output, you can use it's own .log() function
    this.log(data);
})
.add('who are you? ', function(data){
    this.log(data);
})
.done(function(){

    // handle any clean up or final processing
    // once all questions have been addressed.
    this.log('We are done. You can go now');
})
.ask();
