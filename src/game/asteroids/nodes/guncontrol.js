define( "game/nodes/guncontrol",
    [ "ash/node", "game/components/guncontrols", "game/components/gun", "game/components/position" ],
    function( Node, GunControls, Gun, Position ) {
		function GunControl() {
			Object.extend( GunControl.prototype, Node.prototype );
		}
		GunControl.prototype.control = null;
		GunControl.prototype.gun = null;
        GunControl.prototype.position = null;
        GunControl.prototype.types = {
			control : GunControls,
			gun : Gun,
			position : Position
		};
        return GunControl;
    }
);