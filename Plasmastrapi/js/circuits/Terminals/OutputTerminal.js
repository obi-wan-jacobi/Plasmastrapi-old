﻿define(['terminal', 'circuit-constants'],
function (Terminal, CIRCUITS) {

    // CLASS OutputTerminal
    OutputTerminal.prototype = Object.create(Terminal.prototype);
    OutputTerminal.prototype.constructor = OutputTerminal;
    function OutputTerminal() {
        // inherits from
        Terminal.call(this);
        // events
        this.__registerEvents(
            'onstatechange'
        );
    };
    // private methods
    OutputTerminal.prototype.__oninit = function () {
        // initialize pass-through event handling
        this.__parent.addEventListener('onstatechange', this, this.__$onstatechange);
    };
    // public prototypal variables
    Object.defineProperties(OutputTerminal.prototype, {
        'isPowered': {
            get: function () {
                return this.__state > CIRCUITS.STATES.NOPOWER;
            }
        },
        'isHigh': {
            get: function () {
                return this.__state === CIRCUITS.STATES.HIGH;
            }
        },
        'isLow': {
            get: function () {
                return this.__state === CIRCUITS.STATES.LOW;
            }
        }
    });
    // public methods
    OutputTerminal.prototype.getState = function () {
        return this.__parent.getState();
    };

    return OutputTerminal;
});