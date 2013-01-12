define( "game/components/motion",
    [ "brejep/point" ],
    function( Point ) {
		function Motion( velocityX, velocityY, angularVelocity, damping ) {
			this.velocity = new Point( velocityX, velocityY );
			this.angularVelocity = angularVelocity;
			this.damping = damping;
		}
        return Motion;
	}
);