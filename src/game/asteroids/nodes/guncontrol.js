define( "game/nodes/guncontrol",
    [ "game/components/guncontrols", "game/components/gun", "game/components/position" ],
    function( GunControls, Gun, Position ) {
		function GunControl() {}
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