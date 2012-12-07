/**
 * Ash-js Family
 */
(function( root, factory ) {
    // We want the object to work with or without AMD
    if( typeof define === 'function' && define.amd ) {
        define('ash/family', [ "ash/nodelist", "ash/nodepool", "brejep/dictionary" ], factory );
    } else {
        // If not using AMD, references to dependencies must be available on the root object
        if( typeof root.ash === 'undefined') {
            root.ash = {};
        }
        root.ash.family = factory( root.ash.nodelist, root.ash.nodepool, root.Dictionary );
    }
} ( this, function( NodeList, NodePool,  Dictionary ) {
    "use strict";
    return {
        previous : null, /* Family */
        next : null, /* Family */
        nodes : null,
        entities : null,
        components : null,
        nodePool : null,
        nodeObject : null,
        game : null,
        initialise : function( nodeObject, game ) {
            this.nodes = Object.create( NodeList );
            this.entities = Object.create( Dictionary ).initialise();
            this.components = Object.create( Dictionary ).initialise();
            this.nodeObject = nodeObject;
            this.game = game;

            this.nodePool = Object.create( NodePool ).initialise( nodeObject );
            this.nodePool.dispose( this.nodePool.getNodeObject() );

            for( var property in nodeObject ) {
                if( nodeObject.hasOwnProperty( property ) && property != "types" ) {
                    var componentObject = nodeObject["types"][property];
                    this.components.add( componentObject, property );
                }
            }
            return this;
        },
        addIfMatch : function( entity ) {
            if( !this.entities.has( entity ) ) {
                var componentObject;
                if(
                    !this.components.forEach( function( componentObject, componentName ) {
                        if( !entity.has( componentObject ) ) {
                            return "return";
                        }
                    } )
                    ) {
                    return;
                }
                var node = this.nodePool.getNodeObject();
                node.entity = entity;
                this.components.forEach( function( componentObject, componentName ) {
                    node[ componentName ] = entity.get( componentObject );
                } );
                this.entities.add( entity, node );
                entity.componentRemoved.add( this.componentRemoved, this );
                this.nodes.add( node );
            }
        },
        remove : function( entity ) {
            if( this.entities.has(entity) ) {
                var node = this.entities.retrieve( entity );
                entity.componentRemoved.remove( this.componentRemoved, this );
                this.entities.remove( entity );
                this.nodes.remove( node );
                if( this.game.updating ) {
                    this.nodePool.cache( node );
                    this.game.updateComplete.add( this.releaseNodePoolCache, this );
                } else {
                    this.nodePool.dispose( node );
                }
            }
        },
        releaseNodePoolCache : function() {
            this.game.updateComplete.remove( this.releaseNodePoolCache, this );
            this.nodePool.releaseCache();
        },
        cleanUp : function() {
            for( var node = this.nodes.head; node; node = node.next )
            {
                node.entity.componentRemoved.remove( this.componentRemoved, this );
                this.entities.remove( node.entity );
            }
            this.nodes.removeAll();
        },
        componentRemoved : function( entity, componentClass ) {
            if( this.components.has( componentClass ) ) {
                this.remove( entity );
            }
        }
    };
}));