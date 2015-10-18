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

            this.createMap = function(element, center) {
                var map = new google.maps.Map(element, {
                    center: center || {lat: -34.397, lng: 150.644},
                    zoom: 15
                });

                map.placeService = new google.maps.places.PlacesService(map);
                return map;
            };

            this.searchPlaces = function(map, search, radius) {
                var deferred = $q.defer();

                map.placeService.nearbySearch({
                    location: map.getCenter(),
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
        });
}());