﻿define(['validator'], function (validator) {

    function Destructible() {
        var target = this;
        validator.validateInstanceType(target, target, 'emitter');
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
        target.registerEvents(
            'ondestroy'
        );
    };
    Destructible.prototype.destroy = function () {
        if (this.__isDestroyed) {
            validator.throw(this, 'destroy', 'Objects cannot be destroyed more than once');
        }
        this.__isDestroyed = true
        this.emit('ondestroy', this);
    };

    return Destructible;
});