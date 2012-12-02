define( "game/nodes/guncontrol",
    [ "game/components/guncontrols", "game/components/gun", "game/components/position" ],
    function( GunControls, Gun, Position ) {
        return {
            control : null,
            gun : null,
            position : null,
            types : {
                control : GunControls,
                gun : Gun,
                position : Position
            }
        };
    }
);