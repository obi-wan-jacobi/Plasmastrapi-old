﻿define(["../../../engine/Objects/Entity", "../../../engine/Components/$Components", "../../../engine/Data/Geometry", "../../../engine/Data/Graphics"],
function (Entity, $, Geometry, Graphics) {

    // CLASS CircuitElement
    CircuitElement.prototype = Object.create(Entity.prototype);
    CircuitElement.prototype.constructor = CircuitElement;
    function CircuitElement(x, y) {
        // inherits from
        Entity.call(this);

        // pose
        var position = new Geometry.Position(x, y);
        var poseComponent = new $.PoseComponent(position, 0);

        // sprite
        var spriteHandle = new Graphics.SpriteHandle('ondrawgameentities', this.sprite);
        var spriteComponent = new $.SpriteComponent(spriteHandle);

        // configure sprite as collision mesh
        var meshComponent = new $.MeshComponent(spriteComponent.mesh);

        // entity is pickable
        var pickableComponent = new $.PickableComponent();

        // configure pick action
        pickableComponent.addEventListener('onselect', this, this.__onselect);

        // compose entity
        this.addComponent(poseComponent);
        this.addComponent(spriteComponent);
        this.addComponent(meshComponent);
        this.addComponent(pickableComponent);
    };
    CircuitElement.prototype.__onselect = function () {
        this.__engine.toolController.equipPlacingTool(this);
    };
    
    return CircuitElement;
});