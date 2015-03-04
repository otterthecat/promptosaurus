var gulp = require('gulp');
var fs = require('fs');
var files = fs.readdirSync('./gulp/tasks/');

files.forEach(function (file) {
    'use strict';

    var fileName = file.substr(0, file.length - 3);
    var taskName = fileName.replace(/-/g, ':');
    gulp.task(taskName, require('./tasks/' + fileName));
});

module.exports = gulp;
