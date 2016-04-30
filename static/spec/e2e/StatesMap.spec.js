describe('State chloropleth', function() {

    beforeEach(function() {
        browser.get('http://localhost:8000/#/');
        var visLink = element(by.id('vis-link'));
        visLink.element(by.css('h2')).click()
    })

    it('should be on the states map page', function() {
        var url = browser.getCurrentUrl();
        expect(url).toEqual('http://localhost:8000/#/us-states-map');
    });

    it('should have an element / path for 52 states', function() {
        var paths = element.all(by.css('path.regions'));
        expect(paths.count()).toEqual(52);
    });

    it('should have a data element that provides the correct yield value for a particular region', function() {
        cropSelect = helpers.selectOption('crop_name', 'Corn');
        expect(cropSelect.$('option:checked').getText()).toEqual('Corn');

        yearSelect = helpers.selectOption('filterYear', '2000');
        expect(yearSelect .$('option:checked').getText()).toEqual('2000');

        var illinois = element(by.id('Illinois'));
        expect(illinois.getAttribute('data')).toEqual('151, BU / ACRE');
    })

    it('should respond to selection of a year', function() {
        cropSelect = helpers.selectOption('crop_name', 'Corn');
        expect(cropSelect.$('option:checked').getText()).toEqual('Corn');

        yearSelect = helpers.selectOption('filterYear', '2005');
        expect(yearSelect .$('option:checked').getText()).toEqual('2005');

        var illinois = element(by.id('Illinois'));
        expect(illinois.getAttribute('data')).toEqual('143, BU / ACRE');
    })

    it('should respond to selection of a crop', function() {
        cropSelect = helpers.selectOption('crop_name', 'Soybean');
        expect(cropSelect.$('option:checked').getText()).toEqual('Soybean');

        yearSelect = helpers.selectOption('filterYear', '2014');
        expect(yearSelect .$('option:checked').getText()).toEqual('2014');

        var illinois = element(by.id('Indiana'));
        expect(illinois.getAttribute('data')).toEqual('56, BU / ACRE');
    })

});