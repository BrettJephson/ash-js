define( "game/nodes/movement",
    [ "game/components/position", "game/components/motion" ],
    function( Position, Motion ) {
        function Movement() {}
		Movement.prototype.position = null;
		Movement.prototype.motion = null;
		Movement.prototype.types = {
			position : Position,
			motion : Motion
		};
		return Movement;
    }
);