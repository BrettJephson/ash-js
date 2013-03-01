/**
 * Ash-js engine
 *
 */
define([
    'ash-core/componentmatchingfamily',
    'ash-core/entitylist',
    'ash-core/systemlist',
    'signals',
    'brejep/dictionary'
], function (ComponentMatchingFamily, EntityList, SystemList, signals, Dictionary) {
    'use strict';

    var Engine = function () {
        this.initialise();
    }

    var api = Engine.prototype;
    api.initialise = function() {
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

        return this;
    };
    api.familyClass = ComponentMatchingFamily;
    api.families = null;
    api.entityList = null;
    api.systemList = null;
    api.updating = false;
    api.updateComplete = new signals.Signal();
    api.addEntity = function( entity ) {
        this.entityList.add( entity );
        entity.componentAdded.add( this.componentAdded, this );
        this.families.forEach( function( nodeObject, family ) {
            family.newEntity( entity );
        } );
    };
    api.removeEntity = function( entity ) {
        entity.componentAdded.remove( this.componentAdded, this );
        this.families.forEach( function( nodeObject, family ) {
            family.removeEntity( entity );
        });
        this.entityList.remove( entity );
    };
    api.removeAllEntities = function() {
        while( this.entityList.head ) {
            this.removeEntity( this.entityList.head );
        }
    };
    api.componentAdded = function( entity, componentClass ) {
        this.families.forEach( function( nodeObject, family ) {
            family.componentAddedToEntity( entity, componentClass );
        });
    };
    api.getNodeList = function( nodeObject ) {
        if( this.families.has( nodeObject ) ) {
            return this.families.retrieve( nodeObject ).nodes;
        }
        var family = new this.familyClass( nodeObject, this );
        this.families.add( nodeObject, family );
        for( var entity = this.entityList.head; entity; entity = entity.next ) {
            family.newEntity( entity );
        }
        return family.nodes;
    };
    api.releaseNodeList = function( nodeObject ) {
        if( this.families.has( nodeObject ) ) {
            this.families.retrieve( nodeObject ).cleanUp();
        }
        this.families.remove( nodeObject );
    };
    api.addSystem = function( system, priority ) {
        system.priority = priority;
        system.addToEngine( this );
        this.systemList.add( system );
    };
    api.getSystem = function( type ) {
        return this.systemList.get( type );
    };
    api.removeSystem = function( system ) {
        this.systemList.remove( system );
        system.removeFromEngine( this );
    };
    api.removeAllSystems = function() {
        while( this.systemList.head ) {
           this.removeSystem( this.systemList.head );
        }
    };
    api.update = function( time ) {
        this.updating = true;
        for( var system = this.systemList.head; system; system = system.next ) {
            system.update( time );
        }
        this.updating = false;
        this.updateComplete.dispatch();
    };

    return Engine;
});
