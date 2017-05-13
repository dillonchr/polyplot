describe('app', () => {
    let app;

    beforeEach(() => {
        app = require('../app')();
    });

    it('should get the app', () => {
        expect(app).toBeDefined();
    });

    it('should have an init and search', () => {
        expect(app.init).toBeDefined();
        expect(app.fakeOutInit).not.toBeDefined();
        expect(app.search).toBeDefined();
    });
});
