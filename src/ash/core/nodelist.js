/**
 * Ash-js Node List
 */
define([
    'signals',
    'brejep/class'
], function (signals, Class) {
    'use strict';

    var NodeList = Class.extend({
        constructor: function () {
            this.head = null;
            this.tail = null;
            this.nodeAdded = new signals.Signal();
            this.nodeRemoved = new signals.Signal();
        },
        
        add: function( node ) {
            if( !this.head ) {
                this.head = this.tail = node;
            } else {
                this.tail.next = node;
                node.previous = this.tail;
                this.tail = node;
            }
            this.nodeAdded.dispatch( node );
        },
        
        remove: function( node ) {
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
        
        removeAll: function() {
            while( this.head ) {
                var node = this.head;
                this.head = node.next;
                node.previous = null;
                node.next = null;
                this.nodeRemoved.dispatch( node );
            }
            this.tail = null;
        },
        
        empty: function() {
            return this.head === null;
        },
        
        swap: function( node1, node2 ) {
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
        },
        
        insertionSort: function( sortFunction ) {
            if( this.head == this.tail ) {
                return;
            }
            var remains = this.head.next;
            for( var node = remains; node; node = remains ) {
                remains = node.next;
                for( var other = node.previous; other; other = other.previous ) {
                    if( sortFunction( node, other ) >= 0 ) {
                        if( node != other.next ) {
                            if( this.tail == node ) {
                                this.tail = node.previous;
                            }
                            node.previous.next = node.next;
                            if( node.next ) {
                                node.next.previous = node.previous;
                            }
                            node.next = other.next;
                            node.previous = other;
                            node.next.previous = node;
                            other.next = node;
                        }
                        break;
                    }
                }
                if( !other ) {
                    if( this.tail == node ) {
                        this.tail = node.previous;
                    }
                    node.previous.next = node.next;
                    if( node.next ) {
                        node.next.previous = node.previous;
                    }
                    node.next = this.head;
                    this.head.previous = node;
                    node.previous = null;
                    this.head = node;
                }
            }
        },
        
        mergeSort: function( sortFunction ) {
            if( this.head == this.tail ) {
                return;
            }
            var lists = [],
                start = this.head,
                end;
            while( start ) {
                end = start;
                while( end.next && sortFunction( end, end.next ) <= 0 ) {
                    end = end.next;
                }
                var next = end.next;
                start.previous = end.next = null;
                lists.push( start );
                start = next;
            }
            while( lists.length > 1 ) {
                lists.push( this.merge( lists.shift(), lists.shift(), sortFunction ) );
            }
            this.tail = this.head = lists[0];
            while( this.tail.next ) {
                this.tail = this.tail.next;
            }
        },
        
        merge: function( head1, head2, sortFunction ) {
            var node,
                head;
            if( sortFunction( head1, head2 ) <= 0 ) {
                head = node = head1;
                head1 = head1.next;
            } else {
                head = node = head2;
                head2 = head2.next;
            }
            while( head1 && head2 ) {
                if( sortFunction( head1, head2 ) <= 0 ) {
                    node.next = head1;
                    head1.previous = node;
                    node = head1;
                    head1 = head1.next;
                } else {
                    node.next = head2;
                    head2.previous = node;
                    node = head2;
                    head2 = head2.next;
                }
            }
            if( head1 ) {
                node.next = head1;
                head1.previous = node;
            } else {
                node.next = head2;
                head2.previous = node;
            }
            return head;
        }
    });

    return NodeList;
});
