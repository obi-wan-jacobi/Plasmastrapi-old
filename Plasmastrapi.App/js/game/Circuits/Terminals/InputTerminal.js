﻿define(["../Base/Terminal", "./OutputTerminal", "../../../engine/Namespaces/$Components", "../../Namespaces/$PickableTraits"], function (Terminal, OutputTerminal, $, $PickableTraits) {

    // CLASS InputTerminal
    InputTerminal.prototype = Object.create(Terminal.prototype);
    InputTerminal.prototype.constructor = InputTerminal;
    function InputTerminal(offsetPosition, parentElement) {

        // inherits from
        Terminal.call(this, offsetPosition, parentElement);

        // set default sprite frame
        this.__defaultFrameIndex = 1;
        var spriteComponent = this.getComponent($.SpriteComponent);
        spriteComponent.setFrame(this.__defaultFrameIndex);

        // tool compatibility
        var pickableComponent = this.getComponent($.PickableComponent);
        $PickableTraits.WireableAsInput.call(pickableComponent);

        this.__connections = [];
    };
    // public methods
    InputTerminal.prototype.addConnection = function (outputTerminal) {
        if (!(outputTerminal instanceof OutputTerminal)) {
            throw new Error(this.constructor.name + ':addConnection - ' + outputTerminal.constructor.name + ' must be an instance of ' + OutputTerminal.name);
        }
        this.__connections.push(outputTerminal);
        outputTerminal.addEventListener('onstatechange', this.__parent, this.__parent.updateState);
        this.__parent.updateState(outputTerminal.state);
    };
    InputTerminal.prototype.removeConnection = function (outputTerminal) {
        var connectionIndex = this.__connections.indexOf(outputTerminal);
        if (!(connectionIndex >= 0)) {
            throw new Error(this.constructor.name + ':removeConnection - ' + outputTerminal.constructor.name + ' is not connected to this input terminal');
        }
        var terminalToDisconnect = this.__connections[connectionIndex];
        this.__connections.splice(connectionIndex, 1);
        terminalToDisconnect.removeEventListener('onstatechange', this.__parent, this.__parent.updateState);
        this.__parent.updateState(terminalToDisconnect.states.NOPOWER);
    };
    
    return InputTerminal;
});