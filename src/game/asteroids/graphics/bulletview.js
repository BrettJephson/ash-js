define( "game/graphics/bulletview",
    [],
    function() {
		function BulletView( graphics ) {
			this.initialise( graphics );
		}
		var api = BulletView.prototype;
		api.x = 0;
		api.y = 0;
		api.width = 4;
		api.height = 4;
		api.rotation = 0;
		api.graphics = null;
		api.initialise = function( graphics ) {
			this.graphics = graphics;
			this.draw();
			return this;
		};
		api.draw = function( ) {
			var graphics = this.graphics;
			graphics.save();
			graphics.rotate( this.rotation );
			graphics.beginPath();
			graphics.fillStyle = "#FFFFFF";
			graphics.arc( this.x, this.y, 2, 0, Math.PI*2, false );
			graphics.fill();
			graphics.restore();
		};
        return BulletView;
    }
);