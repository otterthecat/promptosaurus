var fs = require('fs');
var readline = require('readline');
var chalk = require('chalk');

/*
	cheers to https://github.com/flatiron/prompt
	for a workaround/hack for https://github.com/joyent/node/issues/3860
*/
readline.Interface.prototype.setPrompt = function(prompt, length) {
	this._prompt = prompt;
	if (length) {
		this._promptLength = length;
	} else {
		var lines = prompt.split(/[\r\n]/);
		var lastLine = lines[lines.length - 1];
		this._promptLength = lastLine.replace(/\u001b\[(\d+(;\d+)*)?m/g, '').length;
	}
};

var greeting = '';
greeting += "                __\n";
greeting += "               / _)\n";
greeting += "      _.----._/ /\n";
greeting += "     /         /     Promptosaurus would like to\n";
greeting += "  __/ (  | (  |      ask you some questions...\n";
greeting += " /__.-'|_|--|_|\n";

greeting = chalk.green(greeting);
var farewell = chalk.green('\n Promptosaurus thanks you for your time.\n');

var Rawr = function(){
	this.line = readline.createInterface(process.stdin, process.stdout);
	this.queue = [];
	this.inputs = {};
	this.counter = 0;
	this.complete = function(){};
	return this;
};

Rawr.prototype = {
	"add": function (str, fn) {
		this.queue.push({
			"query": ' ' + str,
			"callback": fn || function(){}
		});
		return this;
	},

	"askNext": function (){
		var self = this;
		if(self.queue.length > 0) {
			self.counter += 1;
			var item = self.queue.shift();
			self.line.question(chalk.blue(item.query + ' '), function(data){
				self.inputs['input' + self.counter] = data;
				item.callback(data);
				self.askNext();
			});
		} else {
			self.complete(self.inputs);
			console.log(farewell);
			self.line.close();
		}
	},

	"ask": function(){
		console.log(greeting);
		this.askNext();
	},

	"done": function (cb){
		this.complete = cb;
		return this;
	}
};

module.exports = Rawr;