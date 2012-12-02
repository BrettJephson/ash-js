define( "game/systems/movementsystem",
    [ "game/nodes/movement" ],
    function( MovementNode ) {
        return {
            nodeList : null,
            initialise : function() {
                return this;
            },
            addToGame : function( game ) {
                this.nodeList = game.getNodeList( MovementNode );
            },
            removeFromGame : function( game ) {
                this.nodeList = null;
            },
            update : function( time ) {
                for( var node = this.nodeList.head; node; node = node.next ) {
                    this.updateNode( node, time );
                }
            },
            updateNode : function( node, time ) {
                var position = node.position;
                var motion = node.motion;
                
                position.position.x += motion.velocity.x * time;
                position.position.y += motion.velocity.y * time;
            }
        };
    }
);