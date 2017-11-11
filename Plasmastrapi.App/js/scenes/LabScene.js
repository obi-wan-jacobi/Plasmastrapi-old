﻿define(['scene', 'panel', 'button', 'position', 'rectangle', 'text'],
function (Scene, Panel, Button, Position, Rectangle, Text) {

    LabScene.prototype = Object.create(Scene.prototype);
    LabScene.prototype.constructor = LabScene;
    function LabScene(engine) {
        Scene.call(this, engine);
    };
    LabScene.prototype.__oninit = function () {
        var engine = this.__engine;
        var uiElementFactory = engine.getFactory('ui-element-factory');
        var logicElementFactory = engine.getFactory('logic-element-factory');
        var labController = engine.getController('lab-controller');

        var stage = uiElementFactory.create(Panel);
        stage.set(new Position(1200, 350));
        stage.set(new Rectangle(600, 700));

        var stageHeader = uiElementFactory.create(Panel);
        stageHeader.set(new Position(1200, 30));
        stageHeader.set(new Rectangle(600, 60));

        var stageArea = uiElementFactory.create(Panel);
        stageArea.set(new Position(1200, 355));
        stageArea.set(new Rectangle(592, 582));

        var stageFooter = uiElementFactory.create(Panel);
        stageFooter.set(new Position(1200, 675));
        stageFooter.set(new Rectangle(600, 50));

        var stepback = uiElementFactory.create(Button);
        stepback.set(new Position(925, 675));
        stepback.set(new Rectangle(30, 30));

        var playpause = uiElementFactory.create(Button);
        playpause.set(new Position(965, 675));
        playpause.set(new Rectangle(30, 30));

        var stepforward = uiElementFactory.create(Button);
        stepforward.set(new Position(1005, 675));
        stepforward.set(new Rectangle(30, 30));

        var toolbar = uiElementFactory.create(Panel);
        toolbar.set(new Position(450, 30));
        toolbar.set(new Rectangle(900, 60));

        var andGateButton = uiElementFactory.create(Button, 'and-gate');
        andGateButton.set(new Position(30, 25));
        andGateButton.set(new Rectangle(30, 30));
        andGateButton.set(new Text('[1]'));
        andGateButton.getComponent('text-component').getDisplaySettings().offset.y = 28;
        andGateButton.getComponent('text-component').getDisplaySettings().fontSize = 12;
        andGateButton.set(function () {
            labController.spawn('and-gate');
        });

        var nandGateButton = uiElementFactory.create(Button, 'nand-gate');
        nandGateButton.set(new Position(75, 25));
        nandGateButton.set(new Rectangle(30, 30));
        nandGateButton.set(new Text('[2]'));
        nandGateButton.getComponent('text-component').getDisplaySettings().offset.y = 28;
        nandGateButton.getComponent('text-component').getDisplaySettings().fontSize = 12;
        nandGateButton.set(function () {
            labController.spawn('nand-gate');
        });

        var orGateButton = uiElementFactory.create(Button, 'or-gate');
        orGateButton.set(new Position(120, 25));
        orGateButton.set(new Rectangle(30, 30));
        orGateButton.set(new Text('[3]'));
        orGateButton.getComponent('text-component').getDisplaySettings().offset.y = 28;
        orGateButton.getComponent('text-component').getDisplaySettings().fontSize = 12;
        orGateButton.set(function () {
            labController.spawn('or-gate');
        });

        var xorGateButton = uiElementFactory.create(Button, 'xor-gate');
        xorGateButton.set(new Position(165, 25));
        xorGateButton.set(new Rectangle(30, 30));
        xorGateButton.set(new Text('[4]'));
        xorGateButton.getComponent('text-component').getDisplaySettings().offset.y = 28;
        xorGateButton.getComponent('text-component').getDisplaySettings().fontSize = 12;
        xorGateButton.set(function () {
            labController.spawn('xor-gate');
        });

        var backNavigationButton = uiElementFactory.create(Button);
        backNavigationButton.set(new Position(846, 30));
        backNavigationButton.set(new Rectangle(100, 52));
        backNavigationButton.set(new Text('Menu'));
        backNavigationButton.getComponent('text-component').getDisplaySettings().offset.y = 7;
        backNavigationButton.set(function () {
            engine.getController('scene-controller').setScene('main-menu-scene');
        });

        var designArea = uiElementFactory.create(Panel);
        designArea.set(new Position(450, 380));
        designArea.set(new Rectangle(900, 640));

        labController.setDesignArea(designArea);
    };

    return LabScene;
});