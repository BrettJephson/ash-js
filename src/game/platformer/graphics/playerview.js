define( "game/graphics/playerview",
    [],
    function() {
		function PlayerView( graphics ) {
			this.initialise( graphics );
		}
		var api = PlayerView.prototype;
		api.graphics = null;
        api.x = 0;
        api.y = 0;
		api.width = 5;
		api.height = 15;
		api.initialise = function( graphics ) {
			this.graphics = graphics;
			this.draw();
			return this;
		};
		api.draw = function() {
			var graphics = this.graphics;
			
			graphics.save();
			graphics.beginPath();
			graphics.fillStyle = "#ff0000";
			graphics.fillRect( this.x, this.y, this.width, this.height );
			
			graphics.restore();
		};
        return PlayerView;
    }
);