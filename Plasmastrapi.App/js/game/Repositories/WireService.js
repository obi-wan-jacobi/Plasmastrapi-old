define(function(Repository) {

    // CLASS WireRepository
    WireRepository.prototype = Object.create(Repository.prototype);
    WireRepository.prototype.constructor = WireRepository;
    function WireRepository() {
        Repository.call(this);
    };

});