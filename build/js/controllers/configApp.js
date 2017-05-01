angular.module('notes')
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {

                templateUrl: './templates/firstPage.tpl.html',

            })
            .when('/create-page', {

                templateUrl: './templates/createPage.tpl.html',
                controller: 'createCtrl'

        });

        $locationProvider.hashPrefix('');
    });