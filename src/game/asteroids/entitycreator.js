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
        return {
            game : null,
            graphics : null,
            initialise : function( game, graphics ) {
                this.game = game;
                this.graphics = graphics;
                return this;
            },
            destroyEntity : function( entity ) {
                this.game.removeEntity( entity );
            },
            createAsteroid : function( radius, x, y ) {
                var asteroid = Object.create( Entity ).initialise()
                    .add( Object.create( Asteroid ).initialise(), Asteroid )
                    .add( Object.create( Position ).initialise( x, y, 0, radius ), Position )
                    .add( Object.create( Motion ).initialise(
                        ( Math.random() - 0.5 ) * 4 * ( 50 - radius ), 
                        ( Math.random() - 0.5 ) * 4 * ( 50 - radius ), 
                        Math.random() * 2 - 1,
                        0 ), Motion )
                    .add( Object.create( Display ).initialise( Object.create( AsteroidView ).initialise( radius, this.graphics ) ), Display );
                this.game.addEntity( asteroid );
                return asteroid;
            },
            createSpaceship : function() {
                var spaceship = Object.create( Entity ).initialise()
                    .add( Object.create( Spaceship ).initialise(), Spaceship )
                    .add( Object.create( Position ).initialise( 400, 300, 0, 6 ), Position )
                    .add( Object.create( Motion ).initialise( 0, 0, 0, 15 ), Motion )
                    .add( Object.create( MotionControls ).initialise( Keyboard.LEFT, Keyboard.RIGHT, Keyboard.UP, 100, 3 ), MotionControls )
                    .add( Object.create( Gun ).initialise( 8, 0, 0.3, 2 ), Gun )
                    .add( Object.create( GunControls ).initialise( Keyboard.Z ), GunControls )
                    .add( Object.create( Display ).initialise( Object.create( SpaceshipView ).initialise( this.graphics ) ), Display );
                this.game.addEntity( spaceship );
                return spaceship;
            },
            createUserBullet : function( gun, parentPosition ) {
                var cos = Math.cos( parentPosition.rotation );
                var sin = Math.sin( parentPosition.rotation );
                var bullet = Object.create( Entity ).initialise()
                    .add( Object.create( Bullet ).initialise( gun.bulletLifetime ), Bullet )
                    .add( Object.create( Position ).initialise( 
                        cos * gun.offsetFromParent.x - sin * gun.offsetFromParent.y + parentPosition.position.x,
                        sin * gun.offsetFromParent.x + cos * gun.offsetFromParent.y + parentPosition.position.y, 0, 0 ), Position )
                    .add( Object.create( Motion ).initialise( cos * 150, sin * 150, 0, 0 ), Motion )
                    .add( Object.create( Display ).initialise( Object.create( BulletView ).initialise( this.graphics ) ), Display );
                this.game.addEntity( bullet );
                return bullet;
            }
        };
    }
);