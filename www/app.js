/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use_strict'

/**
 * This defines the main AngularJS module and loads OnsenUI as AngularJS module.
 * It also loads AngularJS modules listed.
 * @author V.Nevzorov
 * @since 05/25/2015
 */

var app = ons.bootstrap('FlashcardApp', ['onsen',
    'flashcard.scroller']);

/**
 * This is the main page controller
 * @param {type} param1
 * @param {type} param2
 */
app.controller("PageController", ['$scope', function ($scope) {
        
        //This is the place to put initialization code
        ons.ready(function () {
            console.log('----- Initialization...');
        });
}]);
