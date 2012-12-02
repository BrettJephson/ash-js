define( "game/systems/gamemanager",
    [ "game/nodes/player" ],
    function( PlayerNode ) {
        return {
            gameState : null,
            creator : null,
            players : null,
            initialise : function( gameState, creator ) {
                this.gameState = gameState;
                this.creator = creator;
                return this;
            },
            addToGame : function( game ) {
                this.players = game.getNodeList( PlayerNode );
            },
            removeFromGame : function( game ) {
                this.players = null;
            },
            update : function( ) {
                if( this.players.empty() ) {
                    if( this.gameState.lives > 0 ) {
                        this.creator.createPlayer();
                        this.gameState.lives--;
                    }
                }
            }
        }
    }
);