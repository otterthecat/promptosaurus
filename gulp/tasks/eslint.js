var gulp = require('gulp');
var eslint = require('gulp-eslint');
var sources = require('../config/sources').js;

module.exports = function () {
    'use strict';

    // Note: To have the process exit with an error code (1) on
    //  lint error, return the stream and pipe to failOnError last.
    return gulp.src(sources)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
};
