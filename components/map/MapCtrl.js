(function() {
    'use strict';

    angular.module('PolyPlot')
        .controller('MapCtrl', function($scope) {
            $scope.googleMaps.then(function() {
                console.log('making map');
                $scope.map = new google.maps.Map(document.getElementById('map-container'), {
                    center: {lat: -34.397, lng: 150.644},
                    zoom: 8
                });
            });
            console.log('waiting wishing');
        });
}());