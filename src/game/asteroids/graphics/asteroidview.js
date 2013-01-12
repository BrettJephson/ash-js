define( "game/graphics/asteroidview",
    [],
    function() {
		function AsteroidView( radius, graphics ) {
			this.initialise( radius, graphics );
		}
		var api = AsteroidView.prototype;
		api.x = 0;
        api.y = 0;
		api.width = 0;
		api.height = 0;
		api.rotation = 0;
		api.graphics = null;
		api.radius = 0;
		api.points = null;
		api.initialise = function( radius, graphics ) {
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
		};
		api.draw = function() {
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
		};
        return AsteroidView;
    }
);