define( "game/nodes/player",
    [ "game/components/player", "game/components/position" ],
    function( Player, Position ) {
		function Player() {}
		Player.prototype.player = null;
		Player.prototype.position = null;
		Player.prototype.types = {
			player : Player,
			position : Position
		};
        return Player;
    }
);