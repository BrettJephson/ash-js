define( "game/graphics/spaceshipview",
    [],
    function() {
        function SpaceshipView( graphics ) {
			this.initialise( graphics );
		}
		var api = SpaceshipView.prototype;
		api.x = 0;
		api.y = 0;
		api.width = 20;
		api.height = 20;
		api.rotation = 0;
		api.graphics = null;
		api.initialise = function( graphics ) {
			this.graphics = graphics;
			this.draw();
			return this;
		};
		api.draw = function() {
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
		};
		return SpaceshipView;
    }
);