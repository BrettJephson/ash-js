define( "game/nodes/asteroidcollision",
    [ "ash/node", "game/components/asteroid", "game/components/position" ],
    function( Node, Asteroid, Position ) {
		function AsteroidCollision() {
			Object.extend( AsteroidCollision.prototype, Node.prototype );
		}
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