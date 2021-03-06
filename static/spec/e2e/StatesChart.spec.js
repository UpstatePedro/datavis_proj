var StatesChart = require('./helpers/StatesChartHelper');

describe('counties chart', function() {

    beforeEach(function() {
       browser.get('http://localhost:8000/#/');
        var visLink = element(by.id('vis-link'));
        visLink.element(by.css('h2')).click()

        cropSelect = helpers.selectOption('crop_name', 'Corn');
        expect(cropSelect.$('option:checked').getText()).toEqual('Corn');

        yearSelect = helpers.selectOption('filterYear', '2000');
        expect(yearSelect .$('option:checked').getText()).toEqual('2000');

        element(by.id('Illinois')).click();
        element(by.id('statewide-history-link')).click()
    });

    it('should be on the states chart page', function() {
       var url = browser.getCurrentUrl();
        expect(url).toEqual('http://localhost:8000/#/us-state-chart/crop/corn/state/17/');
    });

    describe('displays correct data for selected parameters', function() {

        it('should respond to selection of start & end year, and crop', function() {
            var chart = new StatesChart();

            chart.interact('Soybean', '1990', '1995');
            var circles = element.all(by.css('circle'));
            expect(circles.count()).toEqual(6);

            chart.interact('Corn', '1990', '2000');
            var circles = element.all(by.css('circle'));
            expect(circles.count()).toEqual(11);

            chart.interact('Wheat', '1985', '2005');
            var circles = element.all(by.css('circle'));
            expect(circles.count()).toEqual(21);
        });

        it('should have the correct value attached for each data point', function() {
            var chart = new StatesChart();
            chart.interact('Soybean', '1990', '1995');

            var data_1990 = element(by.id('data-1990')).getAttribute('data');
            expect(data_1990).toEqual('39');
            var data_1991 = element(by.id('data-1991')).getAttribute('data');
            expect(data_1991).toEqual('37.5');
            var data_1992 = element(by.id('data-1992')).getAttribute('data');
            expect(data_1992).toEqual('43');
            var data_1993 = element(by.id('data-1993')).getAttribute('data');
            expect(data_1993).toEqual('43');
            var data_1994 = element(by.id('data-1994')).getAttribute('data');
            expect(data_1994).toEqual('45.5');
            var data_1995 = element(by.id('data-1995')).getAttribute('data');
            expect(data_1995).toEqual('39');
        });

    });

    it('should provide a link back to the counties map', function() {
        var countiesMapLink = element(by.id('counties-map-link'));
        expect(countiesMapLink.getText()).toMatch('Return to counties map');

        countiesMapLink.element(by.css('h3')).click()
        var url = browser.getCurrentUrl();
        expect(url).toEqual('http://localhost:8000/#/us-counties-map/state/17/year/2014/crop/corn/');
    });

});