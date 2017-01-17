﻿define(["../Base"], function (Base) {

    function Loadable(ClassPrototype) {
        var target = ClassPrototype || this;
        if (!(target.__registerEvents)) {
            throw new Error(Loadable.name + ':constructor - Target must be an instance of EventEmitter');
        }
        target.__isLoaded = false;
        target.__isInitialized = false;
        Object.defineProperties(target, {
            'isLoadable': {
                get: function () {
                    return true;
                }
            },
            'isLoaded': {
                get: function () {
                    return this.__isLoaded;
                }
            },
            'isInitialized': {
                get: function () {
                    return this.__isInitialized;
                }
            }
        });
        target.load = Loadable.prototype.load;
        target.unload = Loadable.prototype.unload;
        target.reload = Loadable.prototype.reload;
        target.__registerEvents(
            'oninit',
            'onload',
            'onunload'
        );
    };
    Loadable.prototype.load = function () {
        if (!this.__isLoaded) {
            this.__isLoaded = true;
            if (!this.__isInitialized) {
                this.__isInitialized = true;
                this.__fire('oninit');
            }
            this.__fire('onload');
        }
    };
    Loadable.prototype.unload = function () {
        if (this.__isLoaded) {
            this.__isLoaded = false;
            this.__fire('onunload');
        }
    };
    Loadable.prototype.reload = function () {
        this.unload();
        this.load();
    };

    return Loadable;
});