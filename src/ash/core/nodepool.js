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
		components : null,
		
        constructor: function (nodeClass, components) {
            this.nodeClass = nodeClass;
			this.components = components;
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
			this.components.forEach(function(componentClass, componentName) {
				node[componentName] = null;
			});
			node.entity = null;
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
                this.dispose( node );
            }
        }
    });

    return NodePool;
});
