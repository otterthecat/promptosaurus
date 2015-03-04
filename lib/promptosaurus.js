var readline = require('readline');
var chalk = require('chalk');
var messages = require('./messages');
var promptFix = require('./prompt-fix');

readline.Interface.prototype.setPrompt = promptFix;

var Rawr = function () {
    'use strict';

    this.line = readline.createInterface(process.stdin, process.stdout);
    this.queue = [];
    this.inputs = {};
    this.counter = 0;
    this.greeting = chalk.green(messages.greeting);
    this.farewell = chalk.green(messages.farewell);
    this.complete = function () {};
    return this;
};

Rawr.prototype = {
    'add': function (str, fn) {
        'use strict';

        this.queue.push({
            'query': ' ' + str,
            'callback': fn || function () {}
        });
        return this;
    },

    'askNext': function () {
        'use strict';

        if (this.queue.length > 0) {
            this.counter += 1;
            var item = this.queue.shift();
            this.line.question(chalk.blue(item.query + ' '), this.getQHandler(item));
        }
        else {
            this.complete(this.inputs);
            this.counter = 0;
            process.stdout.write(this.farewell);
            this.line.close();
        }
    },

    'getQHandler': function (obj) {
        'use strict';

        return function (data) {
            this.inputs['input' + this.counter] = data;
            obj.callback(data);
            this.askNext();
        }.bind(this);
    },

    'ask': function () {
        'use strict';

        process.stdout.write(this.greeting);
        this.askNext();
    },

    'done': function (cb) {
        'use strict';

        this.complete = cb;
        return this;
    }
};

module.exports = Rawr;
