module.exports = function(currentLocation, mapFactory) {
    return {
        init() {
            currentLocation
                .then(coords => this.createMap(coords))
        },
        createMap(center) {
            this.map = mapFactory(google.maps, document.querySelector('.map'), center);
            if (center) {
                this.map.addUserMarker(center);
            }
        },
        search() {
            this.map.searchForPlace(document.querySelectorAll('.search__input')[0].value)
                .then(results => results.map(r => this.map.addPlaceMarker(r.geometry.location, 'crimson')))
                .catch(err => console.error('Something went amiss', err));
            return false;
        }
    };
};
