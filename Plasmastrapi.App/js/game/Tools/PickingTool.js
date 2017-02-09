﻿define(["./Base/Tool", "../../engine/Namespaces/$Components", "../Namespaces/$PickableTraits"], function (Tool, $, $PickableTraits) {

    PickingTool.prototype = Object.create(Tool.prototype);
    PickingTool.prototype.constructor = PickingTool;
    function PickingTool() {
        Tool.call(this);
    };
    PickingTool.prototype.__onequip = function () {
        this.setPickableTraitListFilter(new $PickableTraits.PickableTraitList($PickableTraits.Default));
    };
    PickingTool.prototype.__pick_onmousedown = function (entities) {
        entities[0].getComponent($.PickableComponent).pick();
    };

    return PickingTool;
});