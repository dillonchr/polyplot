(function() {
    'use strict';

    angular.module('PolyPlot')
        .run(function loadGoogleMapsSDK($window, $rootScope, GOOGLE_API_KEY, $q) {
            var deferred = $q.defer();

            var googleInitCallbackName = 'onGoogleMapsInit' + new Date().getTime();
            $window[googleInitCallbackName] = function() {
                deferred.resolve($window.google.maps);
            };

            var script = document.createElement('script');
            script.src = 'https://maps.googleapis.com/maps/api/js?libraries=places&key=' + GOOGLE_API_KEY + '&callback=' + googleInitCallbackName;
            document.head.appendChild(script);

            $rootScope.googleMaps = deferred.promise;
        });
}());