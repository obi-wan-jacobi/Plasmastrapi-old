﻿define(['utils'],
function (utils) {

    function ToolAction(engine, targetTypeString) {
        utils.validator.validateInstanceType(this, engine, 'engine');
        utils.validator.validateInstanceType(this, targetTypeString, 'string');
        this.__engine = engine;
        this.__targetTypeString = targetTypeString;
        this.__target = null;
    };
    ToolAction.prototype.setTarget = function (target) {
        utils.validator.validateInstanceType(this, target, this.__targetTypeString);
        this.__target = target;
    };
    ToolAction.prototype.undo = function () {
        utils.validator.throwMethodMustBeOverridden(this, 'undo');
    };
    ToolAction.prototype.redo = function () {
        utils.validator.throwMethodMustBeOverridden(this, 'redo');
    };

    return ToolAction;
});