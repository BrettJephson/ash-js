define( "game/systems/motioncontrolsystem",
    [ "game/nodes/motioncontrol" ],
    function( MotionControlNode ) {
        return {
            keyPoll : null,
            nodeList : null,
            initialise : function( keyPoll ) {
                this.keyPoll = keyPoll;
                return this;
            },
            addToGame : function( game ) {
                this.nodeList = game.getNodeList( MotionControlNode );
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
                    motion = node.motion;
                
                if( this.keyPoll.isDown( control.left ) ) {
                    position.rotation -= control.rotationRate * time;
                }
                if ( this.keyPoll.isDown( control.right ) ) {
                    position.rotation += control.rotationRate * time;
                }
                if ( this.keyPoll.isDown( control.accelerate ) ) {
                    motion.velocity.x += Math.cos( position.rotation ) * control.accelerationRate * time;
                    motion.velocity.y += Math.sin( position.rotation ) * control.accelerationRate * time;
                }
            }
        };
    }
);