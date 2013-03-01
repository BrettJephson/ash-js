/**
 * Ash-js System List
 */
define(function () {
    'use strict';

    function SystemList() {}
    var api = SystemList.prototype;
    api.head = null; /* System */
    api.tail = null; /* System */
    api.add = function( system ) {
        if( !this.head ) {
            this.head = this.tail = system;
            system.next = system.previous = null;
        } else {
            for( var node = this.tail; node; node = node.previous ) {
                if( node.priority <= system.priority ) {
                    break;
                }
            }
            if( node == this.tail ) {
                this.tail.next = system;
                system.previous = this.tail;
                system.next = null;
                this.tail = system;
            } else if( !node ) {
                system.next = this.head;
                system.previous = null;
                this.head.previous = system;
                this.head = system;
            } else {
                system.next = node.next;
                system.previous = node;
                node.next.previous = system;
                node.next = system;
            }
        }
    };
    api.remove = function( system ) {
        if ( this.head == system ) {
            this.head = this.head.next;
        }
        if ( this.tail == system ) {
            this.tail = this.tail.previous;
        }
        if ( system.previous ) {
            system.previous.next = system.next;
        }
        if ( system.next ) {
            system.next.previous = system.previous;
        }
    };
    api.removeAll = function() {
        while( this.head )
        {
            var system = this.head;
            this.head = this.head.next;
            system.previous = null;
            system.next = null;
        }
        this.tail = null;
    };
    api.get = function( type ) {
        for( var system = this.head; system; system = system.next ) {
            if ( system.is( type ) ) {
                return system;
            }
        }
        return null;
    };

    return SystemList;
});
