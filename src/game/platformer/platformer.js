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
        return {
            game : null,
            gameState : null,
            tickProvider : null,
            initialise : function( canvas ) {
                var canvasContext = canvas.getContext( "2d" );
                
                this.game = Object.create( Engine ).initialise();
                this.gameState = Object.create( GameState ).initialise();
                
                var keyPoll = Object.create( KeyPoll ).initialise();
                var creator = Object.create( EntityCreator ).initialise( this.game, canvasContext );
                
                this.game.addSystem(
                    Object.extend(
                        Object.create( System ),
                        Object.create( GameManager )
                    ).initialise( this.gameState, creator ),
                    SystemPriorities.preUpdate
                );
                this.game.addSystem(
                    Object.extend(
                        Object.create( System ), 
                        Object.create( MotionControlSystem ) 
                    ).initialise( keyPoll ),
                    SystemPriorities.update 
                );
                this.game.addSystem(
                    Object.extend(
                        Object.create( System ),
                        Object.create( MovementSystem )
                    ).initialise( this.gameState ),
                    SystemPriorities.move
                );
                this.game.addSystem(
                    Object.extend( 
                        Object.create( System ),
                        Object.create( RenderSystem )
                    ).initialise( canvasContext ),
                    SystemPriorities.render
                );
                
                this.tickProvider = Object.create( TickProvider );
            },
            start : function() {
                this.gameState.lives = 3;
                
                this.tickProvider.add( this.game.update, this.game );
                this.tickProvider.start();
            }
        };
    }
);