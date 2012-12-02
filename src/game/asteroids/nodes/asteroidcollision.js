define( "game/nodes/asteroidcollision",
    [ "game/components/asteroid", "game/components/position" ],
    function( Asteroid, Position ) {
        return {
            asteroid : null,
            position: null,
            types : {
                asteroid : Asteroid,
                position : Position
            }
        };
    }
);