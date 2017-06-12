define(['event-emitter', 'linked-list'],
function (EventEmitter, LinkedList) {

    // CLASS Container
    Container.prototype = Object.create(EventEmitter.prototype);
    Container.prototype.constructor = Container;
    function Container(/* optional */ memberClass) {
        EventEmitter.call(this);
        this.__members = new LinkedList(memberClass);
        // events
        this.__registerEvents(
            'onadd',
            'onremove'
        );
    };
    // public methods
    Container.prototype.forEach = function(fn, caller) {
        return this.__members.forEach(fn, caller);
    };
    Container.prototype.add = function(member) {
        this.__members.push(member);
        this.__fire('onadd', member);
    };
    Container.prototype.remove = function(member) {
        this.__members.splice(member);
        this.__fire('onremove', member);
    };

    return Container;
});