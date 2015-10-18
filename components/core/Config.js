(function() {
    'use strict';

    angular.module('PolyPlot')
        .config(function($routeProvider) {
            $routeProvider
                .when('/', {
                    controller: 'MapCtrl',
                    templateUrl: 'components/map/Map.html'
                })
                .otherwise({
                    redirectTo: '/'
                });
        });
}());