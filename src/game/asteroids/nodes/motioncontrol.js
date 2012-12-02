define( "game/nodes/motioncontrol",
    [ "game/components/motioncontrols", "game/components/position", "game/components/motion" ],
    function( MotionControls, Position, Motion ) {
        return {
            control : null,
            position : null,
            motion : null,
            types : {
                control : MotionControls,
                position : Position,
                motion : Motion
            }
        };
    }
);