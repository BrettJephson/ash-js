define( "game/nodes/asteroidcollision",
    [ "game/components/asteroid", "game/components/position" ],
    function( Asteroid, Position ) {
		function AsteroidCollision() {}
		AsteroidCollision.prototype.asteroid = null;
		AsteroidCollision.prototype.position = null;
		///TODO come back to this inelegant bit
		AsteroidCollision.prototype.types = {
			asteroid : Asteroid,
			position : Position
		};
        return AsteroidCollision;
    }
);