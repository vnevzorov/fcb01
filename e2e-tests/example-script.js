/**
 * Created by vlad on 5/18/15.
 */
'use_strict'
/**
 * This is a demo Protractor test script. Protractor does automatic web GUI testing in a browser.
 */
describe('my app', function () {
        beforeEach(function () {
            browser.get('index.html');
        });

        it('should automatically redirect to #/tab/account URL', function () {
            expect(browser.getLocationAbsUrl()).toMatch('/tab/account');
        });
});