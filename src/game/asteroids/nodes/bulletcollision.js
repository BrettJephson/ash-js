define( "game/nodes/bulletcollision",
    [ "game/components/bullet", "game/components/position" ],
    function( Bullet, Position ) {
		function BulletCollision() {}
		BulletCollision.prototype.bullet = null,
        BulletCollision.prototype.position = null,
        BulletCollision.prototype.types = {
			bullet : Bullet,
			position : Position
		};
        return BulletCollision;
    }
);