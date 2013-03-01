/**
 * Utils function for object creation & extension
 */
define(function() {
    'use strict';

    var ObjectUtils = {
        VERSION : '0.1.0'
    };

    /**
     * Object creation
     */
    ObjectUtils.createObject = function (obj) {
        function F() {};
        F.prototype = obj;
        return new F();
    };

    /**
     * Extend the destination object with source object
     */
    ObjectUtils.extendObject = function (destination, source) {
        for (var property in source) {
            if(!destination.hasOwnProperty(property) && source.hasOwnProperty(property) ) {
                destination[property] = source[property];
            }
        }
        return destination;
    };

    /**
     * Deep-extend the destination object with source object
     */
    ObjectUtils.deepExtend = function(destination, source) {
        for (var property in source) {
            if (source[property] && source[property].constructor &&
                source[property].constructor === Object) {
                destination[property] = destination[property] || {};
                arguments.callee(destination[property], source[property]);
            } else {
                destination[property] = source[property];
            }
        }
        return destination;
    };

    return ObjectUtils;
});
