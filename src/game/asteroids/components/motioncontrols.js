define( "game/components/motioncontrols",
    function() {
		function MotionControls( left, right, accelerate, accelerationRate, rotationRate ) {
			this.left = left;
			this.right = right;
			this.accelerate = accelerate;
			this.accelerationRate = accelerationRate;
			this.rotationRate = rotationRate;
		}
        return MotionControls;
    }
);