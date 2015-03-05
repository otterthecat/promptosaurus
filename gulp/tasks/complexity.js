var gulp = require('gulp');
var complexity = require('gulp-complexity');
var sources = require('../config/sources').module;
var options = require('../config/options').complexity;

module.exports = function () {
    'use strict';

    return gulp.src(sources)
        .pipe(complexity(options));
};
