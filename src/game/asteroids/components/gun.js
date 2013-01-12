define( "game/components/gun",
    [ "brejep/point" ],
    function( Point ) {
		function Gun( offsetX, offsetY, minimumShotInterval, bulletLifetime ) {
			this.shooting = false;
			this.offsetFromParent = null;
			this.timeSinceLastShot = 0;
			this.offsetFromParent = new Point( offsetX, offsetY );
			this.minimumShotInterval = minimumShotInterval;
			this.bulletLifetime = bulletLifetime;
		}
        return Gun;
    }
);