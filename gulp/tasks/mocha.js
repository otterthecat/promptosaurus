var gulp = require('gulp');
var mocha = require('gulp-mocha');
var sources = require('../config/sources').test;
var options = require('../config/options').mocha;


module.exports = function () {
    'use strict';

    return gulp.src(sources)
                .pipe(mocha(options));
};
