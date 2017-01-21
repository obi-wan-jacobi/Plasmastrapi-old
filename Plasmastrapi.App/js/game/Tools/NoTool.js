﻿define(["../Objects/Tool"], function (Tool) {

    NoTool.prototype = Object.create(Tool.prototype);
    NoTool.prototype.constructor = NoTool;
    function NoTool() {
        Tool.call(this, [/* works with */]);
    };

    return NoTool;
});