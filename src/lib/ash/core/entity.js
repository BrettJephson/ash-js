/**
 * Ash-js Entity
 */
(function( root, factory ) {
    // We want the object to work with or without AMD
    if( typeof define === 'function' && define.amd ) {
           define('ash/entity', [ "libs/signals", "brejep/dictionary" ], factory );
    } else {
        // If not using AMD, references to dependencies must be available on the root object
        if( typeof root.ash === 'undefined') {
            root.ash = {};
        }
        root.ash.entity = factory( root.signals, root.Dictionary );
    }
} ( this, function( signals, Dictionary ) {
    "use strict";
	function Entity() {
		this.initialise();
	}
	var api = Entity.prototype;
	api.componentAdded = new signals.Signal();
	api.componentRemoved = new signals.Signal();
	api.previous = null; /* Entity */
	api.next = null; /* Entity */
	api.components = null;
	api.initialise = function()  {
		this.components = new Dictionary();
		return this;
	};
	api.add = function( component, componentObject ) {
		componentObject = componentObject || component.constructor;
		componentObject = componentObject.prototype;
		if ( this.components.has( componentObject ) ) {
			this.remove( componentObject );
		}
		this.components.add( componentObject, component );
		this.componentAdded.dispatch( this, componentObject );
		return this;
	};
	api.remove = function( componentObject ) {
		componentObject = componentObject.prototype;
		var component = this.components.retrieve( componentObject );
		if ( component ) {
			this.components.remove( componentObject );
			this.componentRemoved.dispatch( this, componentObject );
			return component;
		}
		return null;
	};
	api.get = function( componentObject ) {
		return this.components.retrieve( componentObject.prototype );
	};
	/**
	 * Get all components from the entity.
	 * @return {Array} Contains all the components on the entity
	 */
	api.getAll = function() {
		var componentArray = [];
		this.components.forEach(function( componentObject, component ) {
			componentArray.push(component);
		});
		return componentArray;
	};
	api.has = function( componentObject ) {
		return this.components.has( componentObject.prototype );
	};
	api.clone = function() {
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
	};
    return Entity;
}));