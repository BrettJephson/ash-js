define( "ash/nodepool",
    function() {
        return {
            tail : null,
            cacheTail : null,
            nodeObject : null,
            initialise : function( nodeObject ) {
                this.nodeObject = nodeObject;
                return this;
            },
            getNodeObject : function() {
                if( this.tail ) {
                    var node = this.tail;
                    this.tail = this.tail.previous;
                    node.previous = null;
                    return node;
                } else {
                    return Object.create( this.nodeObject );
                }
            },
            dispose : function( node ) {
                node.next = null;
                node.previous = this.tail;
                this.tail = node;
            },
            cache : function( node ) {
                node.previous = this.cacheTail;
                this.cacheTail = node;
            },
            releaseCache : function() {
                while( this.cacheTail ) {
                    var node = this.cacheTail;
                    this.cacheTail = node.previous;
                    node.next = null;
                    node.previous = this.tail;
                    this.tail = node;
                }
            }
        }
    }
);