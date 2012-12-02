define( "game/components/guncontrols",
    [],
    function() {
        return {
            id : "guncontrols",
            trigger : 0,
            initialise : function( trigger ) {
                this.trigger = trigger;
                return this;
            }
        }
    }
);