/**
 * Ash-js Node
 */
define([
    'brejep/class'
], function (Class) {
    'use strict';

    var Node = Class.extend({
        entity: null,
        previous: null,
        next: null,
	
        constructor: function () { }
    });

    /**
    * A simpler way to create a node.
    *
    * Example: creating a node for component classes Point &amp; energy:
    *
    * var PlayerNode = Ash.Node.create({
    *   point: Point,
    *   energy: Energy
    * });
    *
    * This is the simpler version from:
    *
    * var PlayerNode = Ash.Node.extend({
    *   point: null,
    *   energy: null,
    *
    *   types: {
    *     point: Point,
    *     energy: Energy
    *   }
    * });
    */
    Node.create = function (schema) {
        var processedSchema = {
            types: {},
            constructor: function () { }
        };

        // process schema
        for (var propertyName in schema) {
            if (schema.hasOwnProperty(propertyName)) {
                var propertyType = schema[propertyName];
                if (propertyType) {
                    processedSchema.types[propertyName] = propertyType;
                }
                processedSchema[propertyName] = null;
            }
        }

        return Node.extend(processedSchema);
    };

    return Node;
});
