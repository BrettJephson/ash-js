define( "game/systems/rendersystem",
    [ "game/nodes/render" ],
    function( RenderNode ) {
        return {
            context : null,
            nodes : null,
            initialise : function( graphicsContext ) {
                this.context = graphicsContext;
                return this;
            },
            addToGame : function( game ) {
                this.nodes = game.getNodeList( RenderNode );
                for( var node = this.nodes.head; node; node = node.next ) {
                    this.addToDisplay( node );
                }
                this.nodes.nodeAdded.add( this.addToDisplay, this );
                this.nodes.nodeRemoved.add( this.removeFromDisplay, this );
            },
            removeFromGame : function( game ) {
                this.nodes = null;
            },
            addToDisplay : function( node ) {
                
            },
            removeFromDisplay : function( node ) {
                
            },
            update : function( time ) {
                var node,
                    position,
                    display,
                    graphic;
                // clear canvas
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
                    graphic.draw();
                }
                this.context.restore();
            }
        };
    }
);