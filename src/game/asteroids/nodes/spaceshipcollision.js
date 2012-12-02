define( "game/nodes/spaceshipcollision",
    [ "game/components/spaceship", "game/components/position" ],
    function( Spaceship, Position ) {
        return {
            spaceship : null,
            position : null,
            types : {
                spaceship : Spaceship,
                position : Position
            }
        };
    }
);