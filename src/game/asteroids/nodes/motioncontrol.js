define( "game/nodes/motioncontrol",
    [ "game/components/motioncontrols", "game/components/position", "game/components/motion" ],
    function( MotionControls, Position, Motion ) {
        function MotionControl() {};
		MotionControl.prototype.control = null;
        MotionControl.prototype.position = null;
        MotionControl.prototype.motion = null;
        MotionControl.prototype.types = {
			control : MotionControls,
			position : Position,
			motion : Motion
		};
		return MotionControl;
    }
);