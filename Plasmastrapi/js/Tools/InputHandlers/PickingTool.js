﻿define(['input-handle', 'selection-box', 'pick-component', 'position', 'rectangle', 'design-zone', 'draggable', 'filter', 'pickable', 'placeable', 'game-config'],
function (InputHandler, SelectionBox, PickComponent, Position, Rectangle, DesignZone, Draggable, Filter, Pickable, Placeable, config) {

    PickingTool.prototype = Object.create(InputHandler.prototype);
    PickingTool.prototype.constructor = PickingTool;
    function PickingTool() {
        InputHandler.call(this);
        // drag bounds before pick on drag
        this.__pickableOnDrag = null;
        this.__beforeDragBounds = null;
        // selection bounds before selection box on drag
        this.__selectionBox = null;
        this.__pickableSelectionBox = null;
        this.__beforeSelectionBounds = null;
        this.__selectionAnchor = null;
    };
    PickingTool.prototype.onload = function () {
        this.__pickableOnDrag = null;
        // hack
        this.__isMouseDown = false;
        this.setFilter(DesignZone, Pickable);
    };
    PickingTool.prototype.onmousemove = function (cursor) {
        if (this.__pickableOnDrag) {
            if (!(
                cursor.x > this.__beforeDragBounds.vertices[1].x &&
                cursor.y > this.__beforeDragBounds.vertices[1].y &&
                cursor.x < this.__beforeDragBounds.vertices[3].x &&
                cursor.y < this.__beforeDragBounds.vertices[3].y
            )) {
                this.__pickableOnDrag.pick();
            }
        } else if (!this.__selectionBox && this.isMouseDown) {
            if (!(
                cursor.x > this.__beforeSelectionBounds.vertices[1].x &&
                cursor.y > this.__beforeSelectionBounds.vertices[1].y &&
                cursor.x < this.__beforeSelectionBounds.vertices[3].x &&
                cursor.y < this.__beforeSelectionBounds.vertices[3].y
            )) {
                this.setFilter(
                    new Filter(DesignZone, Placeable)
                );
                this.__selectionBox = new SelectionBox();
                this.__selectionBox.startAt(this.__selectionAnchor);
                this.__engine.sceneController.addToCurrentScene(this.__selectionBox);
            }
        } else if (this.__selectionBox) {
            this.__selectionBox.stretchTo(cursor);
        }
    };
    PickingTool.prototype.onmousedown = function (cursor) {
        InputHandler.prototype.onmousedown.call(this, cursor);
        this.__beforeDragBounds = new Rectangle(
            config.PickingTool.beforeDragBounds.width,
            config.PickingTool.beforeDragBounds.height
        );
        for (var i = 0, L = this.__beforeDragBounds.vertices.length; i < L; i++) {
            this.__beforeDragBounds.vertices[i].x += cursor.x;
            this.__beforeDragBounds.vertices[i].y += cursor.y;
        }
        this.__beforeSelectionBounds = new Rectangle(
            config.PickingTool.beforeSelectionBounds.width,
            config.PickingTool.beforeSelectionBounds.height
        );
        this.__selectionAnchor = new Position(cursor.x, cursor.y);
        for (var i = 0, L = this.__beforeSelectionBounds.vertices.length; i < L; i++) {
            this.__beforeSelectionBounds.vertices[i].x += cursor.x;
            this.__beforeSelectionBounds.vertices[i].y += cursor.y;
        }
    };
    PickingTool.prototype.onmousedown = function (entities) {
        var entity = null;
        for (var i = 0, L = entities.length; i < L; i++) {
            if (Draggable.resolve(entities[i])) {
                this.__pickableOnDrag = entities[i].getComponent(PickComponent);
                entity = entities[i];
                break;
            }
        }
        if (this.__pickableSelectionBox && this.__pickableSelectionBox !== entity) {
            this.__pickableSelectionBox.destroy();
            this.__pickableSelectionBox = null;
        }
    };
    PickingTool.prototype.onmouseup = function (entities) {
        if (this.__selectionBox) {
            this.__selectionBox.fillContents();
            if (this.__selectionBox.contents.length == 0) {
                this.__selectionBox.destroy();
            } else {
                this.__pickableSelectionBox = this.__selectionBox;
            }
            this.__selectionBox = null;
            this.setFilter(
                new Filter(DesignZone, Pickable)
            );
            return;
        }
        for (var i = 0, L = entities.length; i < L; i++) {
            var entity = entities[i];
            if (Pickable.resolve(entity) && !(entity === this.__selectionBox)) {
                var pickComponent = entity.getComponent(PickComponent);
                pickComponent.pick();
                return;
            }
        }
        return;
    };

    return PickingTool;
});