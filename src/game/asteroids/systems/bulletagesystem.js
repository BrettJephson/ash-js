define( "game/systems/bulletagesystem",
    [ 
		"ash/system",
		"game/nodes/bulletage" 
	],
    function( 
		System, 
		BulletAgeNode
	) {
        function BulletAgeSystem( creator ) {
			Object.extend(BulletAgeSystem.prototype, System.prototype);
			this.initialise( creator );
		}
		var api = BulletAgeSystem.prototype;
		api.creator = null;
		api.nodeList = null;
		api.initialise = function( creator ) {
			this.creator = creator;
			return this;
		};
		api.addToEngine = function( engine ) {
			this.nodeList = engine.getNodeList( BulletAgeNode );
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
			var bullet = node.bullet;
			bullet.lifeRemaining -= time;
			if ( bullet.lifeRemaining <= 0 ) {
				this.creator.destroyEntity( node.entity );
			}
		};
		return BulletAgeSystem;
    }
);