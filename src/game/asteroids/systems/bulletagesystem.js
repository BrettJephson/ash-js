define( "game/systems/bulletagesystem",
    [ "game/nodes/bulletage" ],
    function( BulletAgeNode ) {
        return {
            creator : null,
            nodeList : null,
            initialise : function( creator ) {
                this.creator = creator;
                return this;
            },
            addToGame : function( game ) {
                this.nodeList = game.getNodeList( BulletAgeNode );
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
                var bullet = node.bullet;
                bullet.lifeRemaining -= time;
                if ( bullet.lifeRemaining <= 0 ) {
                    this.creator.destroyEntity( node.entity );
                }
            }
        };
    }
);