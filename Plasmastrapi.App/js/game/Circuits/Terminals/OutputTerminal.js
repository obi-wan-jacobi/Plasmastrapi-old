﻿define(["../Base/Terminal", "../../../engine/Namespaces/$Components", "../../Namespaces/$PickableTraits"], function (Terminal, $, $PickableTraits) {

    // CLASS OutputTerminal
    OutputTerminal.prototype = Object.create(Terminal.prototype);
    OutputTerminal.prototype.constructor = OutputTerminal;
    function OutputTerminal(offsetPosition, circuitElement) {

        Terminal.call(this, offsetPosition, circuitElement);

        this.__defaultFrameIndex = 0;

        // tool compatibility
        var pickableComponent = this.getComponent($.PickableComponent);

        $PickableTraits.WireableAsOutput.call(pickableComponent);

        // state
        this.__state = this.states.NOPOWER;

        // events
        this.registerEvents(
            'onstatechange'
        );
    };
    // public prototypal variables
    OutputTerminal.prototype.states = {
        NOPOWER: -1,
        LOW: 0,
        HIGH: 1
    };
    Object.defineProperties(OutputTerminal.prototype, {
        'state': {
            get: function () {
                return this.__state;
            },
            set: function (state) {
                if (!(state >= -1 && state <= 1)) {
                    throw new Error(this.constructor.name + ':state set - State ' + state + ' is not valid.');
                }
                this.__state = state;
                this.__fire('onstatechange', this.__state);
            }
        },
        'isPowered': {
            get: function () {
                return this.__state > this.states.NOPOWER;
            }
        },
        'isHigh': {
            get: function () {
                return this.__state === this.states.HIGH;
            }
        },
        'isLow': {
            get: function () {
                return this.__state === this.states.LOW;
            }
        }
    });
    
    return OutputTerminal;
});