var chalk = require('chalk');

exports.promptLine = function (obj) {
    'use strict';
    this.line.question(chalk.blue(obj.query + ' '), this.getQHandler(obj));
};

exports.whenNotValid = function (bool, callback) {
    'use strict';
    
    this.hasValidResponse = bool;
    this.handleInvalidResponse = callback;
};