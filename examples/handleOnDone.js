#!/usr/bin/env node

var Rawr = require('../lib/promptosaurus');

var rawr = new Rawr();

rawr.add('What is stuff?')
.add('What color is hungry?')
.add('Who said things')
.done(function(){
    var queries = this.queries;
    for(var i = 0; i < queries.length; i += 1) {
        var query = queries[i];
        this.log(query.prompt + ' ' + query.response);
    }
})
.ask();
