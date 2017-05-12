const currentLocation = require('./components/utils/current-location');

window['googleMapsOnReady'] = function () {

    const app = {
        createMap(coords) {
            return new google.maps.Map(document.querySelector('.map'), {
                center: coords || {lat: -34.397, lng: 150.644},
                zoom: 10
            });
        }
    };


    currentLocation
        .then(coords => {
            let map = app.createMap(coords);
            let marker = new google.maps.Marker({
                position: coords,
                map: map
            });
        });
};
