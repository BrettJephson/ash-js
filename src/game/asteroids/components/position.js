define( "game/components/position",
    [ "brejep/point" ],
    function( Point ) {
		function Position(x, y, rotation, collisionRadius) {
			this.position = new Point( x, y );
			this.rotation = rotation;
			this.collisionRadius = collisionRadius;
		}
        return Position;
    }
);