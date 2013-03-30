/**
 * Ash-js Entity
 *
 */
define([
    'signals',
    'brejep/dictionary',
    'brejep/class'
], function (signals, Dictionary, Class) {
    'use strict';

    var Entity = Class.extend({
        previous:null, /* Entity */
        next: null, /* Entity */
        components: null,
        
        constructor: function ()  {
            this.components = new Dictionary();
            this.componentAdded = new signals.Signal();
            this.componentRemoved = new signals.Signal();
        },
        
        add: function (component, componentObject) {
            componentObject = componentObject || component.constructor;
            componentObject = componentObject.prototype;
            
            if ( this.components.has( componentObject ) ) {
                this.remove( componentObject );
            }
            this.components.add(componentObject, component);
            this.componentAdded.dispatch( this, componentObject );
            return this;
        },
        
        remove: function (componentObject) {
            componentObject = componentObject.prototype;
            var component = this.components.retrieve( componentObject );
            if ( component ) {
                this.components.remove( componentObject );
                this.componentRemoved.dispatch( this, componentObject );
                return component;
            }
            return null;
        },
        
        get: function (componentObject) {
            return this.components.retrieve( componentObject.prototype );
        },
        
        /**
         * Get all components from the entity.
         * @return {Array} Contains all the components on the entity
         */
        getAll: function () {
            var componentArray = [];
            this.components.forEach(function( componentObject, component ) {
                componentArray.push(component);
            });
            return componentArray;
        },
        
        has: function (componentObject) {
            return this.components.has( componentObject.prototype );
        },
        
        clone: function () {
            var copy = new Entity();
            this.components.forEach( function( componentObject, component ) {
                var newComponent = new componentObject.constructor();
                for( var property in component ) {
                    if( component.hasOwnProperty( property ) ) {
                        newComponent[property] = component[property];
                    }
                }
                copy.add( newComponent );
            } );
            return copy;
        }
    });

    return Entity;
});
