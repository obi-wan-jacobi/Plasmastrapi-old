﻿define(['system', 'pick-component'],
function (System, PickComponent) {

    // CLASS InputSystem
    PickSystem.prototype = Object.create(System.prototype);
    PickSystem.prototype.constructor = PickSystem;
    function PickSystem() {
        System.call(this);
        this.__list_mouseenter = [];
        this.__list_mousehover = [];
        this.__list_mouseleave = [];
        this.__list_mousemove = [];
        this.__list_mouseup = [];
        this.__list_mousedown = [];
        this.__list_click = [];
        this.__registerEvents(
            'onmouseenter',
		    'onmousehover',
		    'onmouseleave',
            'onmousemove',
		    'onmousedown',
		    'onmouseup',
		    'onclick'
        );
    };
    PickSystem.prototype.__onload = function () {
        this.__engine.entityContainer.addEventListener('onadd', this, this.__watch);
        this.__engine.entityContainer.addEventListener('onremove', this, this.__unwatch);
    };
    PickSystem.prototype.__onunload = function () {
        this.__engine.entityContainer.removeEventListener('onadd', this, this.__watch);
        this.__engine.entityContainer.removeEventListener('onremove', this, this.__unwatch);
        this.__list_mouseenter = [];
        this.__list_mousehover = [];
        this.__list_mouseleave = [];
        this.__list_mousemove = [];
        this.__list_mouseup = [];
        this.__list_mousedown = [];
        this.__list_click = [];
    };
    PickSystem.prototype.__onframe = function () {
        if (this.__list_mouseenter.length > 0) this.__fire('onmouseenter', this.__list_mouseenter);
        if (this.__list_mousehover.length > 0) this.__fire('onmousehover', this.__list_mousehover);
        if (this.__list_mouseleave.length > 0) this.__fire('onmouseleave', this.__list_mouseleave);
        if (this.__list_mousemove.length > 0) this.__fire('onmousemove', this.__list_mousemove);
        if (this.__list_mousedown.length > 0) this.__fire('onmousedown', this.__list_mousedown);
        if (this.__list_mouseup.length > 0) this.__fire('onmouseup', this.__list_mouseup);
        if (this.__list_click.length > 0) this.__fire('onclick', this.__list_click);
        this.__list_mouseenter = [];
        this.__list_mousehover = [];
        this.__list_mouseleave = [];
        this.__list_mousemove = [];
        this.__list_mouseup = [];
        this.__list_mousedown = [];
        this.__list_click = [];
    };
    PickSystem.prototype.__domouseenter = function (entity) {
        this.__list_mouseenter.push(entity);
    };
    PickSystem.prototype.__domousehover = function (entity) {
        this.__list_mousehover.push(entity);
    };
    PickSystem.prototype.__domouseleave = function (entity) {
        this.__list_mouseleave.push(entity);
    };
    PickSystem.prototype.__domousemove = function (entity) {
        this.__list_mousemove.push(entity);
    };
    PickSystem.prototype.__domousedown = function (entity) {
        this.__list_mousedown.push(entity);
    };
    PickSystem.prototype.__domouseup = function (entity) {
        this.__list_mouseup.push(entity);
    };
    PickSystem.prototype.__doclick = function (entity) {
        this.__list_click.push(entity);
    };
    PickSystem.prototype.__watch = function (entity) {
        var pickComponent = entity.getComponent(PickComponent);
        if (pickComponent) {
            pickComponent.addEventListener('onmouseenter', this, this.__domouseenter);
            pickComponent.addEventListener('onmousehover', this, this.__domousehover);
            pickComponent.addEventListener('onmouseleave', this, this.__domouseleave);
            pickComponent.addEventListener('onmousemove', this, this.__domousemove);
            pickComponent.addEventListener('onmousedown', this, this.__domousedown);
            pickComponent.addEventListener('onmouseup', this, this.__domouseup);
            pickComponent.addEventListener('onclick', this, this.__doclick);
        }
    };
    PickSystem.prototype.__unwatch = function (entity) {
        var pickComponent = entity.getComponent(PickComponent);
        if (pickComponent) {
            pickComponent.removeEventListener('onmouseenter', this, this.__domouseenter);
            pickComponent.removeEventListener('onmousehover', this, this.__domousehover);
            pickComponent.removeEventListener('onmouseleave', this, this.__domouseleave);
            pickComponent.removeEventListener('onmousemove', this, this.__domousemove);
            pickComponent.removeEventListener('onmousedown', this, this.__domousedown);
            pickComponent.removeEventListener('onmouseup', this, this.__domouseup);
            pickComponent.removeEventListener('onclick', this, this.__doclick);
        }
    };

    return PickSystem;
});