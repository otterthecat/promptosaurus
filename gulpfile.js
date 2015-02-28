// Gulp
var gulp = require('gulp');

// Tools
var complexity = require('gulp-complexity');
var complexityOpts = {
	errorsOnly      : false,
	cyclomatic      : 3,
	halstead        : 10,
	maintainability : 90,
	trycatch        : true
};

var bump = require('gulp-bump');

// Validation
var jshint = require('gulp-jshint');
var jshintOpts = {
	options : {
		strict : true
	}
};

var stylish = require('jshint-stylish');
var jscs = require('gulp-jscs');

// Testing
var mocha = require('gulp-mocha');

// Reports
var istanbul = require('gulp-istanbul');
var plato = require('gulp-plato');
var platoOpts = {
	jshint     : jshintOpts,
	complexity : complexityOpts
};

// Target Files
var sources = ['gulpfile.js', './lib/*.js', './test/specs/*.js'];
var pkg = './package.json';
var tests = './test/specs/*.js';

// Tasks
gulp.task('bump:patch', function () {
	'use strict';

	gulp.src('./package.json')
		.pipe(bump())
		.pipe(gulp.dest('./'));
});

gulp.task('bump:minor', function () {
	'use strict';

	gulp.src(pkg)
		.pipe(bump({type : 'minor'}))
		.pipe(gulp.dest('./'));
});

gulp.task('bump:major', function () {
	'use strict';

	gulp.src(pkg)
		.pipe(bump({type : 'major'}))
		.pipe(gulp.dest('./'));
});

gulp.task('format', function () {
	'use strict';

	gulp.src(sources)
		.pipe(jscs())
		.on('error', function(obj){
			console.log(obj.message);
			process.exit(1);
		});
});

gulp.task('lint', function () {
	'use strict';

	gulp.src(sources)
		.pipe(jshint())
		.pipe(jshint.reporter(stylish))
		.pipe(jshint.reporter('fail'));
});

gulp.task('plato', function () {
	'use strict';

	gulp.src(sources)
		.pipe(plato('./metrics/report', platoOpts));
});


/*
	@errorsOnly - show only maintainabilty errors
	@cycolmatic - typical acceptance is a value of 4 (lower is better)
	@halstead - typcial acceptance is 10, (lower is better)
	@maintainability - typical acceptance is ~70. Higher is better, 171 max
*/
gulp.task('complexity', function () {
	'use strict';

	gulp.src(sources)
		.pipe(complexity(complexityOpts));
});


gulp.task('test', function (cb) {
	'use strict';

	gulp.src(['./lib/**/*.js'])
		.pipe(istanbul()) // Covering files
		.on('finish', function () {
			gulp.src(tests)
				.pipe(mocha({reporter : 'nyan'}))
				.pipe(istanbul.writeReports({
					reporters : ['text-summary']
				}))
				.on('end', cb);
		});
});

gulp.task('coverage', function (cb) {
	'use strict';

	gulp.src(['./lib/**/*.js'])
		.pipe(istanbul()) // Covering files
		.on('finish', function () {
			gulp.src(tests)
				.pipe(mocha({reporter : 'nyan'}))
				.pipe(istanbul.writeReports('./metrics/coverage'))
				.on('end', cb);
		});
});

gulp.task('watch', function () {
	'use strict';

	gulp.watch(sources[1], ['default']);
});

// Grouped Tasks
gulp.task('default', ['format', 'lint', 'complexity', 'test']);
gulp.task('report', ['plato', 'coverage']);
