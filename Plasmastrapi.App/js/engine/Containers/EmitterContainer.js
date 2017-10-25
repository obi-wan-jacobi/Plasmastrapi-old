define(['container', 'emitter'],
function (Container, Emitter) {

    // CLASS EmitterContainer
    EmitterContainer.prototype = Object.create(Container.prototype);
    EmitterContainer.prototype.constructor = EmitterContainer;
    function EmitterContainer() {
        Container.call(this, Emitter);
    };
    EmitterContainer.prototype.purge = function (subscriber) {
        this.remove(subscriber);
        this.forEach(function(emitter) {
            emitter.purgeEventListener(subscriber);
        });
    };

    return EmitterContainer;

});