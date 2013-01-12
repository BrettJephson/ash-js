define( "game/components/position",
    [ "brejep/point" ],
    function( Point ) {
		function Position( x, y ) {
			this.position = new Point( x, y );
		}
        return Position;
    }
);