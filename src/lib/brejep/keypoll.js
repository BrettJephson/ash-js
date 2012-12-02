(function(global) {
    var keys = {};
        
    function addListeners() {
        global.addEventListener( "keydown", onKeyDown );
        global.addEventListener( "keyup", onKeyUp );
    }
    
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
    
    function init() {
        addListeners();
    }
    
    var keypoll = {
        VERSION : "0.1.0",
        initialise : function() {
            init();
            return this;  
        },
        getKeys : function() {
            return keys;
        },
        isDown : function( testKey ) {
            for( var keyCode in keys ) {
                if( keyCode == testKey ) {
                    return true;
                }
            }
            return false;
        },
        up : "38",
        down : "40",
        left : "37",
        right : "39",
        fire : "32"
    };
    
    //exports to multiple environments
    if(typeof define === 'function' && define.amd){ //AMD
        define( "brejep/keypoll", keypoll );
    } else if (typeof module !== 'undefined' && module.exports){ //node
        module.exports = keypoll;
    } else { //browser
        //use string because of Google closure compiler ADVANCED_MODE
        global['keypoll'] = keypoll;
    }
}(this));