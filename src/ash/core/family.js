/**
 * Ash-js Family
 */
define([
    'brejep/class'
], function (Class) {
    'use strict';

    var Family = Class.extend({
        nodes: null,
        
        constructor: function (nodeObject, engine) {
            this.__defineGetter__("nodeList", function() {
                return this.nodes;
            });
        },

        newEntity: function (entity) {
            throw new Error( 'should be overriden' );
        },

        removeEntity: function (entity) {
            throw new Error( 'should be overriden' );
        },

        componentAddedToEntity: function (entity, componentClass) {
            throw new Error( 'should be overriden' );
        },

        componentRemovedFromEntity: function (entity, componentClass) {
            throw new Error( 'should be overriden' );
        },

        cleanUp: function () {
            throw new Error( 'should be overriden' );
        }
    });

    return Family;
});
