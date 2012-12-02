define( "game/nodes/render",
    [ "game/components/position", "game/components/display" ],
    function( Position, Display ) {
        return {
            position : Position,
            display : Display,
            types : {
                position : Position,
                display : Display
            }
        };
    }
);