﻿define([
    // Base
    'image-panel',
    // Data
    'image-handle',
    // Configs
    'design-zone',
    'game-config'
],
function (ImagePanel, ImageHandle, DesignZone, config) {

    // CLASS CircuitDesignBlueprintPanel
    CircuitDesignBlueprintPanel.prototype = Object.create(ImagePanel.prototype);
    CircuitDesignBlueprintPanel.prototype.constructor = CircuitDesignBlueprintPanel;
    function CircuitDesignBlueprintPanel(x, y, width, height) {
        var imageHandle = new ImageHandle(
            config.CircuitDesignBlueprintPanel.displayLayer,
            x,
            y,
            this.image.width,
            this.image.height,
            width,
            height,
            this.image
        );
        // inherits from
        ImagePanel.call(this, x, y, imageHandle);
        // apply tool compatibilities
        DesignZone.call(this);
    };
    
    return CircuitDesignBlueprintPanel;
});