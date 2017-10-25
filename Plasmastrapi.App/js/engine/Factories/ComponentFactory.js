﻿define(['factory', 'component', 'emitter-factory', 'dictionary', 'component-container', 'drawable-component-container', 'primitive', 'data-handle', 'mesh', 'utils'],
function (Factory, Component, EmitterFactory, Dictionary, ComponentContainer, DrawableComponentContainer, Primitive, DataHandle, Mesh, utils) {

    ComponentFactory.prototype = Object.create(Factory.prototype);
    ComponentFactory.prototype.constructor = ComponentFactory;
    function ComponentFactory(engine) {
        Factory.call(this, Component);
        this.__emitterFactory = engine.getFactory(EmitterFactory);
        this.__containers = new Dictionary(ComponentContainer);
        this.__drawableComponentContainer = new DrawableComponentContainer();
    };
    // private methods
    ComponentFactory.prototype.__getOrInitContainer = function (ComponentType) {
        // if container doesn't exist for this component type, create one
        var container = this.__containers.get(ComponentType);
        if (!container) {
            var modulePrefix = utils.modules.getModulePrefix(ComponentType);
            var ContainerType = utils.modules.require(`${modulePrefix}-container`);
            if (ContainerType !== null) {
                container = new ContainerType(ComponentType);
            } else {
                container = new ComponentContainer(ComponentType);
            }
            this.__containers.add(ComponentType, container);
        }
        return container;
    };
    // public methods
    ComponentFactory.prototype.create = function (ComponentType, args) {
        var container = this.__getOrInitContainer(ComponentType);
        var component = this.__emitterFactory.create(ComponentType.bind.apply(ComponentType, [null].concat(args)));
        container.add(component);
        if (component.isDrawable) {
            this.__drawableComponentContainer.add(component);
        }
        return component;
    };
    ComponentFactory.prototype.createFromDataHandle = function (dataHandle) {
        utils.validator.validateInstanceType(this, dataHandle, DataHandle);
        var modulePrefix = utils.modules.getModulePrefix(dataHandle, 'Handle');
        var ComponentType = utils.modules.require(`${modulePrefix}-component`); 
        var component = this.create(ComponentType, [dataHandle]);
        return component;
    };
    ComponentFactory.prototype.createFromPrimitive = function (primitive) {
        utils.validator.validateInstanceType(this, primitive, Primitive);
        var modulePrefix = utils.modules.getModulePrefix(primitive, null);
        var ComponentType, HandleType, DisplaySettings;
        if (primitive instanceof Mesh) {
            ComponentType = utils.modules.require('mesh-component');
            HandleType = utils.modules.require('mesh-handle');
            DisplaySettings = utils.modules.require('mesh-display-settings');
        } else {
            ComponentType = utils.modules.require(`${modulePrefix}-component`);
            HandleType = utils.modules.require(`${modulePrefix}-handle`);
            DisplaySettings = utils.modules.require(`${modulePrefix}-display-settings`);
        }
        var component = this.create(ComponentType, [new HandleType(primitive, new DisplaySettings())]);
        return component;
    };
    ComponentFactory.prototype.getContainer = function (ComponentType) {
        return this.__getOrInitContainer(ComponentType);
    };
    ComponentFactory.prototype.getDrawableComponentContainer = function () {
        return this.__drawableComponentContainer;
    };

    return ComponentFactory;
});