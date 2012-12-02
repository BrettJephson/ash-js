define( "game/systems/gamemanager",
    [ 
        "game/nodes/spaceshipcollision", 
        "game/nodes/asteroidcollision",
        "game/nodes/bulletcollision",
        "brejep/point"
    ],
    function(
        SpaceshipCollisionNode,
        AsteroidCollisionNode,
        BulletCollisionNode,
        Point
    ) {
        return {
            gameState : null,
            creator : null,
            spaceships : null,
            asteroids : null,
            bullets : null,
            initialise : function( gameState, creator ) {
                this.gameState = gameState;
                this.creator = creator;
                return this;
            },
            addToGame : /* Override */ function( game ) {
                this.spaceships = game.getNodeList( SpaceshipCollisionNode );
                this.asteroids = game.getNodeList( AsteroidCollisionNode );
                this.bullets = game.getNodeList( BulletCollisionNode );
            },
            update : /* Override */ function( time ) {
                if( this.spaceships.empty() )
                {
                    if( this.gameState.lives > 0 )
                    {
                        var newSpaceshipPosition = Object.create( Point ).initialise( this.gameState.width * 0.5, this.gameState.height * 0.5 );
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
                            var position = Object.create( Point ).initialise( 
                                Math.random() * this.gameState.width, 
                                Math.random() * this.gameState.height 
                            );
                        }
                        while ( position.distanceTo( spaceship.position.position ) <= 80 );
                        this.creator.createAsteroid( 30, position.x, position.y );
                    }
                }
            },
            removeFromGame : /* Override */ function( game ) {
                this.spaceships = null;
                this.asteroids = null;
                this.bullets = null;
            }
        };
    }
);