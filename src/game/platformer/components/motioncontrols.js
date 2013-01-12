define( "game/components/motioncontrols",
    [],
    function() {
		function MotionControls( left, right, accelerationRate ) {
			this.left = left;
			this.right = right;
			this.accelerationRate = accelerationRate;
		}
        return MotionControls;
    }
);