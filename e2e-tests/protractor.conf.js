/**
 * Created by vlad on 5/18/15.
 */
exports.config = {
    allScriptsTimeout: 11000,
    specs: [
        '*-script.js'
    ],
    capabilities: {
        'browserName': "chrome"
    },
    baseUrl: 'http://localhost:3000',
    framework: 'jasmine',
    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000
    }
};