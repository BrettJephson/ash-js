define( "game/nodes/bulletcollision",
    [ "game/components/bullet", "game/components/position" ],
    function( Bullet, Position ) {
        return {
            bullet : null,
            position: null,
            types : {
                bullet : Bullet,
                position : Position
            }
        };
    }
);