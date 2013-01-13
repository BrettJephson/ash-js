define( "game/nodes/player",
    [ "ash/node", "game/components/player", "game/components/position" ],
    function( Node, Player, Position ) {
		function Player() {
			Object.extend( Player.prototype, Node.prototype );
		}
		Player.prototype.player = null;
		Player.prototype.position = null;
		Player.prototype.types = {
			player : Player,
			position : Position
		};
        return Player;
    }
);