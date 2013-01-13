define( "game/nodes/motioncontrol",
    [ "ash/node", "game/components/motioncontrols", "game/components/motion" ],
    function( Node, MotionControls, Motion ) {
		function MotionControl() {
			Object.extend( MotionControl.prototype, Node.prototype );
		}
		MotionControl.prototype.control = null;
		MotionControl.prototype.motion = null;
		MotionControl.prototype.types = {
			control : MotionControls,
			motion : Motion
		};
        return MotionControl;
    }
);