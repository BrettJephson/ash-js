(function(global) {
    // Poly fills for Object creation and extension
    function fixObjectCreate() {
        if( typeof Object.create !== "function" ) {
            Object.create = function ( obj ) {
                function F() {}
                F.prototype = obj;
                return new F();
            };
        }
    }

    function fixObjectExtend() {
        if( typeof Object.extend !== "function" ) {
            Object.extend = function( destination, source ) {
                for (var property in source) {
                    if(!destination.hasOwnProperty(property) && source.hasOwnProperty(property) ) {
                        destination[property] = source[property];
                    }
                }
                return destination;
            }
        }
    }
    
    function fixObjectDeepExtend() {
        if( typeof Object.deepExtend !== "function" ) {
            Object.deepExtend = function(destination, source) {
                for (var property in source) {
                    if (source[property] && source[property].constructor &&
                        source[property].constructor === Object) {
                        destination[property] = destination[property] || {};
                        arguments.callee(destination[property], source[property]);
                    } else {
                        destination[property] = source[property];
                    }
                }
                return destination;
            };
        }
    }

    // Polyfill for requestAnimationFrame
    function fixRequestAnimationFrame() {
        var requestAnimationFrame = global.requestAnimationFrame || 
                                    global.mozRequestAnimationFrame ||  
                                    global.webkitRequestAnimationFrame || 
                                    global.msRequestAnimationFrame ||
                                    function( /* function */ callback, /* DOMElement */ element ){
                                        return global.setTimeout( callback, 1000 / 60 );
                                    };
        global.requestAnimationFrame = requestAnimationFrame;
            
        var cancelRequestAnimationFrame = global.cancelAnimationFrame || 
                                    global.webkitCancelRequestAnimationFrame ||
                                    global.mozCancelRequestAnimationFrame ||
                                    global.oCancelRequestAnimationFrame ||
                                    global.msCancelRequestAnimationFrame ||
                                    global.clearTimeout;
        global.cancelRequestAnimationFrame = cancelRequestAnimationFrame;
    }
    
    // Keyboard key codes
    function addKeyboardCodeEnum() {
        global.Keyboard = {
            BACKSPACE: 8,
            TAB: 9,
            ENTER: 13,
            SHIFT: 16,
            CONTROL: 17,
            CAPSLOCK: 20,
            ESCAPE: 27,
            SPACEBAR: 32,
            PAGE_UP: 33,
            PAGE_DOWN: 34,
            END: 35,
            HOME: 36,
            LEFT: 37,
            UP: 38,
            RIGHT: 39,
            DOWN: 40,
            INSERT: 45,
            DELETE: 46,
            NUMLOCK: 144,
            SCROLL_LOCK: 145,
            PAUSE_BREAK: 19,
            
            ZERO: 48,
            ONE: 49,
            TWO: 50,
            THREE: 51,
            FOUR: 52,
            FIVE: 53,
            SIX: 54,
            SEVEN: 55,
            EIGHT: 56,
            NINE: 57,
            
            A: 65,
            B: 66,
            C: 67,
            D: 68,
            E: 69,
            F: 70,
            G: 71,
            H: 72,
            I: 73,
            J: 74,
            K: 75,
            L: 76,
            M: 77,
            N: 78,
            O: 79,
            P: 80,
            Q: 81,
            R: 82, 
            S: 83,
            T: 84,
            U: 85,
            V: 86,
            W: 87,
            X: 88,
            Y: 89,
            Z: 90,
            
            NUMPAD_ZERO: 96,
            NUMPAD_ONE: 97,
            NUMPAD_TWO: 98,
            NUMPAD_THREE: 99,
            NUMPAD_FOUR: 100,
            NUMPAD_FIVE: 101,
            NUMPAD_SIX: 102,
            NUMPAD_SEVEN: 103,
            NUMPAD_EIGHT: 104,
            NUMPAD_NINE: 105,
            NUMPAD_MULTIPLY: 106,
            NUMPAD_ADD: 107,
            NUMPAD_ENTER: 13,
            NUMPAD_SUBTRACT: 109,
            NUMPAD_DECIMAL: 110,
            NUMPAD_DIVIDE: 111
        };
    }

    function addTestHelpers() {
        function hasItems( testArray, items ) {
            var testCount = items.length;
            for( var i = 0; i<testArray.length; ++i ){
                for( var j = 0; j<items.length; ++j ) {
                    if( testArray[i] == items[j] ) {
                        testCount--;
                    }
                }
            }
            return testCount === 0;
        }
        window['hasItems'] = hasItems;
    }

    global.TEST_ENV = 0;
    global.STAGE_ENV = 1;
    global.LIVE_ENV = 2;

    var fillsnfixes = {
        VERSION : '0.1.0',
        initialise : function(env) {
            fixObjectCreate();
            fixObjectExtend();
            fixObjectDeepExtend();
            fixRequestAnimationFrame();
            addKeyboardCodeEnum();
            if(env == TEST_ENV )
            {
                addTestHelpers();
            }
        }
    };
    
    //exports to multiple environments
    if(typeof define === 'function' && define.amd){ //AMD
        define( "brejep/fillsnfixes", fillsnfixes );
    } else if (typeof module !== 'undefined' && module.exports){ //node
        module.exports = fillsnfixes;
    } else { //browser
        //use string because of Google closure compiler ADVANCED_MODE
        global['fillsnfixes'] = fillsnfixes;
    }
}(this));