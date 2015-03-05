var gulp = require('gulp');
var plato = require('gulp-plato');
var sources = require('../config/sources').module;
var options = require('../config/options').plato;

module.exports = function () {
    'use strict';
    return gulp.src(sources)
        .pipe(plato(options.dest, {
            'complexity': options.complexity,
            'jshint': options.jshint
    }));
};
