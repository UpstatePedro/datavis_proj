describe('State chloropleth', function() {

    beforeEach(function() {
        browser.get('http://localhost:8000/#/');
        var visLink = element(by.id('vis-link'));
        visLink.element(by.css('h2')).click()
    })

    it('should have an element / path for 52 states', function() {
        var paths = element.all(by.css('path.regions'));
        expect(paths.count()).toEqual(52);
    });

    it('should have a data element that provides the correct yield value for a particular region', function() {
        var cropSelect = element(by.model('crop_name'));
        cropSelect.element(by.cssContainingText('option', 'Corn')).click();
        expect(cropSelect.$('option:checked').getText()).toEqual('Corn');

        var illinois = element(by.id('Illinois'));
        expect(illinois.getAttribute('data')).toEqual('151, BU / ACRE');
    })


});