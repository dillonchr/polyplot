(function() {
    'use strict';

    angular.module('PolyPlot')
        .controller('MapCtrl', function($scope, GoogleMaps, $q, Storage) {

            GoogleMaps.api.then(function() {
                var lastLocation = Storage.get('lastLocation');
                $scope.map = GoogleMaps.createMap(document.getElementById('map-container'), lastLocation);

                if(lastLocation) {
                    searchPlaces();
                }

                navigator.geolocation.getCurrentPosition(function(position) {
                    Storage.set('lastLocation', {lat: position.coords.latitude, lng: position.coords.longitude});
                    $scope.currentLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                    GoogleMaps.addMarker($scope.currentLocation, '61DC83');

                    if($scope.map.getBounds() && !$scope.map.getBounds().contains($scope.currentLocation)) {
                        $scope.map.setCenter($scope.currentLocation);
                        searchPlaces();
                    }
                });
            });
            
            function searchPlaces() {
                GoogleMaps.searchPlaces([
                    {
                        query: 'thrift store',
                        color: 'E72C7E'
                    },
                    {
                        query: 'antique mall',
                        color: 'C0FFEE'
                    },
                    {
                        query: 'book store',
                        color: 'FCB040'
                    }
                ])
                    .then(function(results) {
                        var bounds = new google.maps.LatLngBounds();
                        results.forEach(function(places) {
                            places.forEach(function(place) {
                                bounds.extend(place.geometry.location);
                            });
                        });
                        $scope.map.fitBounds(bounds);
                    });
            }
        });
}());