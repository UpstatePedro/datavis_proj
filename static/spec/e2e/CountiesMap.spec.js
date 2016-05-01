describe('Counties chloropleth', function() {

    beforeEach(function() {
        browser.get('http://localhost:8000/#/');
        var visLink = element(by.id('vis-link'));
        visLink.element(by.css('h2')).click()

        cropSelect = helpers.selectOption('crop_name', 'Corn');
        expect(cropSelect.$('option:checked').getText()).toEqual('Corn');

        yearSelect = helpers.selectOption('filterYear', '2000');
        expect(yearSelect .$('option:checked').getText()).toEqual('2000');

        element(by.id('Illinois')).click();
    })

    it('should be on the counties map page', function() {
       var url = browser.getCurrentUrl();
        expect(url).toEqual('http://localhost:8000/#/us-counties-map/state/17/year/2000/crop/corn/');
    });

    it('should have an element / path for the 102 counties in the state of Illinois', function() {
        var paths = element.all(by.css('path.regions'));
        expect(paths.count()).toEqual(102);
    });

    it('should respond to selection of a year', function() {
        cropSelect = helpers.selectOption('crop_name', 'Corn');
        expect(cropSelect.$('option:checked').getText()).toEqual('Corn');

        yearSelect = helpers.selectOption('filterYear', '2012');
        expect(yearSelect .$('option:checked').getText()).toEqual('2012');

        var illinois = element(by.id('montgomery'));
        expect(illinois.getAttribute('data')).toEqual('73.2, BU / ACRE');
    });

    it('should respond to selection of a crop', function() {
        cropSelect = helpers.selectOption('crop_name', 'Soybean');
        expect(cropSelect.$('option:checked').getText()).toEqual('Soybean');

        yearSelect = helpers.selectOption('filterYear', '2000');
        expect(yearSelect .$('option:checked').getText()).toEqual('2000');

        var montgomery = element(by.id('montgomery'));
        expect(montgomery.getAttribute('data')).toEqual('43, BU / ACRE');
    })

    it('should have the correct name for the state in the link', function() {
        var stateName = element(by.binding('state_name'));
        expect(stateName.getText()).toMatch('Illinois');
    });

    it('should provide a link to the state-wide historical data viewer', function() {
        var statewideHistoryLink = element(by.id('statewide-history-link'));
        expect(statewideHistoryLink.getText()).toMatch('(Illinois)');
    });

});