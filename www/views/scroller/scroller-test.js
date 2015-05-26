/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 * Created by vlad on 5/18/15.
 */

'use_strict'

/**
 * This is a set of unit tests for controllers.js
 */

describe ('Test for ScrollerController', function () {

    var scrollerCtrl;
    var scope;
    /**
     * This loads all Angular modules listed fresh before each test
     */
    beforeEach(angular.mock.module('flashcard.scroller'));

    /**
     * This injects all dependencies
     */
    beforeEach(inject(function ($controller, $rootScope) {

        scope = $rootScope.$new();
        scrollerCtrl = $controller('ScrollerController', {
            $scope: scope
        });
    }));

    /**
     * Verifies that the DashCtrl controller has been instantiated
     */
    it('should instantiate controller', function () {
        expect(scrollerCtrl).toBeDefined();
    });

    /**
     * Test if doSwipleft() function was defined
     */
    it('should define doSwipeleft() function', function () {
        expect(scope.doSwipeleft).toBeDefined();
    });
});

