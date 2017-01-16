define(function() {
    
    var $ = {};

    $.Velocity = function(linearTerm, angularTerm) {
		this.linearTerm = linearTerm;
		this.angularTerm = angularTerm;
	};

	$.Acceleration = function(linearTerm, angularTerm) {
		this.linearTerm = linearTerm;
		this.angularTerm = angularTerm;
	};

	$.LineCollisionOptions = function(lineWidth, lengthModifier) {
		this.lineWidth = lineWidth || 20;
		this.lengthModifier = lengthModifier || 1;
	};

    return $;

});