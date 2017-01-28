﻿define(["../Base/CircuitElement", "../../../engine/Components/$Components", "../../../engine/Data/Geometry", "../../../engine/Data/Graphics",
"../Terminals/OutputTerminal", "../Terminals/InputTerminal", "../Wires/TerminalWireAnchor", "../Wires/TerminalWire"],
function (CircuitElement, $, Geometry, Graphics, OutputTerminal, InputTerminal, TerminalWireAnchor, TerminalWire) {

    // CLASS Gate
    Gate.prototype = Object.create(CircuitElement.prototype);
    Gate.prototype.constructor = Gate;
    function Gate(x, y) {
        // inherits from
        CircuitElement.call(this, x, y);

        // terminals
        var terminalOffsetMarginY = 35;
        var spriteComponent = this.getComponent($.SpriteComponent);

        // output terminal
        var outputTerminal = new OutputTerminal(new Geometry.Position(0, -terminalOffsetMarginY), this);
        var outputTerminalAnchor = new TerminalWireAnchor(new Geometry.Position(0, -spriteComponent.height / 2), this);
        var outputTerminalWire = new TerminalWire(outputTerminal, outputTerminalAnchor);
        // configure dependencies
        this.addChild(outputTerminal);
        this.addChild(outputTerminalAnchor);
        this.addChild(outputTerminalWire);

        // input terminal
        var inputTerminal = new InputTerminal(new Geometry.Position(0, terminalOffsetMarginY), this);
        var inputTerminalAnchor = new TerminalWireAnchor(new Geometry.Position(0, spriteComponent.height / 2), this);
        var inputTerminalWire = new TerminalWire(inputTerminal, inputTerminalAnchor);
        // configure dependencies
        this.addChild(inputTerminal);
        this.addChild(inputTerminalAnchor);
        this.addChild(inputTerminalWire);
    };
    
    return Gate;
});