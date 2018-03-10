﻿define(['tool-handler'],
function (ToolHandler) {

    WireCutterTool.prototype = Object.create(ToolHandler.prototype);
    WireCutterTool.prototype.constructor = WireCutterTool;
    function WireCutterTool(engine) {
        ToolHandler.call(this, engine);
        this.__wireCutter = null;
        this.__isWireCutterPrioritized = false;
    };
    // private methods
    WireCutterTool.prototype.__oninit = function () {
    };
    WireCutterTool.prototype.__onload = function () {
        this.__enableAll('wire');
    };
    WireCutterTool.prototype.__onunload = function () {
        if (!this.__isWireCutterPrioritized) {
            this.__disableAll('wire');
        }
    };
    WireCutterTool.prototype.__initWireCutter = function () {
        if (this.__selectionBox) {
            utils.validator.throw(this, 'initWireCutter', 'A wire cutter has already been initialized');
        }
        this.__wireCutter = this.__engine.getFactory('ui-element-factory').create('wire-cutter');
    };
    WireCutterTool.prototype.__prioritizeWireCutter = function () {
        this.__isWireCutterPrioritized = true;
        this.__disableAll('wire');
    };
    WireCutterTool.prototype.__destroyWireCutter = function () {
        if (!this.__wireCutter.isEmpty) {
            var batch = this.__toolActionFactory.create('batch-tool-action');
            this.__wireCutter.forEach(function (wire) {
                var action = this.__toolActionFactory.create('wire-cutter-action');
                action.setTarget(wire);
                batch.addAction(action);
            }, this);
            this.__revisionController.addAction(batch);
        }
        this.__wireCutter.destroy();
        this.__wireCutter = null;
        this.__isWireCutterPrioritized = false;
    };
    // public methods
    WireCutterTool.prototype.keydown = function (keyboardHandle) {
        var keyString = keyboardHandle.getKeyString();
        if (keyString === 'shift') {
            this.__labController.setRepeatLastActionOn();
        } else {
            ToolHandler.prototype.keydown.call(this, keyboardHandle);
        }
    };
    WireCutterTool.prototype.keyup = function (keyboardHandle) {
        var keyString = keyboardHandle.getKeyString();
        if (keyString === 'shift') {
            this.__labController.setRepeatLastActionOff();
            this.__labController.idle();
        }
    };
    WireCutterTool.prototype.enter = function () {
    };
    WireCutterTool.prototype.escape = function () {
    };
    WireCutterTool.prototype.mousemove = function (position) {
        if (!this.__wireCutter) {
            return;
        } else {
            this.__wireCutter.lineTo(position);
            if (!this.__isWireCutterPrioritized) {
                this.__prioritizeWireCutter();
            }
        }
    };
    WireCutterTool.prototype.mousedown = function () {
        if (!this.__wireCutter) {
            this.__initWireCutter();
        }
    };
    WireCutterTool.prototype.mouseup = function () {
    };
    WireCutterTool.prototype.click = function () {
        var target = this.__labController.flushTarget();
        if (target) {
            var action = this.__toolActionFactory.create('wire-cutter-action');
            action.setTarget(target);
            this.__revisionController.addAction(action);
            target.destroy();
        }
        if (this.__wireCutter) {
            this.__destroyWireCutter();
        }
        this.__labController.idle();
    };
    WireCutterTool.prototype.dispose = function () {
        this.unload();
        if (this.__wireCutter) {
            this.__destroyWireCutter();
        }
        this.__labController.setRepeatLastActionOff();
    };

    return WireCutterTool;
});