define( "game/components/motion",
    [ "brejep/point" ],
    function( Point ) {
		function Motion( velocityX, velocityY, damping ) {
			this.velocity = new Point( velocityX, velocityY );
			this.damping = damping;
		}
        return Motion;
    }
);