﻿define(function () {

    var oop = {};

    oop.extend = function (target, source) {
        var SourcePrototype = Object.getPrototypeOf(source);
        for (var propertyName in SourcePrototype) {
            if (SourcePrototype.hasOwnProperty(propertyName) && propertyName !== 'constructor') {
                target[propertyName] = SourcePrototype[propertyName];
            }
        }
        for (var propertyName in source) {
            if (source.hasOwnProperty(propertyName) && propertyName !== 'constructor') {
                target[propertyName] = source[propertyName];
            }
        }
    };

    return oop;
});