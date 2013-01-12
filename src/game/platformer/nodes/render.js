define( "game/nodes/render",
    [ "game/components/position", "game/components/display" ],
    function( Position, Display ) {
		function Render() {}
		Render.prototype.position = null;
		Render.prototype.display = null;
		Render.prototype.types = {
			position : Position,
			display : Display
		};
        return Render;
    }
);