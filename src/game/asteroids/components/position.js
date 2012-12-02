define( "game/components/position",
    [ "brejep/point" ],
    function( Point ) {
        return {
            position : null /* Point */,
            rotation : 0,
            collisionRadius : 0,
            initialise : function( x, y, rotation, collisionRadius ) {
                this.position = Object.create( Point ).initialise( x, y );
                this.rotation = rotation;
                this.collisionRadius = collisionRadius;
                return this;
            }
        }
    }
);