define( "game/nodes/player",
    [ "game/components/player", "game/components/position" ],
    function( Player, Position ) {
        return {
            player : null,
            position : null,
            types : {
                player : Player,
                position : Position
            }
        };
    }
);