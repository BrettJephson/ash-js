define( "game/entitycreator",
    [
        "ash/entity",
		"game/components/player",
        "game/components/position",
        "game/components/motion",
        "game/components/motioncontrols",
        "game/components/display",
        "game/graphics/playerview"
    ],
    function( 
        Entity,
		Player,
        Position,
        Motion, 
        MotionControls,
        Display, 
        PlayerView 
    ) {
		function EntityCreator( game, graphics ) {
			this.initialise( game, graphics );
		}
		var api = EntityCreator.prototype;
		api.game = null;
		api.graphics = null;
		api.initialise = function( game, graphics ) {
			this.game = game;
			this.graphics = graphics;
			return this;
		};
		api.destroyEntity = function( entity ) {
			this.game.removeEntity( entity );
		};
		api.createPlayer = function() {
			var player = new Entity()
				.add( new Player() )
				.add( new Position( 400, 300 ) )
				.add( new Motion( 0, 0, 15 ) )
				.add( new MotionControls( Keyboard.LEFT, Keyboard.RIGHT, 100 ) )
				.add( new Display( new PlayerView( this.graphics ) ) );
			this.game.addEntity( player );
			return player;
		};
        return EntityCreator;
    }
);