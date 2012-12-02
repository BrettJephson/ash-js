require.config({
    baseUrl: "src",
    paths: {
        "game" : "game/asteroids", /* asteroid game */
        "ash": "lib/ash/core", /* ash entity-based game engine */
        "brejep": "lib/brejep", /* dictionary, fillsnfixes, keypoll, tickprovider, point */
        "libs": "lib/vendor" /* signals, require */
    }
});

require( ["brejep/fillsnfixes", "game/asteroids"],
    function( Fixes, Asteroids ) {
        "use strict";
        
        var CANVAS_WIDTH = 800,
            CANVAS_HEIGHT = 600;
            
        // Game initialisation
        
        function initialise() {
            // some polyfills and additions to base javascript classes
            Fixes.initialise();
            
            var canvasElem = createCanvas();
            document.getElementById( "game_wrapper" ).appendChild( canvasElem );
            
            var asteroids = Object.create(Asteroids);
            asteroids.initialise( canvasElem );
            asteroids.start();
        }
        
        function createCanvas() {
            var canvasElem = document.createElement( "canvas" );
            canvasElem.setAttribute( "id", "game_stage" );
            canvasElem.setAttribute( "width", CANVAS_WIDTH );
            canvasElem.setAttribute( "height", CANVAS_HEIGHT );
            canvasElem.style.backgroundColor = "#000";
            return canvasElem;
        }
        
        window.onload = initialise;
    }
);