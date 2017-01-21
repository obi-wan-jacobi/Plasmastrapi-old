﻿define(["../Objects/Scene", "../UI/Areas/CircuitDesignArea"], function (Scene, CircuitDesignArea) {

    LabScene.prototype = Object.create(Scene.prototype);
    LabScene.prototype.constructor = LabScene;
    function LabScene() {
        Scene.call(this);
    };
    LabScene.prototype.__oninit = function () {
        this.add(new CircuitDesignArea(
            this.__engine.canvas.clientWidth / 2,
            this.__engine.canvas.clientHeight / 2,
            this.__engine.canvas.clientWidth,
            this.__engine.canvas.clientHeight
        ));
        //var andGateButton = new Lab.SpawnerButton(50, 40, Lab.AndGate)
    };

    return LabScene;
});