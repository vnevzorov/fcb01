/**
 * Created by vlad on 5/18/15.
 */

'use_strict'

/**
 * This is a set of unit tests for controllers.js
 */

describe ('Test for controllers', function () {

    var dashCtrl;
    var scope;
    /**
     * This loads all Angular modules listed fresh before each test
     */
    beforeEach(module('starter.controllers'));

    /**
     * This injects all dependencies
     */
    beforeEach(inject(function ($controller, $rootScope) {

        scope = $rootScope.$new();
        dashCtrl = $controller('DashCtrl', {
            $scope: scope
        });
    }));

    /**
     * Verifies that the DashCtrl controller has been instantiated
     */
    it('should instantiate controller', function () {
        expect(dashCtrl).toBeDefined();
    });

    it('should set VM variable to 300', function () {
        expect(scope.VM).toEqual(300);
    });
});