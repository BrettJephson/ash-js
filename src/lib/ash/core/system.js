define( "ash/system",
    function() {
        return {
            previous : null, /* System */
            next : null, /* System */
            priority : 0,
            addToGame : function( game ) {
                
            },
            removeFromGame : function( game ) {
                
            },
            update : function( time ) {
                
            },
            is : function( type ) {
                return this._type === type;
            }
        };
    }
);