/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use_strict'

var module = angular.module('flashcard.scroller', []);

module.controller('ScrollerController', ['$scope', function($scope){
        console.log('------ We are in ScrollerController')
        $scope.doSwipeleft = function () {
            console.log('----- Swipe left');
        };
}]);

