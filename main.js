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
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    fillColor: 'powderblue',
                    fillOpacity: 1,
                    strokeColor: 'dodgerblue',
                    strokeWeight: 2,
                    scale: 5
                },
                map: map,
                position: coords
            });
        });
};

function addMarkersForSearchResults(results) {
    return results
        .map(r => {
            return new google.maps.Marker({
                icon: {
                    path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
                    fillColor: 'red',
                    fillOpacity: 0.7,
                    strokeColor: 'crimson',
                    strokeWeight: 2,
                    scale: 3
                },
                map: map,
                position: r.geometry.location
            });
        });
}

window['searchPlaces'] = function (form) {
    let service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
        bounds: map.getBounds(),
        keyword: form.querySelectorAll('.search__input').value
    }, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            let markers = addMarkersForSearchResults(results);
            console.log('search results markerd', markers);
        } else {
            console.error('failed', results, status);
        }
    });
    return false;
};
