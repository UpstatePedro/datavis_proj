var CountiesChart = function() {

    this.crop = element(by.model('crop_name'));
    this.startYear = element(by.model('filterStartYear'));
    this.endYear = element(by.model('filterEndYear'));

    this.interact = function(crop_name, start_year, end_year) {
      this.crop.element(by.cssContainingText('option', crop_name)).click();
      this.startYear.element(by.cssContainingText('option', start_year)).click();
      this.endYear.element(by.cssContainingText('option', end_year)).click();
    };
};

module.exports = CountiesChart;