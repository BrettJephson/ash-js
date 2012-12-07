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
    return {
        previous : null, /* System */
        next : null, /* System */
        priority : 0,
        addToGame : function( game ) {

        },
        removeFromGame : function( game ) {

        },
        update : function( time ) {

        },
        is : function( type ) {
            return this._type === type;
        }
    };
}));