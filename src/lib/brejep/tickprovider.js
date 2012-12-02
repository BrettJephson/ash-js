define(
    "brejep/tickprovider",
    ['libs/signals'],
    function( signals ) {
        return {
            previousTime : 0,
            ticked : new signals.Signal(),
            request : null,
            start : function() {
                this.previousTime = Date.now();
                this.request = requestAnimationFrame( this.tick.bind( this ) );
            },
            stop : function() {
                cancelRequestAnimationFrame( this.request );
            },
            add : function( listener, context ) {
                this.ticked.add( listener, context );
            },
            remove : function( listener, context ) {
                this.ticked.remove( listener, context );
            },
            tick : function( timestamp ) {
                timestamp = timestamp || Date.now();
                var tmp = this.previousTime;
                this.previousTime = timestamp;
                var delta = ( timestamp - tmp ) * 0.001;
                this.ticked.dispatch( delta );
                requestAnimationFrame( this.tick.bind( this ) );
            }
        };
    }
);