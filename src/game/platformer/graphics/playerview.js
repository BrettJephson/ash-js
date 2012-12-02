define( "game/graphics/playerview",
    [],
    function() {
        return {
            graphics : null,
            x : 0,
            y : 0,
            width : 5,
            height : 15,
            initialise : function( graphics ) {
                this.graphics = graphics;
                this.draw();
                return this;
            },
            draw : function() {
                var graphics = this.graphics;
                
                graphics.save();
                graphics.beginPath();
                graphics.fillStyle = "#ff0000";
                graphics.fillRect( this.x, this.y, this.width, this.height );
                
                graphics.restore();
            }
        };
    }
);