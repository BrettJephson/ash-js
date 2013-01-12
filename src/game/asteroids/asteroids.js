define( "game/asteroids",
    [ 
        "game/components/gamestate", 
        "game/systems/gamemanager", 
        "game/systems/motioncontrolsystem",
        "game/systems/guncontrolsystem",
        "game/systems/bulletagesystem",
        "game/systems/movementsystem",
        "game/systems/collisionsystem",
        "game/systems/rendersystem",
        "game/systems/systempriorities",
        "game/entitycreator",
        "ash/engine",
        "ash/system",
        "libs/signals", 
        "brejep/dictionary", 
        "brejep/tickprovider",
        "brejep/keypoll"
    ],
    function( 
        GameState, 
        GameManager, 
        MotionControlSystem,
        GunControlSystem,
        BulletAgeSystem,
        MovementSystem,
        CollisionSystem,
        RenderSystem,
        SystemPriorities,
        EntityCreator,
        Engine,
        System, 
        Signal, 
        Dictionary, 
        TickProvider,
        KeyPoll
    ) {
		function Asteroids() {}
		var api = Asteroids.prototype;
		
		api.width = 0;
		api.height = 0;
		api.engine = null;
		api.gameState = null;
		api.tickProvider = null;
		api.initialise = function( canvas ) {
			var canvasContext = canvas.getContext( "2d" );
			
			this.width = canvas.width;
			this.height = canvas.height;
			
			this.engine = new Engine();
			
			this.gameState = new GameState( this.width, this.height );
			
			var keyPoll = new KeyPoll();
			var creator = new EntityCreator( this.engine, canvasContext );
			
			this.engine.addSystem( 
				new GameManager( this.gameState, creator ),
				SystemPriorities.preUpdate 
			);
			this.engine.addSystem( 
				new MotionControlSystem( keyPoll ),
				SystemPriorities.update
			);
			this.engine.addSystem(
				new GunControlSystem( keyPoll, creator ),
				SystemPriorities.update
			);
			this.engine.addSystem( 
				new BulletAgeSystem( creator),
				SystemPriorities.update
			);
			this.engine.addSystem(
				new MovementSystem( this.gameState ),
				SystemPriorities.move
			);
			this.engine.addSystem( 
				new CollisionSystem( creator ),
				SystemPriorities.resolveCollisions
			);
			this.engine.addSystem(
				new RenderSystem( canvasContext ),
				SystemPriorities.render
			);
			this.tickProvider = new TickProvider();
		};
		api.start = function() {
			this.gameState.level = 0;
			this.gameState.lives = 3;
			this.gameState.points = 0;
			
			this.tickProvider.add( this.engine.update, this.engine );
			this.tickProvider.start();
		};
		return Asteroids;
	}
);