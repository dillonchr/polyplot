let mapFactory = require('../map/map');
const mockSdk = require('./map-sdk.mock');

describe('map', () => {
    let div;

    beforeEach(() => {
        div = document.createElement('map');
        div.className = 'map';
    });

    it('should init without coords', () => {
        const map = mapFactory(mockSdk, div, null);
        expect(map).toBeDefined();
    });

    it('should init with coords', () => {
        spyOn(mockSdk, 'Map').and.callThrough();
        const map = mapFactory(mockSdk, div, {lat: 0, lng: 1});
        expect(mockSdk.Map).toHaveBeenCalled();
        expect(map.getMap().center.lat).toBe(0);
        expect(map.getMap().center.lng).toBe(1);
    });

    describe('creation methods', () => {
        let map;
        beforeEach(() => {
            map = mapFactory(mockSdk, div);
        });

        it('remove user marker when adding a new one', () => {
            const mockMarker = {
                setMap: jasmine.createSpy('setMap-Marker')
            };
            map.userMarker = mockMarker;
            map.addUserMarker({lat: 0, lng: 1});
            expect(mockMarker.setMap).toHaveBeenCalledWith(null);
            expect(map.userMarker.position.lat).toBe(0);
            expect(map.userMarker.position.lng).toBe(1);
        });

        it('should add place marker with appropriate colors', () => {
            const marker = map.addPlaceMarker({lat: 0, lng: 1}, 'red');
            expect(marker.position.lat).toBe(0);
            expect(marker.position.lng).toBe(1);
            expect(marker.icon.fillColor).toEqual('red');
            expect(marker.icon.strokeColor).toEqual('red');
        });

        it('should request a search', () => {
            spyOn(mockSdk.places.PlacesService(), 'nearbySearch');
            map.searchForPlace('hello');
            const args = mockSdk.places.PlacesService().nearbySearch.calls.argsFor(0);
            expect(args[0].keyword).toEqual('hello');
        });
    });
});