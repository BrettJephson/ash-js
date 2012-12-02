define( "game/systems/guncontrolsystem",
    [ "game/nodes/guncontrol" ],
    function( GunControlNode ) {
        return {
            keyPoll : null,
            creator : null,
            nodeList : null,
            initialise : function( keyPoll, creator ) {
                this.keyPoll = keyPoll;
                this.creator = creator;
                return this;
            },
            addToGame : function( game ) {
                this.nodeList = game.getNodeList( GunControlNode );
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
                var control = node.control,
                    position = node.position,
                    gun = node.gun;
                    
                gun.shooting = this.keyPoll.isDown( control.trigger );
                gun.timeSinceLastShot += time;
                if ( gun.shooting && gun.timeSinceLastShot >= gun.minimumShotInterval ) {
                    this.creator.createUserBullet( gun, position );
                    gun.timeSinceLastShot = 0;
                }
            }
        };
    }
);