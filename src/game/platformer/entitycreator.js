define( "game/entitycreator",
    [
        "ash/entity",
        "game/components/position",
        "game/components/motion",
        "game/components/motioncontrols",
        "game/components/display",
        "game/graphics/playerview"
    ],
    function( 
        Entity,
        Position,
        Motion, 
        MotionControls,
        Display, 
        PlayerView 
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
            createPlayer : function() {
                var player = Object.create( Entity ).initialise()
                    .add( Object.create( Position ).initialise( 400, 300 ), Position )
                    .add( Object.create( Motion ).initialise( 0, 0, 15 ), Motion )
                    .add( Object.create( MotionControls ).initialise( Keyboard.LEFT, Keyboard.RIGHT, 100 ), MotionControls )
                    .add( Object.create( Display ).initialise( Object.create( PlayerView ).initialise( this.graphics ) ), Display );
                this.game.addEntity( player );
                return player;
            }
        };
    }
);