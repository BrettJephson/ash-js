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
        "ash/game",
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
        Game, 
        System, 
        Signal, 
        Dictionary, 
        TickProvider,
        KeyPoll
    ) {
        return {
            width : 0,
            height : 0,
            game : null,
            gameState : null,
            tickProvider : null,
            initialise : function( canvas ) {
                var canvasContext = canvas.getContext( "2d" );
                
                this.width = canvas.width;
                this.height = canvas.height;
                
                this.game = Object.create( Game ).initialise();
                
                this.gameState = Object.create( GameState ).initialise( this.width, this.height );
                
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
                        Object.create( GunControlSystem )
                    ).initialise( keyPoll, creator ),
                    SystemPriorities.update
                );
                this.game.addSystem( 
                    Object.extend(
                        Object.create( System ),
                        Object.create( BulletAgeSystem )
                    ).initialise( creator ),
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
                        Object.create( CollisionSystem )
                    ).initialise( creator ),
                    SystemPriorities.resolveCollisions
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
                this.gameState.level = 0;
                this.gameState.lives = 3;
                this.gameState.points = 0;
                
                this.tickProvider.add( this.game.update, this.game );
                this.tickProvider.start();
            }
        };
    }
);