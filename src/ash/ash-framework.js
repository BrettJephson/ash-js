/**
 * Ash framework core
 */
define(function (require) {
    var core = {
        version: '0.1.0'
    };

    core.engine = require('ash-core/engine');
    core.componentmatchingfamily = require('ash-core/componentmatchingfamily');
    core.entity = require('ash-core/entity');

    return core;
});
