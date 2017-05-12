const app = require('./app');
window['googleMapsOnReady'] = app.init;
window['searchPlaces'] = app.search;
