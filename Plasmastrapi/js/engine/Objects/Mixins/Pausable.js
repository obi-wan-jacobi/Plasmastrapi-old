﻿define([], function () {

    function Pausable() {
        var target = this;
        validator.validateType(target, target, Emitter);
        target.__isPaused = false;
        Object.defineProperties(target, {
            'isPausable': {
                get: function () {
                    return true;
                }
            },
            'isPaused': {
                get: function () {
                    return this.__isPaused;
                }
            }
        });
        target.loopOnce = Pausable.prototype.loopOnce;
        target.pause = Pausable.prototype.pause;
        target.unpause = Pausable.prototype.unpause;
        target.restart = Pausable.prototype.restart;
        target.registerEvents(
            'onframe',
            'onpause',
            'onunpause'
        );
    };
    Pausable.prototype.loopOnce = function (deltaMs) {
        if (this.isLoaded && !this.isPaused) {
            this.__fire('onframe', deltaMs);
            return true;
        }
        return false;
    };
    Pausable.prototype.pause = function () {
        if (!this.__isPaused) {
            this.__isPaused = true;
            this.__fire('onpause');
        }
    };
    Pausable.prototype.unpause = function () {
        if (this.__isPaused) {
            this.__isPaused = false;
            this.__fire('onunpause');
        }
    };
    Pausable.prototype.restart = function () {
        this.unpause();
        if (this.isLoadable) {
            this.reload();
        }
    };

    return Pausable;
});