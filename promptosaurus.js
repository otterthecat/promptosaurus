var fs = require('fs');
var readline = require('readline');
var chalk = require('chalk');

var greeting = '';
greeting += "               __\n";
greeting += "              / _)\n";
greeting += "     _.----._/ /\n";
greeting += "    /         /     Promptosaurus would like to\n";
greeting += " __/ (  | (  |      ask you some questions...\n";
greeting += "/__.-'|_|--|_|\n";


greeting = chalk.green(greeting);
var farewell = chalk.green('\nPromptosaurus thanks you for your time.\n');

var Rawr = function(){
	this.line = readline.createInterface(process.stdin, process.stdout);
	this.queue = [];
	this.answers = {};
	this.counter = 0;
	this.complete = function(){};
	return this;
};

Rawr.prototype = {
	"add": function (str, fn) {
		this.queue.push({
			"query": str,
			"callback": fn
		});
		return this;
	},

	"askNext": function (){
		var self = this;
		if(self.queue.length > 0) {
			self.counter += 1;
			var item = self.queue.shift();
			self.line.question(item.query, function(data){
				self.answers['input' + self.counter] = data;
				item.callback(data);
				self.askNext();
			});
		} else {
			self.complete();
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