(function( root, factory ) {
    // We want the object to work with or without AMD
    if( typeof define === 'function' && define.amd ) {
        define('brejep/dictionary', factory );
    } else {
        // If not using AMD, references to dependencies must be available on the root object
        if( typeof root.brejep === 'undefined') {
            root.brejep = {};
        }
        root.brejep.dictionary = factory();
    }
} ( this, function() {
    "use strict";
    function Dictionary() {
        this.initialise();
    }
    var api = Dictionary.prototype;
    api.VERSION = "0.1.0";
    api.keys = null;
    api.values = null;
    api.initialise = function() {
        this.keys = [];
        this.values = [];
        return this;
    };
    api.add = function( key, value ) {
        var keyIndex = this.getIndex( key );
        if( keyIndex >= 0 ) {
            this.values[keyIndex] = value;
        } else {
            this.keys.push( key );
            this.values.push( value );
        }
    };
    api.remove = function( key ) {
        var keyIndex = this.getIndex( key );
        if( keyIndex >= 0 ) {
            this.keys.splice( keyIndex, 1 );
            this.values.splice( keyIndex, 1 );
        } else {
            throw "Key does not exist";
        }
    };
    api.retrieve = function( key ) {
        var value = null;
        var keyIndex = this.getIndex( key );
        if( keyIndex >= 0 ) {
            value = this.values[ keyIndex ];
        }
        return value;
    };
    api.getIndex = function( testKey ) {
        var i = 0,
            len = this.keys.length,
            key;
        for( ; i<len; ++i ){
            key = this.keys[i];
            if( key == testKey ) {
                return i;
            }
        }
        return -1;
    };
    api.has = function( testKey ) {
        var i = 0,
            len = this.keys.length,
            key;
        for( ; i<len; ++i ){
            key = this.keys[i];
            if( key == testKey ) {
                return true;
            }
        }
        return false;
    };
    api.forEach = function( action ) {
        var i = 0,
            len = this.keys.length,
            key, 
            value;
        
        for( ; i<len; ++i ) {
            key = this.keys[i];
            value = this.values[i];
            var breakHere = action( key, value );
            if( breakHere == "return" ) {
                return false;
            }
        }
        return true;
    };  
    return Dictionary;
}));