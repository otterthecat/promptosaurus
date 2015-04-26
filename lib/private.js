var chalk = require('chalk');
var promptLine, getQHandler, askAgain;

exports.promptLine = promptLine = function (obj) {
    'use strict';
    this.line.question(chalk.blue(obj.query + ' '), getQHandler.call(this, obj));
};

exports.askAgain = askAgain = function (obj) {
    'use strict';

    this.log(this.tryAgain);
    promptLine.call(this, obj);
};

exports.getQHandler = getQHandler = function (obj) {
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
            askAgain.call(this, obj);
        }
    }.bind(this);
};

exports.whenNotValid = function (bool, callback) {
    'use strict';

    this.hasValidResponse = bool;
    this.handleInvalidResponse = callback;
};
