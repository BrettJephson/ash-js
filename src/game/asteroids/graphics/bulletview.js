define( "game/graphics/bulletview",
    [],
    function() {
        return {
            x : 0,
            y : 0,
            width : 4,
            height : 4,
            rotation : 0,
            graphics : null,
            initialise : function( graphics ) {
                this.graphics = graphics;
                this.draw();
                return this;
            },
            draw : function( ) {
                var graphics = this.graphics;
                
                graphics.save();
                graphics.rotate( this.rotation );
                graphics.beginPath();
                graphics.fillStyle =  "#FFFFFF";
                graphics.arc( this.x, this.y, 2, 0, Math.PI*2, false );
                graphics.fill();
                graphics.restore();
            }
        };
    }
);