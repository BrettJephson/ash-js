define( "game/systems/motioncontrolsystem",
    [ "game/nodes/motioncontrol" ],
    function( MotionControlNode ) {
        return {
            keyPoll : null,
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
                    motion = node.motion;
                
                if( this.keyPoll.isDown( control.left ) ) {
                    motion.velocity.x -= control.accelerationRate * time;
                }
                if ( this.keyPoll.isDown( control.right ) ) {
                    motion.velocity.x += control.accelerationRate * time;
                }
            }
        };
    }
);