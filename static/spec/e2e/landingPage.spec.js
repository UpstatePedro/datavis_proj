describe('DataVis_Project landing page', function() {

    beforeEach(function() {
       browser.get('http://localhost:8000/#/');
    });

    it('should have a tab title', function(){
       expect(browser.getTitle()).toEqual('TDV');
    });

    // Generally, there's no point in testing the specific wording of some links -
    // they may not be stable.
    // BUT, in this case, they are the key navigation links that appear on every page
    // and so it's worth checking that they are appearing as expected.
    it('should have a link to "Home"', function() {
        var homeButton = element(by.id('Home'));
        expect(homeButton.getText()).toEqual('Home')
    })
    it('should have a link to the "States Map"', function() {
        var mapButton = element(by.id('States-map'));
        expect(mapButton.getText()).toEqual('Back to the States Map')
    })
    it('should have to link "Technologies used"', function() {
        var techButton = element(by.id('Tech-stack'));
        expect(techButton.getText()).toEqual('Technologies used')
    })
    it('should have to have a portal to the visualisation', function() {
        var visLink = element(by.id('vis-link'));
        expect(visLink.getText()).toEqual('Click here to begin...')
    })

});