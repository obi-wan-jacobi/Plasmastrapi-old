﻿define(['base-element', 'circuit-constants'],
function (BaseElement, CIRCUITCONSTANTS) {

    // CLASS CircuitElement
    CircuitElement.prototype = Object.create(BaseElement.prototype);
    CircuitElement.prototype.constructor = CircuitElement;
    function CircuitElement() {
        // inherits from
        BaseElement.call(this);
        this.__inputs = [];
        this.__state = CIRCUITCONSTANTS.STATES.NOPOWER;
    };
    // private methods
    CircuitElement.prototype.__ondestroy = function () {
        this.__engine.circuitElementContainer.remove(this);
    };
    CircuitElement.prototype.__setState = function (state) {
        this.__state = state;
        this.__fire('onupdatestate');
    };
    // public methods
    CircuitElement.prototype.attachInput = function (inputTerminal) {
        this.__inputs = this.__inputs.concat(input.getConnections());
    };
    CircuitElement.prototype.injectEngine = function (engine) {
        BaseElement.prototype.injectEngine.call(this, engine);
        this.__engine.circuitElementContainer.add(this);
    };
    CircuitElement.prototype.updateState = function (inputState) {
        throw new Error(this.constructor.name + ':updateState - This method must be overridden!');
    };
    
    return CircuitElement;
});