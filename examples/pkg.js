#!/usr/bin/env node

var fs = require('fs');
var Rawr = require('../promptosaurus');
var rawr = new Rawr();

var pkg = {
	"name": '',
	"title": '',
	"description": '',
	"version": "0.1.0",
	"author": {
		"name": '',
		"email": ''
	},
	"repository": {
		"type": "git",
		"url": ""
	}
};

rawr.add('What is the project\'s name?', function(data){
	pkg.name = data;
	pkg.title = data.charAt(0).toUpperCase() + data.slice(1);
})
.add('What does your project do?', function(data){
	pkg.description = data;
})
.add('What is your name?', function(data){
	pkg.author.name = data;
	pkg.repository.url = "git@github.com/";
	pkg.repository.url += pkg.author.name + '/';
	pkg.repository.url += pkg.name + '.git';
})
.add('What is your email?', function(data){
	pkg.author.email = data;
})
.done(function(prompto){
	fs.writeFileSync(process.cwd() + '/package.json', JSON.stringify(pkg), 'utf8');
})
.ask();