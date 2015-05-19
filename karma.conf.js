/**
 * Created by vlad on 5/18/15.
 */

module.exports = function (config) {
    config.set({
        basePath: './',
        files: [
            'www/lib/ionic/js/ionic.bundle.js',
            'www/lib/bc/angular-mocks/angular-mocks.js',
            'www/js/vendor/angular-touch.js',
            'www/js/bodycalc.js',
            'www/js/vendor/Chart.min.js',
            'www/js/storage.js',
            'www/js/app.js',
            'www/js/tab-account.js',
            'www/js/controllers.js',
            'www/js/services.js',
            'www/js/ui.js',
            'www/js/*-test.js'
        ],
        autoWatch: true,
        frameworks: ['jasmine'],
        browsers: ['Chrome'],
        plugins: [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
        ],
        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }
    });
};
