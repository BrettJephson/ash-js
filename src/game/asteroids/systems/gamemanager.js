define( "game/systems/gamemanager",
    [ 
		"ash/system",
        "game/nodes/spaceshipcollision", 
        "game/nodes/asteroidcollision",
        "game/nodes/bulletcollision",
        "brejep/point"
    ],
    function(
		System,
        SpaceshipCollisionNode,
        AsteroidCollisionNode,
        BulletCollisionNode,
        Point
    ) {
		function GameManager( gameState, creator ){
			Object.extend(GameManager.prototype, System.prototype);
			this.initialise( gameState, creator );
		}
		
		var api = GameManager.prototype;
		api.gameState = null;
		api.creator = null;
		api.spaceships = null;
		api.asteroids = null;
		api.bullets = null;
		api.initialise = function( gameState, creator ) {
			this.gameState = gameState;
			this.creator = creator;
			return this;
		};
		api.addToEngine = function( game ) {
			this.spaceships = game.getNodeList( SpaceshipCollisionNode );
			this.asteroids = game.getNodeList( AsteroidCollisionNode );
			this.bullets = game.getNodeList( BulletCollisionNode );
		};
		api.update = function( time ) {
			if( this.spaceships.empty() )
			{
				if( this.gameState.lives > 0 )
				{
					var newSpaceshipPosition = new Point( this.gameState.width * 0.5, this.gameState.height * 0.5 );
					var clearToAddSpaceship = true;
					for( var asteroid = this.asteroids.head; asteroid; asteroid = asteroid.next )
					{
						if( asteroid.position.position.distanceTo( newSpaceshipPosition ) <= asteroid.position.collisionRadius + 50 )
						{
							clearToAddSpaceship = false;
							break;
						}
					}
					if( clearToAddSpaceship )
					{
						this.creator.createSpaceship();
						this.gameState.lives--;
					}
				}
				else
				{
					// game over
				}
			}
			
			if( this.asteroids.empty() && this.bullets.empty() && !this.spaceships.empty() )
			{
				// next level
				var spaceship = this.spaceships.head;
				this.gameState.level++;
				var asteroidCount = 2 + this.gameState.level;
				for( var i = 0; i < asteroidCount; ++i )
				{
					// check not on top of spaceship
					do
					{
						var position = new Point( 
							Math.random() * this.gameState.width, 
							Math.random() * this.gameState.height 
						);
					}
					while ( position.distanceTo( spaceship.position.position ) <= 80 );
					this.creator.createAsteroid( 30, position.x, position.y );
				}
			}
		};
		api.removeFromEngine = function( game ) {
			this.spaceships = null;
			this.asteroids = null;
			this.bullets = null;
		};
        return GameManager;
    }
);