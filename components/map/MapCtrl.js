(function() {
    'use strict';

    angular.module('PolyPlot')
        .controller('MapCtrl', function($scope) {
            var service;
            var markers = [];
            
            $scope.googleMaps.then(function() {
                $scope.map = new google.maps.Map(document.getElementById('map-container'), {
                    center: {lat: -34.397, lng: 150.644},
                    zoom: 15
                });
                
                service = new google.maps.places.PlacesService($scope.map);

                navigator.geolocation.getCurrentPosition(function(position) {
                    $scope.currentLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                    $scope.map.setCenter($scope.currentLocation);
                    searchPlaces();
                });
            });
            
            function searchPlaces() {
                service.nearbySearch({
                    location: $scope.currentLocation,
                    radius: '10000',
                    keyword: 'thrift store'
                }, onSearchResults);
            }
        

            function onSearchResults(results, status) {
                if (status == google.maps.places.PlacesServiceStatus.OK) {

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
            }
        });
}());