exports.config = {
    framework: 'jasmine',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    onPrepare: function() {
      helpers = require('./helpers/selectionHelpers.js');
    },
    specs: [
        '*.spec.js'
    ]
}