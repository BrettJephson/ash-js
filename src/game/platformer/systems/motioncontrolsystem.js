define( "game/systems/motioncontrolsystem",
    [ "ash/system", "game/nodes/motioncontrol" ],
    function( System, MotionControlNode ) {
		function MotionControlSystem( keyPoll ) {
			Object.extend( MotionControlSystem.prototype, System.prototype );
			this.initialise( keyPoll );
		}
		var api = MotionControlSystem.prototype;
		api.keyPoll = null,
		api.initialise = function( keyPoll ) {
			this.keyPoll = keyPoll;
			return this;
		};
		api.addToEngine = function( engine ) {
			this.nodeList = engine.getNodeList( MotionControlNode );
		};
		api.removeFromEngine = function( engine ) {
			this.nodeList = null;
		};
		api.update = function( time ) {
			for( var node = this.nodeList.head; node; node = node.next ) {
				this.updateNode( node, time );
			}
		};
		api.updateNode = function( node, time ) {
			var control = node.control,
				motion = node.motion;
			
			if( this.keyPoll.isDown( control.left ) ) {
				motion.velocity.x -= control.accelerationRate * time;
			}
			if ( this.keyPoll.isDown( control.right ) ) {
				motion.velocity.x += control.accelerationRate * time;
			}
		};
        return MotionControlSystem;
    }
);