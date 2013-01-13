define( "game/nodes/bulletage",
    [ "ash/node", "game/components/bullet" ],
    function( Node, Bullet ) {
		function BulletAge() {
			Object.extend( BulletAge.prototype, Node.prototype );
		}
		BulletAge.prototype.bullet = null;
		BulletAge.prototype.types = {
			bullet : Bullet
		};
		return BulletAge;
    }
);