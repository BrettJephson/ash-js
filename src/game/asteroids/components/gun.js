define( "game/components/gun",
    [ "brejep/point" ],
    function( Point ) {
        return {
            id : "gun",
            shooting : false,
            offsetFromParent : null,
            timeSinceLastShot : 0,
            minimumShotInterval : 0,
            bulletLifetime : 0,
            initialise : function( offsetX, offsetY, minimumShotInterval, bulletLifetime ) {
                this.offsetFromParent = Object.create( Point ).initialise( offsetX, offsetY );
                this.minimumShotInterval = minimumShotInterval;
                this.bulletLifetime = bulletLifetime;
                return this;
            }
        }
    }
);