var chalk = require('chalk');
var messages = require('./messages');
var prv = require('./private');
var readline = require('./prompt-fix');

var Rawr = function () {
    'use strict';

    this.line = readline.createInterface(process.stdin, process.stdout);
    this.queue = [];
    this.queries = [];
    this.counter = 0;
    this.hasValidResponse = true;
    this.greeting = messages.greeting;
    this.farewell = messages.farewell;
    this.tryAgain = messages.tryAgain;
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

    'log': function (str) {
        'use strict';

        process.stdout.write(chalk.green(' ' + str + '\n\n'));
        return this;
    },

    'setError': function (str) {
        'use strict';

        this.tryAgain = str;
        return this;
    },

    'askAgain': function (obj) {
        'use strict';

        this.log(this.tryAgain);
        prv.promptLine.call(this, obj);
    },

    'askNext': function () {
        'use strict';

        this.tryAgain = messages.tryAgain;

        if (this.queue.length > 0) {
            this.counter += 1;
            var item = this.queue.shift();
            prv.promptLine.call(this, item);
        }
        else {
            this.complete();
            this.counter = 0;
            this.log(this.farewell);
            this.line.close();
        }
    },

    'getQHandler': function (obj) {
        'use strict';

        return function (data) {
            obj.callback.call(this, data);

            if (this.hasValidResponse) {
                this.queries.push({
                    'prompt': [obj.query],
                    'response': data
                });
                this.askNext();
            }
            else {
                this.askAgain(obj);
            }
        }.bind(this);
    },

    'ask': function () {
        'use strict';

        this.log(this.greeting);
        this.askNext();
    },

    'done': function (cb) {
        'use strict';

        this.complete = cb;
        return this;
    }
};

module.exports = Rawr;
