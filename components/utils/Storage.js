const STORAGE_KEY = 'PolyPlotDataStore';
let _storage;

module.exports = {
    getStorage() {
        if (!_storage) {
            try {
                _storage = JSON.parse(window.localStorage.getItem(STORAGE_KEY));
            } catch (ignore) {
                _storage = {};
            }
        }
        return _storage;
    },
    get(key, defaultValue) {
        return this.getStorage()[key] || defaultValue;
    },
    set(key, value) {
        this.getStorage()[key] = value;
        this.save();
    },
    save() {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(this.getStorage()));
    }
};