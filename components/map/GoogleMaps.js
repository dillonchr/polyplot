(function() {
    'use strict';

    angular.module('PolyPlot')
        .service('GoogleMaps', function($window, $q, GOOGLE_API_KEY, $rootScope, $compile, $templateCache, Storage) {


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

            function _searchPlces(search, radius) {
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
            }

            var markers = [];

            this.searchPlaces = function(search, radius) {
                var self = this;

                return $q.all(search.map(function(search) {
                    return _searchPlces(search.query, radius)
                        .then(function(results) {
                            var places = self.filterRemovedPlaces(results);
                            var i = places.length;

                            while(i--) {
                                var place = places[i];
                                markers.push(self.addMarkerForPlace(place, search.color));
                            }
                            return places;
                        });
                }));
            };

            this.addMarker = function(location, color, extraOptions) {
                return new google.maps.Marker(angular.extend({
                    position: location,
                    map: currentMap,
                    icon: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|' + color
                }, extraOptions));
            };

            this.addMarkerForPlace = function(place, color) {
                var self = this;

                var marker = self.addMarker(place.geometry.location, color, {
                    title: place.name,
                    clickable: true
                });

                marker.place = place;

                google.maps.event.addListener(marker, 'click', function() {
                    if(!marker.infoWindow) {
                        marker.infoWindow = self.createInfoWindow(place, marker);
                    }

                    marker.infoWindow.open(currentMap, marker);
                });
                return marker;
            };

            this.createInfoWindow = function(place) {
                var self = this, scope = $rootScope.$new();
                scope.place = place;

                var element = $compile($templateCache.get('components/map/InfoWindow.html'))(scope);

                element.find('button')
                    .on('click', function() {
                        self.removeSite(place, angular.element(this).hasClass('site-by-name'));
                    });

                scope.$digest();

                return new google.maps.InfoWindow({
                    content: element[0]
                });
            };

            this.removeSite = function(place, byName) {
                var filterFn,
                    filteredPlaces = Storage.get('removedPlaces');

                if(byName) {
                    filterFn = function(m) {
                        return m.place.name === place.name;
                    };
                    filteredPlaces.names.push(place.name);
                } else {
                    filterFn = function(m) {
                        return m.place.place_id === place.place_id;
                    };
                    filteredPlaces.ids.push(place.place_id);
                }

                markers.filter(filterFn)
                    .forEach(function(m) {
                        m.setMap(null);
                    });
                Storage.set('removedPlaces', filteredPlaces);
            };

            this.filterRemovedPlaces = function(places) {
                var removedPlaces = Storage.get('removedPlaces', {ids: [], names: []});

                if(removedPlaces.ids.length + removedPlaces.names.length) {
                    return places.filter(function (place) {
                        return removedPlaces.names.indexOf(place.name) === -1 &&
                            removedPlaces.ids.indexOf(place.place_id) === -1;
                    });
                }

                return places.filter(function(p) { return !p.permanently_closed; });
            };
        });
}());