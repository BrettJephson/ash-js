define( "game/systems/guncontrolsystem",
    [ 
		"ash/system",
		"game/nodes/guncontrol" 
	],
    function( System, GunControlNode ) {
		function GunControlSystem( keyPoll, creator ) {
			Object.extend( GunControlSystem.prototype, System.prototype );
			this.initialise( keyPoll, creator );
		}
		var api = GunControlSystem.prototype;
		api.keyPoll = null;
		api.creator = null;
		api.nodeList = null;
		api.initialise = function( keyPoll, creator ) {
			this.keyPoll = keyPoll;
			this.creator = creator;
			return this;
		};
		api.addToEngine = function( engine ) {
			this.nodeList = engine.getNodeList( GunControlNode );
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
				gun = node.gun;
				
			gun.shooting = this.keyPoll.isDown( control.trigger );
			gun.timeSinceLastShot += time;
			if ( gun.shooting && gun.timeSinceLastShot >= gun.minimumShotInterval ) {
				this.creator.createUserBullet( gun, position );
				gun.timeSinceLastShot = 0;
			}
		};
        return GunControlSystem;
    }
);