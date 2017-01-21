﻿define(["../Base"], function (Base) {

    function Destructible(ClassPrototype) {
        var target = ClassPrototype || this;
        if (!(target.__registerEvents)) {
            throw new Error(Destructible.name + ':constructor - Target must be an instance of EventEmitter');
        }
        target.__isDestroyed = false;
        Object.defineProperties(target, {
            'isDestructible': {
                get: function () {
                    return true;
                }
            },
            'isDestroyed': {
                get: function () {
                    return this.__isDestroyed;
                }
            }
        });
        target.destroy = Destructible.prototype.destroy;
        target.__registerEvents(
            'ondestroy'
        );
    };
    Destructible.prototype.destroy = function () {
        if (!this.__isDestroyed) {
            this.__isDestroyed = true
            this.__fire('ondestroy', this);
            if (this.isLoaded) {
                this.unload();
            }
            this.__engine.eventEmitterRepository.purge(this);
        }
    };

    return Destructible;
});