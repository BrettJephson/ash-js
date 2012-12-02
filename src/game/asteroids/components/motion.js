define( "game/components/motion",
    [ "brejep/point" ],
    function( Point ) {
        return {
            velocity : null,
            angularVelocity : 0,
            damping : 0,
            initialise : function( velocityX, velocityY, angularVelocity, damping ) {
                this.velocity = Object.create( Point ).initialise( velocityX, velocityY );
                this.angularVelocity = angularVelocity;
                this.damping = damping;
                return this;
            }
        }
    }
);