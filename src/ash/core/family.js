/**
 * Ash-js Family
 */
define(function () {
    'use strict';

    var Family = function () {};

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
});
