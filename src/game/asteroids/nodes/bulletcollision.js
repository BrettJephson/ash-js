define( "game/nodes/bulletcollision",
    [ "game/components/bullet", "game/components/position" ],
    function( Node, Bullet, Position ) {
		function BulletCollision() {
			Object.extend( BulletCollision.prototype, Node.prototype );
		}
		BulletCollision.prototype.bullet = null,
        BulletCollision.prototype.position = null,
        BulletCollision.prototype.types = {
			bullet : Bullet,
			position : Position
		};
        return BulletCollision;
    }
);