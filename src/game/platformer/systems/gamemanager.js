define( "game/systems/gamemanager",
    [ "ash/system", "game/nodes/player" ],
    function( System, PlayerNode ) {
		function GameManager( gameState, creator ) {
			Object.extend( GameManager.prototype, System.prototype );
			this.initialise( gameState, creator );
		}
		var api = GameManager.prototype;
		api.gameState = null;
		api.creator = null;
		api.players = null;
		api.initialise = function( gameState, creator ) {
			this.gameState = gameState;
			this.creator = creator;
			return this;
		};
		api.addToEngine = function( engine ) {
			this.players = engine.getNodeList( PlayerNode );
		};
		api.removeFromEngine = function( engine ) {
			this.players = null;
		};
		api.update = function() {
			if( this.players.empty() ) {
				if( this.gameState.lives > 0 ) {
					this.creator.createPlayer();
					this.gameState.lives--;
				}
			}
		};
        return GameManager;
    }
);