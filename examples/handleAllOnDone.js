#!/usr/bin/env node

var Rawr = require('../lib/promptosaurus');

var rawr = new Rawr();

// Callbacks are not passed to .add() function,
// as we are letting .done() handle all of them within it's callback
rawr.add('What is stuff?')
    .add('What color is hungry?')
    .add('Who said things')
    .done(function(){

        // ths.queries is an array of objects that contain all
        // of the questions (.prompt property) and answers (.response property)
        var queries = this.queries;
        for(var i = 0; i < queries.length; i += 1) {
            var query = queries[i];
            this.log(query.prompt + ' ' + query.response);
        }
    })
    .ask();
