module.exports = new Promise((resolve, ignore) => {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(pos => {
            resolve({lat: pos.coords.latitude, lng: pos.coords.longitude});
        }, () => {
            resolve(null);
            console.error('CURRENT_LOCATION: Not permitted access to location');
        });
    } else {
        resolve(null);
        console.error('CURRENT_LOCATION: Unsupported in current browser');
    }
});
