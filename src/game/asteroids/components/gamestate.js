define( "game/components/gamestate",
    function() {
		function GameState( width, height ) {
			this.lives = 0;
			this.level = 0;
			this.points = 0;
			this.width = width;
			this.height = height;
		}
        return GameState;
    }
);