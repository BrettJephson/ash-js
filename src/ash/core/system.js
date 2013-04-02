/**
 * Ash-js System
 */
define([
    'brejep/class'
], function (Class) {
    'use strict';

    var System = Class.extend({
        previous: null, /* System */
        next: null, /* System */
        priority: 0,

        constructor: function () { },

        addToEngine: function (engine) {
            /* Left deliberately blank */
        },

        removeFromEngine: function (engine) {
            /* Left deliberately blank */
        },

        update: function (time) {
            /* Left deliberately blank */
        },

        is: function (type) {
            return type.prototype.isPrototypeOf(this);
        }
    });

    return System;
});
