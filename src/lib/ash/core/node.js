/**
 * Ash-js Node
 */
(function( root, factory ) {
    // We want the object to work with or without AMD
    if( typeof define === 'function' && define.amd ) {
        define('ash/node', factory );
    } else {
        // If not using AMD, references to dependencies must be available on the root object
        if( typeof root.ash === 'undefined') {
            root.ash = {};
        }
        root.ash.node = factory();
    }
} ( this, function() {
    "use strict";
    return {
        entity : null, //Entity
        previous : null, //Node
        next : null //Node
    };
}));