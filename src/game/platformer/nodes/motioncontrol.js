define( "game/nodes/motioncontrol",
    [ "game/components/motioncontrols", "game/components/motion" ],
    function( MotionControls, Motion ) {
        return {
            control : null,
            motion : null,
            types : {
                control : MotionControls,
                motion : Motion
            }
        };
    }
);