define( "game/nodes/bulletage",
    [ "game/components/bullet" ],
    function( Bullet ) {
        return {
            bullet : null,
            types : {
                bullet : Bullet
            }
        };
    }
);