/* jscs:disable disallowDanglingUnderscores */
var fs = require('fs');
var readline = require('readline');
var chalk = require('chalk');
var greeting;

/*
    cheers to https://github.com/flatiron/prompt
    for a workaround/hack for https://github.com/joyent/node/issues/3860
*/
readline.Interface.prototype.setPrompt = function (prompt, length) {
    'use strict';

    this._prompt = prompt;

    if (length) {
        this._promptLength = length;
    }
    else {
        var lines = prompt.split(/[\r\n]/);
        var lastLine = lines[lines.length - 1];
        this._promptLength = lastLine.replace(/\u001b\[(\d+(;\d+)*)?m/g, '').length;
    }
};

greeting = '                __\n'
    + '               / _)\n'
    + '      _.----._/ /\n'
    + '     /         /     Promptosaurus would like to\n'
    + '  __/ (  | (  |      ask you some questions...\n'
    + ' /__.-\'|_|--|_|\n';

var Rawr = function () {
    'use strict';

    this.line = readline.createInterface(process.stdin, process.stdout);
    this.queue = [];
    this.inputs = {};
    this.counter = 0;
    this.greeting = chalk.green(greeting);
    this.farewell = chalk.green('\n Promptosaurus thanks you for your time.\n');
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
            console.log(this.farewell);
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

        console.log(this.greeting);
        this.askNext();
    },

    'done': function (cb) {
        'use strict';

        this.complete = cb;
        return this;
    }
};

module.exports = Rawr;
