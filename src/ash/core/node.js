/**
 * Ash-js Node
 */
define(function () {
    'use strict';

    var Node = function () {};

    var api = Node.prototype;
    api.entity = null;
    api.previous = null;
    api.next = null;

    return Node;
});
