define( "game/components/gamestate",
    function() {
        return {
            lives : 0,
            level : 0,
            points : 0,
            width : 0,
            height : 0,
            id : "gamestate",
            initialise : function( width, height ) {
                this.width = width;
                this.height = height;
                return this;
            }
        };
    }
);