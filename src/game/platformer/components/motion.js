define( "game/components/motion",
    [ "brejep/point" ],
    function( Point ) {
        return {
            velocity : null,
            damping : 0,
            initialise : function( velocityX, velocityY, damping ) {
                this.velocity = Object.create( Point ).initialise( velocityX, velocityY );
                this.damping = damping;
                return this;
            }
        };
    }
);