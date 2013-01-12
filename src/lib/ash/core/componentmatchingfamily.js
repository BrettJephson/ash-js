/**
 * @author Brett Jephson
 */
(function( root, factory ) {
    // We want the object to work with or without AMD
    if( typeof define === 'function' && define.amd ) {
        define(
            'ash/componentmatchingfamily',
            ['ash/family', 'ash/nodepool', 'ash/nodelist', 'brejep/dictionary'],
            factory
        );
    } else {
        // If not using AMD, references to dependencies must be available on the root object
        if( typeof root.ash === 'undefined') {
            root.ash = {};
        }
        root.ash.componentmatchingfamily = factory( root.ash.family, root.ash.nodepool, root.ash.nodelist, root.brejep.dictionary );
    }
}( this, function( Family, NodePool, NodeList, Dictionary) {
	function ComponentMatchingFamily( nodeClass, engine ) {	
		Object.extend( ComponentMatchingFamily.prototype, Family.prototype );
		this.nodeClass = nodeClass;
		this.engine = engine;
		this.initialise(); 
	}
	
	var api = ComponentMatchingFamily.prototype;
	api.nodeClass = null;
	api.engine = null;
	api.nodes = null;
	api.entities = null;
	api.components = null;
	api.nodePool = null;
	api.__defineGetter__("nodeList", function() {
		return this.nodes;
	});
	api.initialise = function() {
		var nodeClass = this.nodeClass;
		
		var nodePool = this.nodePool = new NodePool( nodeClass );
		this.nodes = new NodeList();
		this.entities = new Dictionary();
		this.components = new Dictionary();
		
		nodePool.dispose( nodePool.get() );
		
		nodeClassProto = nodeClass.prototype;
		for( var property in nodeClassProto ) {
			if( nodeClassProto.hasOwnProperty( property ) && property != "types" ) {
				var componentObject = nodeClassProto["types"][property];
				this.components.add( componentObject, property );
			}
		}
		
		return this;
	};
	api.newEntity = function( entity ) {
		this.addIfMatch( entity );
	};
	api.componentAddedToEntity = function( entity, componentClass ) {
		this.addIfMatch( entity );
	};
	api.componentRemovedFromEntity = function( entity, componentClass ) {
		if( this.components.has( componentClass ) ) {
			this.removeIfMatch( entity );
		}
	};
	api.removeEntity = function( entity ) {
		this.removeIfMatch( entity );
	};
	api.cleanUp = function() {
		for( var node = this.nodes.head; node; node = node.next ) {
			delete this.entities.retrieve( node.entity );
		}
		this.nodes.removeAll();
	};
	api.addIfMatch = function( entity ) {
		if( !this.entities.has( entity ) )
		{
			var componentClass;
			if(
				!this.components.forEach( function( componentClass, componentName ) {
					if( !entity.has( componentClass ) ) {
						return "return";
					}
				} )
			) { return; }
			var node = this.nodePool.get();
			node.entity = entity;
			this.components.forEach( function( componentClass, componentName ) {
				node[componentName] = entity.get( componentClass );
			} );
			this.entities.add(entity, node);
			entity.componentRemoved.add( this.componentRemovedFromEntity, this );
			this.nodes.add( node );
		}
	};
	api.removeIfMatch = function( entity ) {
		var entities = this.entities,	
			nodes = this.nodes,
			engine = this.engine,
			nodePool = this.nodePool;
			
		if( entities.has( entity ) )
		{
			var node = entities.retrieve( entity );
			entity.componentRemoved.remove( this.componentRemovedFromEntity, this );
			entities.remove( entity );
			nodes.remove( node );
			if( engine.updating )
			{
				nodePool.cache( node );
				engine.updateComplete.add( this.releaseNodePoolCache, this );
			}
			else
			{
				nodePool.dispose( node );
			}
		}
	};
	api.releaseNodePoolCache = function() {
		this.engine.updateComplete.remove( this.releaseNodePoolCache );
		this.nodePool.releaseCache();
	};

	return ComponentMatchingFamily
}));