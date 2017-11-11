﻿define(['factory', 'entity-factory', 'image-handle', 'image-display-settings', 'text-handle', 'text', 'validator', 'ui-config'],
function (Factory, EntityFactory, ImageHandle, ImageDisplaySettings, TextHandle, Text, validator, config) {

    UIElementFactory.prototype = Object.create(Factory.prototype);
    UIElementFactory.prototype.constructor = UIElementFactory;
    function UIElementFactory(engine) {
        Factory.call(this, engine);
        this.__componentFactory = null;
        this.__entityFactory = null;
        this.__assetMap = null;
    };
    // private methods
    UIElementFactory.prototype.__oninit = function () {
        Factory.prototype.__oninit.call(this);
        this.__componentFactory = this.__engine.getFactory('component-factory');
        this.__entityFactory = this.__engine.getFactory('entity-factory');
        this.__assetMap = this.__engine.getAssetMap();
    };
    // public methods
    UIElementFactory.prototype.create = function (elementString) {
        var uiElement = this.__entityFactory.create(elementString, [this.__engine]);
        validator.validateInstanceType(this, uiElement, 'ui-element');
        uiElement.addComponent(this.__componentFactory.createFromPrimitive(new Text('')));
        // configure element image
        var displaySettings = new ImageDisplaySettings('none');
        uiElement.addComponent(this.__componentFactory.createFromDataHandle(new ImageHandle(null, displaySettings)));
        // configure display layers
        uiElement.forEachComponent(function (key, component) {
            if (component.isDrawable) {
                var displaySettings = component.getDisplaySettings();
                if (displaySettings) {
                    displaySettings.displayLayer = config[uiElement.constructor.name] ?
                        config[uiElement.constructor.name].displayLayer : 'none';
                }
            }
        });
        return uiElement;
    };
    UIElementFactory.prototype.getContainer = function () { };

    return UIElementFactory;
});