(function() {
    'use strict';

    angular.module('PolyPlot')
        .service('GoogleMaps', function($window, $q, GOOGLE_API_KEY) {


            var googleMapsDeferred = $q.defer();

            var googleInitCallbackName = 'onGoogleMapsInit' + new Date().getTime();
            $window[googleInitCallbackName] = function() {
                googleMapsDeferred.resolve($window.google.maps);
            };

            var script = document.createElement('script');
            script.src = 'https://maps.googleapis.com/maps/api/js?libraries=places&key=' + GOOGLE_API_KEY + '&callback=' + googleInitCallbackName;
            document.head.appendChild(script);

            this.api = googleMapsDeferred.promise;

            var currentMap;
            var currentPlaceService;

            this.createMap = function(element, center) {
                currentMap = new google.maps.Map(element, {
                    center: center || {lat: -34.397, lng: 150.644},
                    zoom: 15
                });

                currentPlaceService = new google.maps.places.PlacesService(currentMap);
                return currentMap;
            };

            this.searchPlaces = function(search, radius) {
                var deferred = $q.defer();

                currentPlaceService.nearbySearch({
                    location: currentMap.getCenter(),
                    radius: radius * 1000 || 10000,
                    keyword: search
                }, function onSearchResults(results, status) {
                    if (status == google.maps.places.PlacesServiceStatus.OK) {
                        deferred.resolve(results);
                    }
                    deferred.reject(status);
                });

                return deferred.promise;
            };

            this.addMarker = function(place, color) {
                return new google.maps.Marker({
                    position: place.geometry.location,
                    map: currentMap,
                    icon: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|' + color
                });
            };
        });
}());