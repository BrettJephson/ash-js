define( "game/platformer",
    [
        "game/components/gamestate",
        "game/systems/gamemanager",
        "game/systems/motioncontrolsystem",
        "game/systems/movementsystem",
        "game/systems/rendersystem",
        "game/systems/systempriorities",
        "game/entitycreator",
        "ash/engine",
        "ash/system",
        "brejep/keypoll",
        "brejep/tickprovider"
    ],
    function(
        GameState,
        GameManager,
        MotionControlSystem,
        MovementSystem,
        RenderSystem,
        SystemPriorities,
        EntityCreator,
        Engine,
        System,
        KeyPoll,
        TickProvider
    ) {
		function Platformer() {
		}
		var api = Platformer.prototype;
		api.game = null;
		api.gameState = null;
		api.tickProvider = null;
		api.initialise = function( canvas ) {
			var canvasContext = canvas.getContext( "2d" );
			
			this.game = new Engine();
			this.gameState = new GameState();
			
			var keyPoll = new KeyPoll();
			var creator = new EntityCreator( this.game, canvasContext );
			
			this.game.addSystem(
				new GameManager( this.gameState, creator ),
				SystemPriorities.preUpdate
			);
			this.game.addSystem(
				new MotionControlSystem( keyPoll ),
				SystemPriorities.update 
			);
			this.game.addSystem(
				new MovementSystem( this.gameState ),
				SystemPriorities.move
			);
			this.game.addSystem(
				new RenderSystem( canvasContext ),
				SystemPriorities.render
			);
			
			this.tickProvider = new TickProvider();
		};
		api.start = function() {
			this.gameState.lives = 3;
			
			this.tickProvider.add( this.game.update, this.game );
			this.tickProvider.start();
		};
        return Platformer;
    }
);