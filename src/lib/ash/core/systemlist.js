/**
 * Ash-js System List
 */
(function( root, factory ) {
    // We want the object to work with or without AMD
    if( typeof define === 'function' && define.amd ) {
        define('ash/systemlist', factory );
    } else {
        // If not using AMD, references to dependencies must be available on the root object
        if( typeof root.ash === 'undefined') {
            root.ash = {};
        }
        root.ash.systemlist = factory();
    }
} ( this, function() {
    return {
        head : null, /* System */
        tail : null, /* System */
        add : function( system ) {
            if( !this.head ) {
                this.head = this.tail = system;
            } else {
                for( var node = this.tail; node; node = node.previous ) {
                    if( node.priority <= system.priority ) {
                        break;
                    }
                }
                if( node == this.tail ) {
                    this.tail.next = system;
                    system.previous = this.tail;
                    this.tail = system;
                } else if( !node ) {
                    system.next = this.head;
                    this.head.previous = system;
                    this.head = system;
                } else {
                    system.next = node.next;
                    system.previous = node;
                    node.next.previous = system;
                    node.next = system;
                }
            }
        },
        remove : function( system ) {
            if ( this.head == system) {
                this.head = this.head.next;
            }
            if ( this.tail == system) {
                this.tail = this.tail.previous;
            }
            if (system.previous) {
                system.previous.next = system.next;
            }
            if (system.next) {
                system.next.previous = system.previous;
            }
        },
        removeAll : function() {
            while( this.head )
            {
                var system = this.head;
                this.head = this.head.next;
                system.previous = null;
                system.next = null;
            }
            this.tail = null;
        },
        get : function( type ) {
            for( var system = this.head; system; system = system.next ) {
                if ( system.is( type ) ) {
                    return system;
                }
            }
            return null;
        }
    };
}));