define( "game/graphics/spaceshipview",
    [],
    function() {
        return {
            x : 0,
            y : 0,
            width : 20,
            height : 20,
            rotation : 0,
            graphics : null,
            initialise : function( graphics ) {
                this.graphics = graphics;
                this.draw();
                return this;
            },
            draw : function() {
                var graphics = this.graphics;
                
                graphics.save();
                graphics.beginPath();
                graphics.translate( this.x, this.y );
                graphics.rotate( this.rotation );
                graphics.fillStyle =  "#FFFFFF";
                graphics.moveTo( 8, 0 );
                graphics.lineTo( -7, 7 );
                graphics.lineTo( -4, 0 );
                graphics.lineTo( -7, -7 );
                graphics.lineTo( 10, 0 );
                graphics.fill();
                graphics.restore();
            }
        };
    }
);