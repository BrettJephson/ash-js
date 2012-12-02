define( "game/components/position",
    [ "brejep/point" ],
    function( Point ) {
        return {
            position : null /* Point */,
            initialise : function( x, y ) {
                this.position = Object.create( Point ).initialise( x, y );
                return this;
            }
        };
    }
);