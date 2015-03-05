// cheers to https://github.com/flatiron/prompt
// for a workaround/hack for https://github.com/joyent/node/issues/3860
var readline = require('readline');

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

module.exports = readline;
