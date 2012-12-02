(function(global) {
    var point = {
        VERSION : "0.1.0",
        x:0,
        y:0,
        initialise : function( x, y ) {
            this.x = x;
            this.y = y;
            return this;  
        },
        distanceSquaredTo : function( targetPoint ) {
            var dx = this.x - targetPoint.x,
                dy = this.y - targetPoint.y;
            return dx * dx + dy * dy;
        },
        distanceTo: function( targetPoint ) {
            var dx = this.x - targetPoint.x,
                dy = this.y - targetPoint.y;
            return Math.sqrt( dx * dx + dy * dy );
        }
    };
    //exports to multiple environments
    if(typeof define === 'function' && define.amd){ //AMD
        define( "brejep/point", point );
    } else if (typeof module !== 'undefined' && module.exports){ //node
        module.exports = point;
    } else { //browser
        //use string because of Google closure compiler ADVANCED_MODE
        global['point'] = point;
    }
}(this));