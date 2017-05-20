﻿require.paths = $.extend(require.paths, {
    // Assets
    'images': './game/Assets/images',
    'sprites': './game/Assets/sprites',
    // Circuits
    'base-element': './game/Circuits/Base/BaseElement',
    'circuit-element': './game/Circuits/Base/CircuitElement',
    'gate': './game/Circuits/Base/Gate',
    'terminal': './game/Circuits/Base/Terminal',
    'wire-element': './game/Circuits/Base/WireElement',
    'and-gate': './game/Circuits/Gates/AndGate',
    'nand-gate': './game/Circuits/Gates/NandGate',
    'or-gate': './game/Circuits/Gates/OrGate',
    'xor-gate': './game/Circuits/Gates/XorGate',
    'power-source': './game/Circuits/Power/PowerSource',
    'input-terminal': './game/Circuits/Terminals/InputTerminal',
    'output-terminal': './game/Circuits/Terminals/OutputTerminal',
    'terminal-handle': './game/Circuits/Terminals/TerminalHandle',
    'terminal-wire-anchor': './game/Circuits/Terminals/TerminalWireAnchor',
    'terminal-wire': './game/Circuits/Wires/TerminalWire',
    'tool-wire': './game/Circuits/Wires/ToolWire',
    'wire': './game/Circuits/Wires/Wire',
    // Containers
    'circuit-element-container': './game/Containers/CircuitElementContainer',
    'wire-container': './game/Containers/WireContainer',
    // Controllers
    'scene-controller': './game/Controllers/SceneController',
    'tool-controller': './game/Controllers/ToolController',
    // Scenes
    'circuit-design-scene': './game/Scenes/CircuitDesignScene',
    'main-menu-scene': './game/Scenes/MainMenuScene',
    'no-scene': './game/Scenes/NoScene',
    // Tools
    'compatible': './game/Tools/Base/Compatible',
    'cursor': './game/Tools/Base/Cursor',
    'tool': './game/Tools/Base/Tool',
    'cuttable': './game/Tools/Compatibility/Cuttable',
    'design-zone': './game/Tools/Compatibility/DesignZone',
    'destruction-zone': './game/Tools/Compatibility/DestructionZone',
    'draggable': './game/Tools/Compatibility/Draggable',
    'filter': './game/Tools/Compatibility/Filter',
    'pickable': './game/Tools/Compatibility/Pickable',
    'placeable': './game/Tools/Compatibility/Placeable',
    'trashable': './game/Tools/Compatibility/Trashable',
    'wireable-as-input': './game/Tools/Compatibility/WireableAsInput',
    'wireable-as-output': './game/Tools/Compatibility/WireableAsOutput',
    'cutting-tool-cursor': './game/Tools/Cursors/CuttingToolCursor',
    'trash-tool-cursor': './game/Tools/Cursors/TrashToolCursor',
    'selection-box': './game/Tools/Helpers/SelectionBox',
    'cutting-tool': './game/Tools/CuttingTool',
    'no-tool': './game/Tools/NoTool',
    'picking-tool': './game/Tools/PickingTool',
    'placing-tool': './game/Tools/PlacingTool',
    'trash-tool': './game/Tools/TrashTool',
    'wire-tool': './game/Tools/WireTool',
    // UI
    'button': './game/UI/Base/Button',
    'image-panel': './game/UI/Base/ImagePanel',
    'panel': './game/UI/Base/Panel',
    'text-label': './game/UI/Base/TextLabel',
    'ui-element': './game/UI/Base/UIElement',
    'menu-button': './game/UI/Buttons/MenuButton',
    'spawner-button': './game/UI/Buttons/SpawnerButton',
    'tool-button': './game/UI/Buttons/ToolButton',
    'curve': './game/UI/Lines/Curve',
    'circuit-design-blueprint-panel': './game/UI/Panels/CircuitDesignBlueprintPanel',
    'circuit-design-toolbar': './game/UI/Panels/CircuitDesignToolbar',
    'main-menu-background-panel': './game/UI/Panels/MainMenuBackgroundPanel',
    'main-menu-navigation-panel': './game/UI/Panels/MainMenuNavigationPanel',
    'rectangle': './game/UI/Shapes/Rectangle',
    // UI -- Decorators
    'labelled-decorator': './game/UI/Decorators/LabelledDecorator',
    // Configs
    'game-debug': './game/debug',
    'game-config': './game/config',
    // Base
    'game': './game/Game'
});