/**
 * Ash-js Node List
 */
(function( root, factory ) {
    // We want the object to work with or without AMD
    if( typeof define === 'function' && define.amd ) {
        define('ash/nodelist', ["libs/signals"], factory );
    } else {
        // If not using AMD, references to dependencies must be available on the root object
        if( typeof root.ash === 'undefined') {
            root.ash = {};
        }
        root.ash.nodelist = factory( root.signals );
    }
} ( this, function( signals ) {
    "use strict";
    return {
        head : null,
        tail : null,
        nodeAdded : new signals.Signal(),
        nodeRemoved : new signals.Signal(),
        add : function( node ) {
            if( !this.head ) {
                this.head = this.tail = node;
            } else {
                this.tail.next = node;
                node.previous = this.tail;
                this.tail = node;
            }
            this.nodeAdded.dispatch( node );
        },
        remove : function( node ) {
            if( this.head == node ) {
                this.head = this.head.next;
            }
            if( this.tail == node ) {
                this.tail = this.tail.previous;
            }
            if( node.previous ) {
                node.previous.next = node.next;
            }
            if( node.next ) {
                node.next.previous = node.previous;
            }
            this.nodeRemoved.dispatch( node );
        },
        removeAll : function() {
            while( this.head ) {
                var node = this.head;
                this.head = node.next;
                node.previous = null;
                node.next = null;
                this.nodeRemoved.dispatch( node );
            }
            this.tail = null;
        },
        empty : function() {
            return this.head == null;
        },
        swap : function( node1, node2 ) {
            if( node1.previous == node2 ) {
                node1.previous = node2.previous;
                node2.previous = node1;
                node2.next = node1.next;
                node1.next = node2;
            } else if( node2.previous == node1 ) {
                node2.previous = node1.previous;
                node1.previous = node2;
                node1.next = node2.next;
                node2.next = node1;
            } else {
                var temp = node1.previous;
                node1.previous = node2.previous;
                node2.previous = temp;
                temp = node1.next;
                node1.next = node2.next;
                node2.next = temp;
            }
            if( this.head == node1 ) {
                this.head = node2;
            } else if( this.head == node2 ) {
                this.head = node1;
            }
            if( this.tail == node1 ) {
                this.tail = node2;
            } else if( this.tail == node2 ) {
                this.tail = node1;
            }
            if( node1.previous ) {
                node1.previous.next = node1;
            }
            if( node2.previous ) {
                node2.previous.next = node2;
            }
            if( node1.next ) {
                node1.next.previous = node1;
            }
            if( node2.next ) {
                node2.next.previous = node2;
            }
        }
    };
}));