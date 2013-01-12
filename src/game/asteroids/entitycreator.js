define( "game/entitycreator",
    [ 
        "ash/entity", 
        "game/components/asteroid", 
        "game/components/spaceship", 
        "game/components/bullet",
        "game/components/position", 
        "game/components/motion", 
        "game/components/motioncontrols",
        "game/components/gun", 
        "game/components/guncontrols", 
        "game/components/display",
        "game/graphics/asteroidview",
        "game/graphics/spaceshipview",
        "game/graphics/bulletview" 
    ],
    function(
        Entity,
        Asteroid,
        Spaceship,
        Bullet,
        Position,
        Motion,
        MotionControls,
        Gun,
        GunControls,
        Display,
        AsteroidView,
        SpaceshipView,
        BulletView
    ) {
		function EntityCreator( game, graphics ) {
			this.initialise( game, graphics );
		}
		EntityCreator.prototype.game = null;
		EntityCreator.prototype.graphics = null;
		EntityCreator.prototype.initialise = function( game, graphics ) {
			this.game = game;
			this.graphics = graphics;
			return this;
		};
		EntityCreator.prototype.destroyEntity = function( entity ) {
			this.game.removeEntity( entity );
		};
		EntityCreator.prototype.createAsteroid = function( radius, x, y ) {
			var asteroid = new Entity()
				.add( new Asteroid() )
				.add( new Position( x, y, 0, radius ) )
				.add( 
					new Motion(
						( Math.random() - 0.5 ) * 4 * ( 50 - radius ), 
						( Math.random() - 0.5 ) * 4 * ( 50 - radius ), 
						Math.random() * 2 - 1,
						0
					) 
				)
				.add( new Display( new AsteroidView( radius, this.graphics ) ) );
			this.game.addEntity( asteroid );
			return asteroid;
		};
		EntityCreator.prototype.createSpaceship = function() {
			var spaceship = new Entity()
				.add( new Spaceship() )
				.add( new Position( 400, 300, 1, 6 ) )
				.add( new Motion( 0, 0, 0, 15 ) )
				.add( new MotionControls( Keyboard.LEFT, Keyboard.RIGHT, Keyboard.UP, 100, 3 ) )
				.add( new Gun( 8, 0, 0.3, 2 ) )
				.add( new GunControls( Keyboard.Z ) )
				.add( new Display( new SpaceshipView( this.graphics ) ) );
			this.game.addEntity( spaceship );
			return spaceship;
		};
		EntityCreator.prototype.createUserBullet = function( gun, parentPosition ) {
			var cos = Math.cos( parentPosition.rotation );
			var sin = Math.sin( parentPosition.rotation );
			var bullet = new Entity()
				.add( new Bullet( gun.bulletLifetime ) )
				.add( new Position( 
					cos * gun.offsetFromParent.x - sin * gun.offsetFromParent.y + parentPosition.position.x,
					sin * gun.offsetFromParent.x + cos * gun.offsetFromParent.y + parentPosition.position.y, 0, 0 ) )
				.add( new Motion( cos * 150, sin * 150, 0, 0 ) )
				.add( new Display( new BulletView( this.graphics ) ) );
			this.game.addEntity( bullet );
			return bullet;
        };
        return EntityCreator;
    }
);