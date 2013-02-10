define(
    "brejep/tickprovider",
    ['libs/signals'],
    function( signals ) {
        function TickProvider() {}
        var api = TickProvider.prototype;
        api.previousTime = 0;
        api.ticked = new signals.Signal();
        api.request = null;
        api.start = function() {
            this.request = requestAnimationFrame( this.tick.bind( this ) );
        };
        api.stop = function() {
            cancelRequestAnimationFrame( this.request );
        };
        api.add = function( listener, context ) {
            this.ticked.add( listener, context );
        };
        api.remove = function( listener, context ) {
            this.ticked.remove( listener, context );
        };
        api.tick = function( timestamp ) {
            timestamp = timestamp || Date.now();
            var tmp = this.previousTime || timestamp;
            this.previousTime = timestamp;
            var delta = ( timestamp - tmp ) * 0.001;
            this.ticked.dispatch( delta );
            requestAnimationFrame( this.tick.bind( this ) );
        };
        
        return TickProvider;
    }
);