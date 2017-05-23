const placesService = {
    nearbySearch(options, callback) {
        return {
            options: options,
            succeed: () => callback('a', 1),
            fail: () => callback(null, 0)
        };
    }
};

module.exports = {
    Map: function(elem, options) {
        return Object.assign({
            getBounds: () => options.bounds
        }, options);
    },
    Marker: function(options) {
        return options;
    },
    places: {
        PlacesService: function() {
            return placesService;
        },
        PlacesServiceStatus: {
            OK: 1
        }
    },
    SymbolPath: {
        CIRCLE: 'circle'
    }
};
