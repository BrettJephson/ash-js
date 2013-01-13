define( "game/nodes/render",
    [ "ash/node", "game/components/position", "game/components/display" ],
    function( Node, Position, Display ) {
        function Render() {
			Object.extend( Render.prototype, Node.prototype );
		}
		Render.prototype.position = Position;
		Render.prototype.display = Display;
		Render.prototype.types = {
			position : Position,
			display : Display
		};
		return Render;
    }
);