/**
 * Ash framework core
 */
define(function (require) {
    var core = {
        VERSION: '0.1.0'
    };

    core.engine = require('ash-core/engine');
    core.componentmatchingfamily = require('ash-core/componentmatchingfamily');
    core.entity = require('ash-core/entity');
    core.entitylist = require('ash-core/entitylist');
    core.family = require('ash-core/family');
    core.node = require('ash-core/node');
    core.nodelist = require('ash-core/nodelist');
    core.nodepool = require('ash-core/nodepool');
    core.system = require('ash-core/system');
    core.systemlist = require('ash-core/systemlist');

    return core;
});
