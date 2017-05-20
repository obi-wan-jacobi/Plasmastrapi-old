﻿define([
    // Base
    'entity',
    // Components
    'mesh-component',
    'pickable-component',
    'pose-component',
    'sprite-component',
    // Data
    'geometry',
    'graphics',
    // Configs
    'draggable',
    'pickable',
    'game-config'
],
function (Entity, MeshComponent, PickableComponent, PoseComponent, SpriteComponent, Geometry, Graphics, Draggable, Pickable, config) {

    SelectionBox.prototype = Object.create(Entity.prototype);
    SelectionBox.prototype.constructor = SelectionBox;
    function SelectionBox() {
        Entity.call(this);

        this.__contents = [];

        this.__startPosition = new Geometry.Position(0, 0)
        this.__endPosition = new Geometry.Position(0, 0);

        var poseComponent = new PoseComponent(new Geometry.Position(0, 0), 0);
        poseComponent.addEventListener('onpositionchange', this, this.__onpositionchange);

        var meshDisplayOptions = new Graphics.MeshDisplayOptions(config.SelectionBox.displayLayer);
        var rectangle = new Geometry.Rectangle(
            Math.abs(this.__startPosition.x - this.__endPosition.x),
            Math.abs(this.__startPosition.y - this.__endPosition.y)
        );
        var mesh = new Geometry.Mesh(rectangle);
        var meshComponent = new MeshComponent(mesh, meshDisplayOptions);

        var pickableComponent = new PickableComponent();
        pickableComponent.addEventListener('onpick', this, this.__onpick);

        this.addComponent(poseComponent);
        this.addComponent(meshComponent);
        this.addComponent(pickableComponent);

        Pickable.call(this);
        Draggable.call(this);
    };
    SelectionBox.prototype.__onpick = function () {
        this.__engine.toolController.equipPlacingTool(this);
    };
    SelectionBox.prototype.__onpositionchange = function (newPosition, oldPosition) {
        for (var i = 0, L = this.__contents.length; i < L; i++) {
            var poseComponent = this.__contents[i].getComponent(PoseComponent);
            poseComponent.position = new Geometry.Position(
                poseComponent.position.x + newPosition.x - oldPosition.x,
                poseComponent.position.y + newPosition.y - oldPosition.y
            )
        }
    };
    Object.defineProperties(SelectionBox.prototype, {
        'contents': {
            get: function () {
                return this.__contents;
            }
        }
    });
    SelectionBox.prototype.startAt = function (startPosition) {
        this.__startPosition = startPosition;
    };
    SelectionBox.prototype.stretchTo = function(endPosition) {
        this.__endPosition = endPosition;

        var poseComponent = this.getComponent(PoseComponent);
        poseComponent.position = new Geometry.Position(
            (this.__startPosition.x + this.__endPosition.x) / 2,
            (this.__startPosition.y + this.__endPosition.y) / 2
        );

        var rectangle = new Geometry.Rectangle(
            Math.abs(this.__startPosition.x - this.__endPosition.x),
            Math.abs(this.__startPosition.y - this.__endPosition.y)
        );
        var mesh = new Geometry.Mesh(rectangle);
        var meshComponent = this.getComponent(MeshComponent);
        meshComponent.mesh = mesh;
    };
    SelectionBox.prototype.fillContents = function () {
        var meshComponent = this.getComponent(MeshComponent);
        this.__engine.circuitElementContainer.forEach(function (element) {
            var poseComponent = element.getComponent(PoseComponent);
            if (meshComponent.checkPointCollision(poseComponent.position)) {
                this.__contents.push(element);
            }
        }, this);
    };
    SelectionBox.prototype.destroyContents = function () {
        for (var i = 0, L = this.__contents.length; i < L; i++) {
            this.__contents[i].destroy();
        }
    };

    return SelectionBox;
});