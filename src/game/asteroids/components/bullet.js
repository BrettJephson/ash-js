define( "game/components/bullet",
    [],
    function() {
        return {
            id : "bullet",
            lifeRemaining : 0,
            initialise : function( lifeTime ) {
                this.lifeRemaining = lifeTime;
                return this;
            }
        }
    }
);