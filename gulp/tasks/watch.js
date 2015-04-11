var gulp = require('gulp');
var sources = require('../config/sources');

module.exports = function () {
    'use strict';

    return gulp.watch(
            [sources.js, sources.test],
            ['lint', 'mocha']
        );
};
