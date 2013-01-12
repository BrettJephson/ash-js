define( "game/systems/motioncontrolsystem",
    [ 
		"ash/system",
		"game/nodes/motioncontrol" 
	],
    function( 
		System, 
		MotionControlNode 
	) {
		function MotionControlSystem( keyPoll ){
			Object.extend( MotionControlSystem.prototype, System.prototype );
			this.initialise( keyPoll );
		}
		
		var api = MotionControlSystem.prototype;
		api.keyPoll = null,
        api.nodeList = null,
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
		};
        return MotionControlSystem;
    }
);