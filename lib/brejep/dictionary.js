/**
 * Dictionary
 *
 * @author Brett Jephson
 */
define([
    'brejep/class'
], function (Class) {
    'use strict';

    var Dictionary = Class.extend({
        VERSION: '0.1.0',
        keys: null,
        values: null,

        constructor: function () {
            this.keys = [];
            this.values = [];
            return this;
        },

        add: function (key, value) {
            var keyIndex = this.getIndex(key);
            if(keyIndex >= 0) {
                this.values[keyIndex] = value;
            } else {
                this.keys.push(key);
                this.values.push(value);
            }
        },

        remove: function (key) {
            var keyIndex = this.getIndex(key);
            if(keyIndex >= 0) {
                this.keys.splice(keyIndex, 1);
                this.values.splice(keyIndex, 1);
            } else {
                throw 'Key does not exist';
            }
        },

        retrieve: function (key) {
            var value = null;
            var keyIndex = this.getIndex(key);
            if(keyIndex >= 0) {
                value = this.values[ keyIndex ];
            }
            return value;
        },

        getIndex: function (testKey) {
            var i = 0,
                len = this.keys.length,
                key;
            for(; i<len; ++i){
                key = this.keys[i];
                if(key == testKey) {
                    return i;
                }
            }
            return -1;
        },

        has: function (testKey) {
            var i = 0,
                len = this.keys.length,
                key;
            for(; i<len; ++i){
                key = this.keys[i];
                if(key == testKey) {
                    return true;
                }
            }
            return false;
        },

        forEach: function (action) {
            var i = 0,
                len = this.keys.length,
                key,
                value;

            for(; i<len; ++i) {
                key = this.keys[i];
                value = this.values[i];
                var breakHere = action(key, value);
                if (breakHere === 'return') {
                    return false;
                }
            }
            return true;
        }
    });

    return Dictionary;
});
