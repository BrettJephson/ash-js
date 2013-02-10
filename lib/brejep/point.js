(function( root, factory ) {
    // We want the object to work with or without AMD
    if( typeof define === 'function' && define.amd ) {
        define('brejep/point', factory );
    } else {
        // If not using AMD, references to dependencies must be available on the root object
        if( typeof root.brejep === 'undefined') {
            root.brejep = {};
        }
        root.brejep.point = factory();
    }
} ( this, function() {
    "use strict";
    function Point( x, y ) {
        this.x = x || 0;
        this.y = y || 0;
    }
    Point.VERSION = "0.1.0";
    Point.prototype.x = null;
    Point.prototype.y = null;
    Point.prototype.distanceSquaredTo = function( targetPoint ) {
        var dx = this.x - targetPoint.x,
            dy = this.y - targetPoint.y;
        return dx * dx + dy * dy;
    };
    Point.prototype.distanceTo = function( targetPoint ) {
        var dx = this.x - targetPoint.x,
            dy = this.y - targetPoint.y;
        return Math.sqrt( dx * dx + dy * dy );
    };
    return Point;
}));