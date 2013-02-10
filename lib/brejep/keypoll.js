(function( root, factory ) {
    // We want the object to work with or without AMD
    if( typeof define === 'function' && define.amd ) {
        define('brejep/keypoll', factory );
    } else {
        // If not using AMD, references to dependencies must be available on the root object
        if( typeof root.brejep === 'undefined') {
            root.brejep = {};
        }
        root.brejep.keypoll = factory();
    }
} ( this, function() {
    var global = this;
    function KeyPoll() {
        KeyPoll.VERSION = "0.1.0";
        
        var keys = {};
        
        function onKeyDown( event ) {
            event.preventDefault();
            keys[event.keyCode] = true;
        }
            
        function onKeyUp( event ) {
            event.preventDefault();
            if( keys[event.keyCode] ) {
                keys[event.keyCode] = null;
                delete keys[event.keyCode];
            }
        }
        
        function addListeners() {
            global.addEventListener( "keydown", onKeyDown );
            global.addEventListener( "keyup", onKeyUp );
        }
        
        addListeners();
        
        this.up = "38";
        this.down = "40";
        this.left = "37";
        this.right = "39";
        this.fire = "32";
        
        this.getKeys = function() {
            return keys;
        };
        
        this.isDown = function( testKey ) {
            for( var keyCode in keys ) {
                if( keyCode == testKey ) {
                    return true;
                }
            }
            return false;
        };
    }
    return KeyPoll;
}));