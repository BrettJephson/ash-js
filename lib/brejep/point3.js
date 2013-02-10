/**
 * 3D point
 * @author Brett Jephson
 */
(function( root, factory ) {
    // We want the object to work with or without AMD
    if( typeof define === 'function' && define.amd ) {
        define('brejep/point3', factory );
    } else {
        // If not using AMD, references to dependencies must be available on the root object
        if( typeof root.brejep === 'undefined') {
            root.brejep = {};
        }
        root.brejep.point3 = factory();
    }
} ( this, function() {
    "use strict";
    function Point3( x, y, z ) {
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
    }
    Point3.VERSION = "0.1.0";
    Point3.prototype.x = null;
    Point3.prototype.y = null;
    Point3.prototype.z = null;
    return Point3;
}));