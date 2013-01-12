define( "game/nodes/motioncontrol",
    [ "game/components/motioncontrols", "game/components/motion" ],
    function( MotionControls, Motion ) {
		function MotionControl() {}
		MotionControl.prototype.control = null;
		MotionControl.prototype.motion = null;
		MotionControl.prototype.types = {
			control : MotionControls,
			motion : Motion
		};
        return MotionControl;
    }
);