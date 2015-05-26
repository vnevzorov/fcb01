/**
 * Created by vlad on 5/18/15.
 */

module.exports = function (config) {
    config.set({
        basePath: './',
        files: [
            'www/lib/bc/onsenui/build/js/angular/angular.js',
            'www/lib/bc/angular-mocks/angular-mocks.js',            
            'www/lib/bc/onsenui/build/js/onsenui.js',
            'www/views/scroller/scroller.js',
            'www/app.js',
            'www/**/*-test.js'
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
