define( "game/nodes/spaceshipcollision",
    [ "ash/node", "game/components/spaceship", "game/components/position" ],
    function( Node, Spaceship, Position ) {
        function SpaceshipCollision() {
			Object.extend( SpaceshipCollision.prototype, Node.prototype );
		}
		SpaceshipCollision.prototype.spaceship = null;
        SpaceshipCollision.prototype.position = null;
        SpaceshipCollision.prototype.types = {
			spaceship : Spaceship,
			position : Position
		};
		return SpaceshipCollision;
    }
);