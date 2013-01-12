/**
 * Ash-js Family
 */
(function( root, factory ) {
    // We want the object to work with or without AMD
    if( typeof define === 'function' && define.amd ) {
        define('ash/family', [], factory );
    } else {
        // If not using AMD, references to dependencies must be available on the root object
        if( typeof root.ash === 'undefined') {
            root.ash = {};
        }
        root.ash.family = factory();
    }
} ( this, function() {
    "use strict";
	function Family() {}
	Family.prototype.nodes = null;
	Family.prototype.__defineGetter__("nodeList", function() {
			return this.nodes;
	});
	Family.prototype.initialise = function( nodeObject, engine ) {
		throw new Error( 'should be overriden' );
	};
	Family.prototype.newEntity = function( entity ) {
		throw new Error( 'should be overriden' );
	};
	Family.prototype.removeEntity = function( entity ) {
		throw new Error( 'should be overriden' );
	};
	Family.prototype.componentAddedToEntity = function( entity, componentClass ) {
		throw new Error( 'should be overriden' );
	};
	Family.prototype.componentRemovedFromEntity = function( entity, componentClass ) {
		throw new Error( 'should be overriden' );
	};
	Family.prototype.cleanUp = function() {
		throw new Error( 'should be overriden' );	
	};
    return Family;
}));