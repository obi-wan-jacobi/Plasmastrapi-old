﻿define(['factory', 'circuit-element-factory', 'logic-element', 'component-factory', 'image-handle', 'image-display-settings', 'utils', 'circuits-config'],
function (Factory, CircuitElementFactory, LogicElement, ComponentFactory, ImageHandle, ImageDisplaySettings, utils, config) {

    LogicElementFactory.prototype = Object.create(Factory.prototype);
    LogicElementFactory.prototype.constructor = LogicElementFactory;
    function LogicElementFactory(game) {
        Factory.call(this, LogicElement);
        this.__componentFactory = game.getFactory(ComponentFactory);
        this.__circuitElementFactory = game.getFactory(CircuitElementFactory);
        this.__assetMap = game.getAssetMap();
    };
    // public methods
    LogicElementFactory.prototype.create = function (LogicElementType) {
        var logicElement = this.__circuitElementFactory.create(LogicElementType);
        utils.validator.validateInstanceType(this, logicElement, LogicElement);
        // add components
        var image = this.__assetMap.get(utils.modules.getModulePrefix(LogicElementType, null));
        var displaySettings = new ImageDisplaySettings(config.LogicElement.displayLayer, null, null, image.width, image.height, image.width, image.height);
        var component = this.__componentFactory.createFromDataHandle(new ImageHandle(image, displaySettings)); // image
        logicElement.addComponent(component);
        return logicElement;
    };
    LogicElementFactory.prototype.getContainer = function () { };

    return LogicElementFactory;
});