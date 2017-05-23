module.exports = function(mapsSDK, mapElement, coords) {
    const map = new mapsSDK.Map(mapElement, {
        center: coords || {lat: -34.397, lng: 150.644},
        zoom: 13
    });
    const places = new mapsSDK.places.PlacesService(map);

    return {
        userMarker: null,
        getMap() {
            return map;
        },
        addUserMarker(coords) {
            if (this.userMarker) {
                this.userMarker.setMap(null);
            }
            this.userMarker = new mapsSDK.Marker({
                icon: {
                    path: mapsSDK.SymbolPath.CIRCLE,
                    fillColor: 'powderblue',
                    fillOpacity: 1,
                    strokeColor: 'dodgerblue',
                    strokeWeight: 2,
                    scale: 5
                },
                map: map,
                position: coords
            });
        },
        addPlaceMarker(coords, color) {
            return new mapsSDK.Marker({
                icon: {
                    path: mapsSDK.SymbolPath.BACKWARD_CLOSED_ARROW,
                    fillColor: color,
                    fillOpacity: 0.7,
                    strokeColor: color,
                    strokeWeight: 2,
                    scale: 3
                },
                map: map,
                position: coords
            });
        },
        searchForPlace(keyword) {
            return new Promise((resolve, reject) => {
                places.nearbySearch({
                    bounds: map.getBounds(),
                    keyword: keyword
                }, (results, status) => {
                    if (status === mapsSDK.places.PlacesServiceStatus.OK) {
                        resolve(results);
                    } else {
                        reject(status);
                    }
                });
            });
        }
    };
};