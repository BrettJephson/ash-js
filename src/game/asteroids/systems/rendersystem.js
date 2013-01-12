define( "game/systems/rendersystem",
    [ "ash/system", "game/nodes/render" ],
    function( System, RenderNode ) {
		function RenderSystem( graphicsContext ) {
			Object.extend( RenderSystem.prototype, System.prototype );
			this.initialise( graphicsContext );
		};
		var api = RenderSystem.prototype;
		api.context = null;
		api.nodes = null;
		api.initialise = function( graphicsContext ) {
			this.context = graphicsContext;
			return this;
		};
		api.addToEngine = function( engine ) {
			this.nodes = engine.getNodeList( RenderNode );
			for( var node = this.nodes.head; node; node = node.next ) {
				this.addToDisplay( node );
			}
			this.nodes.nodeAdded.add( this.addToDisplay, this );
			this.nodes.nodeRemoved.add( this.removeFromDisplay, this );
		};
		api.removeFromEngine = function( engine ) {
			this.nodes = null;
		};
		api.addToDisplay = function( node ) {
			// Intentionally left blank
		};
		api.removeFromDisplay = function( node ) {
			// Intentionally left blank
		};
		api.count = 0;
		api.update = function( time ) {
			var node,
				position,
				display,
				graphic;
				
			this.context.save();
			this.context.translate(0,0);
			this.context.rotate(0);
			this.context.clearRect( 0, 0, this.context.canvas.width, this.context.canvas.height );
			
			for( node = this.nodes.head; node; node = node.next ) {
				
				display = node.display;
				graphic = display.graphic;
				position = node.position;
				
				graphic.x = position.position.x;
				graphic.y = position.position.y;
				graphic.rotation = position.rotation;
				graphic.draw();
			}
			this.context.restore();
		};
        return RenderSystem;
    }
);