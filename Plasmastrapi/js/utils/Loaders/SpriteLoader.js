﻿define(['loader', 'assets'],
function (Loader, assets) {

    // CLASS SpriteLoader
    SpriteLoader.prototype = Object.create(Loader.prototype);
    SpriteLoader.prototype.constructor = SpriteLoader;
    function SpriteLoader() {
        Loader.call(this);
    };
    SpriteLoader.prototype.download = function (sprites) {
        this.__beginDownload(sprites);
        for (var sprite in sprites) {
            if (sprites.hasOwnProperty(sprite)) {
                var frames = [];
                for (var url in sprites[sprite]) {
                    var frame = new Image();
                    frame.onload = this.__itemFinishedLoading.bind(this);
                    frame.onerror = this.__itemFinishedLoadingWithError;
                    frame.src = sprites[sprite][url];
                    frames.push(frame);
                }
                assets.sprites[sprite] = frames;
            }
        }
        return this;
    };

    return SpriteLoader;
});
