define( "game/components/display",
    [],
    function() {
        return {
            id : "display",
            graphic : null,
            initialise : function( graphic ) {
                this.graphic = graphic;
                return this;
            }
        }
    }
);