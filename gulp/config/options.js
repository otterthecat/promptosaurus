var complexityOpts = {
    errorsOnly : false,
    cyclomatic : 3,
    halstead : 10,
    maintainability : 90,
    trycatch : true
};

module.exports = {

    plato: {
        dest: './metrics/report',
        complexity: complexityOpts,
        jshint: {
            options: {
                strict: true
            }
        }
    },

    complexity: complexityOpts,

    istanbul: {
        dir: './metrics/coverage',
        reporters: ['text-summary', 'html']
    },

    mocha: {
        reporter: 'nyan'
    },

    size: {
        showFiles: true,
        title: 'File Size: '
    }
};
