const currentLocation = require('./utils/current-location');
const mapFactory = require('./map/map');

module.exports = {
    init() {
        currentLocation
            .then(coords => {
                this.map = mapFactory(google.maps, document.querySelector('.map'), coords);
                if (coords) {
                    this.map.addUserMarker(coords);
                }
            });
    },
    search() {
        this.map.searchForPlace(document.querySelectorAll('.search__input')[0].value)
            .then(results => results.map(r => this.map.addPlaceMarker(r.geometry.location, 'crimson')))
            .catch(err => console.error('Something went amiss', err));
        return false;
    }
};
