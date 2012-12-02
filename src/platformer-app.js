require.config({
    baseUrl: "src",
    paths: {
        "game" : "game/platformer", /* asteroid game */
        "ash": "lib/ash/core", /* ash entity-based game engine */
        "brejep": "../../js_shared/brejep", /* dictionary, fillsnfixes, keypoll, tickprovider, point */
        "libs": "../../js_shared/lib" /* signals, require */
    }
});

require( ["brejep/fillsnfixes", "game/platformer"],
    function( Fixes, Platformer ) {
        "use strict";
        
        var CANVAS_WIDTH = 800,
            CANVAS_HEIGHT = 600;
            
        // Game initialisation
        
        function initialise() {
            // some polyfills and additions to base javascript classes
            Fixes.initialise();
            
            var canvasElem = createCanvas();
            document.getElementById( "game_wrapper" ).appendChild( canvasElem );
            
            var platformer = Object.create(Platformer);
            platformer.initialise( canvasElem );
            platformer.start();
        }
        
        function createCanvas() {
            var canvasElem = document.createElement( "canvas" );
            canvasElem.setAttribute( "id", "game_stage" );
            canvasElem.setAttribute( "width", CANVAS_WIDTH );
            canvasElem.setAttribute( "height", CANVAS_HEIGHT );
            canvasElem.style.backgroundColor = "#cfcfcf";
            return canvasElem;
        }
        
        window.onload = initialise;
    }
);