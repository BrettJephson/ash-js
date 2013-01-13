define( "game/nodes/motioncontrol",
    [ "ash/node", "game/components/motioncontrols", "game/components/position", "game/components/motion" ],
    function( Node, MotionControls, Position, Motion ) {
        function MotionControl() {
			Object.extend( MotionControl.prototype, Node.prototype );
		};
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