﻿define([
    'graphics',
    // Circuits
    'terminal',
    'and-gate',
    'nand-gate',
    'or-gate',
    'xor-gate',
    'power-source',
    // Cursors
    'cutting-tool-cursor',
    'trash-tool-cursor',
],
function (Graphics, Terminal, AndGate, NandGate, OrGate, XorGate, PowerSource, CuttingToolCursor, TrashToolCursor) {

    return new Graphics.SpriteMap(
        // tools
        new Graphics.SpriteSourcePair(CuttingToolCursor.prototype, ['img/Cutter_closed.png', 'img/Cutter_open.png']),
        new Graphics.SpriteSourcePair(TrashToolCursor.prototype, ['img/Trashcan.png']),
        // circuit elements
        new Graphics.SpriteSourcePair(Terminal.prototype, ['img/Terminal_out.png', 'img/Terminal_in.png', 'img/Terminal_hovered.png']),
        new Graphics.SpriteSourcePair(AndGate.prototype, ['img/AndGate.png']),
        new Graphics.SpriteSourcePair(NandGate.prototype, ['img/NandGate.png']),
        new Graphics.SpriteSourcePair(OrGate.prototype, ['img/OrGate.png']),
        new Graphics.SpriteSourcePair(XorGate.prototype, ['img/XorGate.png']),
        new Graphics.SpriteSourcePair(PowerSource.prototype, ['img/PowerSource.png'])
        // new Graphics.SpriteSourcePair(PushSwitch.prototype, ['img/PushSwitch_open.png', 'img/PushSwitch_closed.png']),
        // new Graphics.SpriteSourcePair(HoverSwitch.prototype, ['img/HoverSwitch.png']),
        // new Graphics.SpriteSourcePair(LightBulb.prototype, ['img/LightBulb_open.png', 'img/LightBulb_closed.png']),
        // new Graphics.SpriteSourcePair(LightScreen.prototype, ['img/LightScreen_open.png', 'img/LightScreen_closed.png'])
    );
});