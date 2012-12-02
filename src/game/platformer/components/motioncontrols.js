define( "game/components/motioncontrols",
    [],
    function() {
        return {
            left : 0,
            right : 0,
            accelerationRate : 0,
            initialise : function( left, right, accelerationRate ) {
                this.left = left;
                this.right = right;
                this.accelerationRate = accelerationRate;
                return this;
            }
        };
    }
);