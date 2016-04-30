exports.selectOption = function(model_name, option) {
    var selectedElement = element(by.model(model_name));
    selectedElement.element(by.cssContainingText('option', option)).click();
    return selectedElement
};
