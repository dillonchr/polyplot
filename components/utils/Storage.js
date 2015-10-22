(function() {
    'use strict';

    angular.module('PolyPlot')
        .service('Storage', function($window) {
            var STORAGE_KEY = 'PolyPlotDataStore';
            var _storage;

            function getStorage() {
                if(!_storage) {
                    var data = $window.localStorage.getItem(STORAGE_KEY);
                    _storage = !!data ? angular.fromJson(data) : {};
                }
                return _storage;
            }

            this.get = function(key, defaultValue) {
                return getStorage()[key] || defaultValue;
            };

            this.set = function(key, value) {
                getStorage()[key] = value;
                this.save();
            };

            this.save = function() {
                $window.localStorage.setItem(STORAGE_KEY, angular.toJson(getStorage()));
            };
        });
}());