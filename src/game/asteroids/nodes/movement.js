define( "game/nodes/movement",
    [ "ash/node", "game/components/position", "game/components/motion" ],
    function( Node, Position, Motion ) {
        function Movement() {
			Object.extend( Movement.prototype, Node.prototype );
		}
		Movement.prototype.position = null;
		Movement.prototype.motion = null;
		Movement.prototype.types = {
			position : Position,
			motion : Motion
		};
		return Movement;
    }
);