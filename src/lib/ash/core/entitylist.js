/**
 * Ash-js EntityList
 */
(function( root, factory ) {
    // We want the object to work with or without AMD
    if( typeof define === 'function' && define.amd ) {
        define('ash/entitylist', factory );
    } else {
        // If not using AMD, references to dependencies must be available on the root object
        if( typeof root.ash === 'undefined') {
            root.ash = {};
        }
        root.ash.entitylist = factory();
    }
} ( this, function() {
    "use strict";
	function EntityList() {
		
	}
	var api = EntityList.prototype;
	api.head = null; /* Entity */
    api.tail = null; /* Entity */
	api.add = function( entity ) {
		if( !this.head ) {
			this.head = this.tail = entity;
		} else {
			this.tail.next = entity;
			entity.previous = this.tail;
			this.tail = entity;
		}
	};
    api.remove = function( entity ) {
		if ( this.head == entity ) {
			this.head = this.head.next;
		}
		if ( this.tail == entity ) {
			this.tail = this.tail.previous;
		}
		if ( entity.previous ) {
			entity.previous.next = entity.next;
		}
		if ( entity.next ) {
			entity.next.previous = entity.previous;
		}
	};
    api.removeAll = function() {
		while( this.head ) {
			var entity = this.head;
			this.head = this.head.next;
			entity.previous = null;
			entity.next = null;
		}
		this.tail = null;
	};
    return EntityList;
}));