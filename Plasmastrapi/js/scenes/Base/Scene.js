define(['base', 'container', 'entity', 'validator'],
function (Base, Container, Entity, validator) {

    // CLASS Scene
    Scene.prototype = Object.create(Base.prototype);
    Scene.prototype.constructor = Scene;
    function Scene() {
        // inherits from
        Base.call(this);
		// private variables
        this.__entities = new Container(Entity);
    };
    // private methods
    Scene.prototype.__oninit = function () { };
    Scene.prototype.__onload = function () {
        this.__entities.forEach(function (entity) {
            entity.load();
        });
    };
    Scene.prototype.__onunload = function () {
        this.__entities.forEach(function (entity) {
            entity.unload();
        });
    };
    // public methods
    Scene.prototype.add = function (entity) {
        this.__entities.add(entity);
        entity.addEventListener('ondestroy', this.remove.bind(this));
	    if (this.__isLoaded) {
	        entity.load();
	    }
	};
	Scene.prototype.remove = function (entity) {
	    var removedEntity = this.__entities.remove(entity);
	    if (removedEntity.isLoaded) {
	        removedEntity.unload();
	    }
	};

	return Scene;
});