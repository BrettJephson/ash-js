define( "game/nodes/render",
    [ "game/components/position", "game/components/display" ],
    function( Position, Display ) {
        function Render() {}
		Render.prototype.position = Position;
		Render.prototype.display = Display;
		Render.prototype.types = {
			position : Position,
			display : Display
		};
		return Render;
    }
);