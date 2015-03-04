var gulp = require('gulp');
var jscs = require('gulp-jscs');
var sources = require('../config/sources').js;

module.exports = function () {
    'use strict';

    return gulp.src(sources)
            .pipe(jscs())
            .on('error', function (err) {
                process.stdout.write(err.message + '\n');
                process.exit(1);
            });
};
