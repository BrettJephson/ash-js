define( "game/nodes/bulletage",
    [ "game/components/bullet" ],
    function( Bullet ) {
		function BulletAge() {}
		BulletAge.prototype.bullet = null;
		BulletAge.prototype.types = {
			bullet : Bullet
		};
		return BulletAge;
    }
);