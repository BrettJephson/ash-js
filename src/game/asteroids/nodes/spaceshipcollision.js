define( "game/nodes/spaceshipcollision",
    [ "game/components/spaceship", "game/components/position" ],
    function( Spaceship, Position ) {
        function SpaceshipCollision() {}
		SpaceshipCollision.prototype.spaceship = null;
        SpaceshipCollision.prototype.position = null;
        SpaceshipCollision.prototype.types = {
			spaceship : Spaceship,
			position : Position
		};
		return SpaceshipCollision;
    }
);