/**
 * Ash-js System
 */
define(function () {
    'use strict';

    var System = function () {};

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
});
