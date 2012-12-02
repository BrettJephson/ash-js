define( "game/graphics/asteroidview",
    [],
    function() {
        return {
            x : 0,
            y : 0,
            width : 0,
            height : 0,
            rotation : 0,
            graphics : null,
            radius : 0,
            points : null,
            initialise : function( radius, graphics ) {
                this.graphics = graphics;
                this.radius = radius;
                this.width = radius;
                this.height = radius;
                this.points = [];
                var angle = 0;
                while( angle < Math.PI * 2 ){
                    var length = ( 0.75 + Math.random() * 0.25 ) * this.radius;
                    var posX  = Math.cos( angle ) * length;
                    var posY  = Math.sin( angle ) * length;
                    this.points.push({x: posX, y: posY});
                    angle += Math.random() * 0.5;
                }
                this.draw();
                return this;
            },
            draw : function() {
                var graphics = this.graphics;
                
                graphics.save();
                graphics.beginPath();
                graphics.translate( this.x, this.y );
                graphics.rotate( this.rotation );
                graphics.fillStyle = "#FFFFFF";
                graphics.moveTo( this.radius, 0 );
                for( var i = 0; i<this.points.length; ++i){
                    graphics.lineTo( this.points[i].x, this.points[i].y );
                }
                graphics.lineTo( this.radius, 0 );
                graphics.fill();
                graphics.restore();
            }
        };
    }
);