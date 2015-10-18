(function() {
    'use strict';

    angular.module('PolyPlot')
        .controller('MapCtrl', function($scope, GoogleMaps) {
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
                GoogleMaps.searchPlaces($scope.map, 'thrift stores')
                    .then(onSearchResults);
            }
        

            function onSearchResults(results) {
                var i = results.length;
                var bounds = new google.maps.LatLngBounds();

                while(i--) {

                    var place = results[i];
                    markers.push(new google.maps.Marker({
                        position: place.geometry.location,
                        map: $scope.map
                    }));
                    bounds.extend(place.geometry.location);

                }

                $scope.map.fitBounds(bounds);
            }
        });
}());