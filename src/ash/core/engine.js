/**
 * Ash-js engine
 *
 */
define([
    'ash-core/componentmatchingfamily',
    'ash-core/entitylist',
    'ash-core/systemlist',
    'signals',
    'brejep/dictionary',
    'brejep/class'
], function (ComponentMatchingFamily, EntityList, SystemList, signals, Dictionary, Class) {
    'use strict';

    var Engine = Class.extend({
        familyClass: ComponentMatchingFamily,
        families: null,
        entityList: null,
        systemList: null,
        updating: false,
        updateComplete: new signals.Signal(),

        constructor: function () {
            this.entityList = new EntityList(),
            this.systemList = new SystemList();
            this.families = new Dictionary();

            this.__defineGetter__('entities', function() {
                var tmpEntities = [];
                for( var entity = this.entityList.head; entity; entity = entity.next )
                {
                    tmpEntities.push( entity );
                }
                return tmpEntities;
            });

            this.__defineGetter__('systems', function() {
                var tmpSystems = [];
                for( var system = this.systemList.head; system; system = system.next )
                {
                    tmpSystems.push( system );
                }
                return tmpSystems;
            });
        },

        addEntity: function (entity) {
            this.entityList.add( entity );
            entity.componentAdded.add( this.componentAdded, this );
            this.families.forEach( function( nodeObject, family ) {
                family.newEntity( entity );
            });
        },

        removeEntity: function (entity) {
            entity.componentAdded.remove( this.componentAdded, this );
            this.families.forEach( function( nodeObject, family ) {
                family.removeEntity( entity );
            });
            this.entityList.remove( entity );
        },

        removeAllEntities: function () {
            while( this.entityList.head ) {
                this.removeEntity( this.entityList.head );
            }
        },

        componentAdded: function (entity, componentClass) {
            this.families.forEach( function( nodeObject, family ) {
                family.componentAddedToEntity( entity, componentClass );
            });
        },

        getNodeList: function (nodeObject) {
            if( this.families.has( nodeObject ) ) {
                return this.families.retrieve( nodeObject ).nodes;
            }
            var family = new this.familyClass( nodeObject, this );
            this.families.add( nodeObject, family );
            for( var entity = this.entityList.head; entity; entity = entity.next ) {
                family.newEntity( entity );
            }
            return family.nodes;
        },

        releaseNodeList : function( nodeObject ) {
            if( this.families.has( nodeObject ) ) {
                this.families.retrieve( nodeObject ).cleanUp();
            }
            this.families.remove( nodeObject );
        },

        addSystem : function( system, priority ) {
            system.priority = priority;
            system.addToEngine( this );
            this.systemList.add( system );
        },

        getSystem : function( type ) {
            return this.systemList.get( type );
        },

        removeSystem : function( system ) {
            this.systemList.remove( system );
            system.removeFromEngine( this );
        },

        removeAllSystems : function() {
            while( this.systemList.head ) {
               this.removeSystem( this.systemList.head );
            }
        },

        update : function( time ) {
            this.updating = true;
            for( var system = this.systemList.head; system; system = system.next ) {
                system.update( time );
            }
            this.updating = false;
            this.updateComplete.dispatch();
        }
    });

    return Engine;
});
