(function() {
    'use strict';

    angular.module('PolyPlot')
        .controller('MapCtrl', function($scope, GoogleMaps, $q) {
            var markers = [];

            GoogleMaps.api.then(function(api) {


                $scope.map = GoogleMaps.createMap(document.getElementById('map-container'));

                navigator.geolocation.getCurrentPosition(function(position) {
                    $scope.currentLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                    $scope.map.setCenter($scope.currentLocation);
                    searchPlaces();
                });
            });
            
            function searchPlaces() {
                $q.all([
                GoogleMaps.searchPlaces($scope.map, 'thrift store')
                    .then(function onSearchResults(results) {
                        var i = results.length;
                        while(i--) {
                            var place = results[i];
                            markers.push(GoogleMaps.addMarker(place, $scope.map, 'E72C7E'));
                        }
                        return results;
                    }),

                GoogleMaps.searchPlaces($scope.map, 'antique mall')
                    .then(function onSearchResults(results) {
                        var i = results.length;
                        while(i--) {
                            var place = results[i];
                            markers.push(GoogleMaps.addMarker(place, $scope.map, 'C0FFEE'));
                        }
                        return results;
                    }),

                GoogleMaps.searchPlaces($scope.map, 'book store')
                    .then(function onSearchResults(results) {
                        var i = results.length;
                        while(i--) {
                            var place = results[i];
                            markers.push(GoogleMaps.addMarker(place, $scope.map, 'FCB040'));
                        }
                        return results;
                    })
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
        

            function onSearchResults(results) {
                var i = results.length;
                var bounds = new google.maps.LatLngBounds();

                while(i--) {

                    var place = results[i];
                    markers.push(GoogleMaps.createMarker(place, 'E72C7E'));
                    bounds.extend(place.geometry.location);

                }

                $scope.map.fitBounds(bounds);
            }
        });
}());