const currentLocation = require('./components/utils/current-location');

window['googleMapsOnReady'] = function() {
    currentLocation.then(coords => {
        new google.maps.Map(document.querySelector('.map'), {
            center: coords,
            zoom: 10
        });
    })
        .catch(err => {
            console.error(`Could not get user location because: ${err.reason||'UNKNOWN'}`);
            
            new google.maps.Map(document.querySelector('.map'), {
                center: {lat: -34.397, lng: 150.644},
                zoom: 8
            });
        });

};
