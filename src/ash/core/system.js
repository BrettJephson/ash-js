/**
 * Ash-js System
 */
(function( root, factory ) {
    // We want the object to work with or without AMD
    if( typeof define === 'function' && define.amd ) {
        define('ash/system', factory );
    } else {
        // If not using AMD, references to dependencies must be available on the root object
        if( typeof root.ash === 'undefined') {
            root.ash = {};
        }
        root.ash.system = factory();
    }
} ( this, function() {
    "use strict";
    function System() {}
    System.prototype.previous = null; /* System */
    System.prototype.next = null; /* System */
    System.prototype.priority = 0;
    System.prototype.initialise = function() {
        return this;
    };
    System.prototype.addToEngine = function( engine ) {
        /* Left deliberately blank */
    };
    System.prototype.removeFromEngine = function( engine ) {
        /* Left deliberately blank */
    };
    System.prototype.update = function( time ) {
        /* Left deliberately blank */
    };
    System.prototype.is = function( type ) {
        return type.prototype.isPrototypeOf( this );
    };
    return System;
}));