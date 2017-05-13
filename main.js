const currentLocation = require('./utils/current-location');
const mapFactory = require('./map/map');
const app = (require('./app'))(currentLocation, mapFactory);
window['googleMapsOnReady'] = () => app.init();
window['searchPlaces'] = () => app.search;
