/**
 * Ash-js Node Pool
 */
define([
    'brejep/class'
], function (Class) {
    'use strict';

    var NodePool = Class.extend({
        tail: null,
        cacheTail: null,
        nodeClass: null,

        constructor: function (nodeClass) {
            this.nodeClass = nodeClass;
        },

        get: function() {
            if( this.tail ) {
                var node = this.tail;
                this.tail = this.tail.previous;
                node.previous = null;
                return node;
            } else {
                return new this.nodeClass();
            }
        },

        dispose: function( node ) {
            node.next = null;
            node.previous = this.tail;
            this.tail = node;
        },

        cache: function( node ) {
            node.previous = this.cacheTail;
            this.cacheTail = node;
        },

        releaseCache: function() {
            while( this.cacheTail ) {
                var node = this.cacheTail;
                this.cacheTail = node.previous;
                node.next = null;
                node.previous = this.tail;
                this.tail = node;
            }
        }
    });

    return NodePool;
});
