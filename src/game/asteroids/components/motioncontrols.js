define( "game/components/motioncontrols",
    [],
    function() {
        return {
            left : 0,
            right : 0,
            accelerate : 0,
            accelerationRate : 0,
            rotationRate : 0,
            initialise : function( left, right, accelerate, accelerationRate, rotationRate ) {
                this.left = left;
                this.right = right;
                this.accelerate = accelerate;
                this.accelerationRate = accelerationRate;
                this.rotationRate = rotationRate;
                return this;
            }
        }
    }
);