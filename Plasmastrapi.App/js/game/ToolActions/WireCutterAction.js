﻿define(['tool-action', 'utils'],
function (ToolAction, utils) {

    WireCutterAction.prototype = Object.create(ToolAction.prototype);
    WireCutterAction.prototype.constructor = WireCutterAction;
    function WireCutterAction(engine) {
        ToolAction.call(this, engine, 'wire');
        this.__wireFactory = this.__engine.getFactory('augmented-wire-factory');
        this.__inputTerminal = null;
        this.__outputTerminal = null;
    };
    WireCutterAction.prototype.setTarget = function (target) {
        ToolAction.prototype.setTarget.call(this, target);
        this.__inputTerminal = this.__target.inputTerminal;
        this.__outputTerminal = this.__target.outputTerminal;
        this.__target = null;
    };
    WireCutterAction.prototype.undo = function () {
        var wire = this.__wireFactory.create('wire', [this.__outputTerminal, this.__inputTerminal]);
        ToolAction.prototype.setTarget.call(this, wire);
    };
    WireCutterAction.prototype.redo = function () {
        this.__target.destroy();
    };

    return WireCutterAction;
});