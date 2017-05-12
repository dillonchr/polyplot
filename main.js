const currentLocation = require('./components/utils/current-location');
let map;

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
            map = app.createMap(coords);
            let marker = new google.maps.Marker({
                position: coords,
                map: map
            });
        });
};

window['searchPlaces'] = function (form) {
    let service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
        bounds: map.getBounds(),
        keyword: form.querySelectorAll('.search__input').value
    }, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            console.log(results);
        } else {
            console.error('failed', results, status);
        }
    });
    return false;
};
