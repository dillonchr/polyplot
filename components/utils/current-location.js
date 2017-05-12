module.exports = new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(pos => {
            resolve({lat: pos.coords.latitude, lng: pos.coords.longitude});
        }, () => reject({reason: 'Not permitted access to location'}));
    } else {
        reject({reason: 'Unsupported in current browser'});
    }
});
