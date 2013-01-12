/**
 * Ash-js Node Pool
 */
(function( root, factory ) {
    // We want the object to work with or without AMD
    if( typeof define === 'function' && define.amd ) {
        define('ash/nodepool', factory );
    } else {
        // If not using AMD, references to dependencies must be available on the root object
        if( typeof root.ash === 'undefined') {
            root.ash = {};
        }
        root.ash.nodepool = factory();
    }
} ( this, function() {
    "use strict";
	function NodePool( nodeClass ) {
		this.initialise( nodeClass );
	}
	var api = NodePool.prototype;
	api.tail = null;
	api.cacheTail = null;
	api.nodeClass = null;
	api.initialise = function( nodeClass ) {
		this.nodeClass = nodeClass;
		return this;
	};
	api.get = function() {
		if( this.tail ) {
			var node = this.tail;
			this.tail = this.tail.previous;
			node.previous = null;
			return node;
		} else {
			return new this.nodeClass();
		}
	};
	api.dispose = function( node ) {
		node.next = null;
		node.previous = this.tail;
		this.tail = node;
	};
	api.cache = function( node ) {
		node.previous = this.cacheTail;
		this.cacheTail = node;
	};
	api.releaseCache = function() {
		while( this.cacheTail ) {
			var node = this.cacheTail;
			this.cacheTail = node.previous;
			node.next = null;
			node.previous = this.tail;
			this.tail = node;
		}
	};
    return NodePool;
}));