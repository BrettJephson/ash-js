define( "game/components/bullet",
    function() {
		function Bullet( lifeTime ) {
			this.lifeRemaining = lifeTime;
		}
        return Bullet;
    }
);