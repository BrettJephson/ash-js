define( "game/nodes/movement",
    [ "game/components/position", "game/components/motion" ],
    function( Position, Motion ) {
        return {
            position : null,
            motion : null,
            types : {
                position : Position,
                motion : Motion
            }
        };
    }
);