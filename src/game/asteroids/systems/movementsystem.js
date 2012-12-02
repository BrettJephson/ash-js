define( "game/systems/movementsystem",
    [ "game/nodes/movement" ],
    function( MovementNode ) {
        return {
            gameState : null,
            nodeList : null,
            initialise : function( gameState ) {
                this.gameState = gameState;
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
                // check boundaries
                if ( position.position.x < 0 ) {
                    position.position.x += this.gameState.width;
                }
                if ( position.position.x > this.gameState.width ) {
                    position.position.x -= this.gameState.width;
                }
                if ( position.position.y < 0 ) {
                    position.position.y += this.gameState.height;
                }
                if ( position.position.y > this.gameState.height ) {
                    position.position.y -= this.gameState.height;
                }
                
                position.rotation += motion.angularVelocity * time;
                
                if ( motion.damping > 0 )
                {
                    var xDamp = Math.abs( Math.cos( position.rotation ) * motion.damping * time );
                    var yDamp = Math.abs( Math.sin( position.rotation ) * motion.damping * time );
                    if ( motion.velocity.x > xDamp ) {
                        motion.velocity.x -= xDamp;
                    } else if ( motion.velocity.x < -xDamp ) {
                        motion.velocity.x += xDamp;
                    } else {
                        motion.velocity.x = 0;
                    }
                    if ( motion.velocity.y > yDamp ) {
                        motion.velocity.y -= yDamp;
                    } else if ( motion.velocity.y < -yDamp ) {
                        motion.velocity.y += yDamp;
                    } else {
                        motion.velocity.y = 0;
                    }
                }
            }
        };
    }
);