define( "ash/game", 
    [ "ash/family", "ash/entitylist", "ash/systemlist", "libs/signals", "brejep/dictionary" ],
    function( Family, EntityList, SystemList, signals, Dictionary ) {
        return {
            entities : null,
            systems : null,
            families : null,
            updating : false,
            updateComplete : new signals.Signal(),
            initialise : function() {
                this.entities = Object.create( EntityList );
                this.systems = Object.create( SystemList );
                this.families = Object.create( Dictionary).initialise();
                return this;
            },
            addEntity : function( entity ) {
                this.entities.add( entity );
                entity.componentAdded.add( this.componentAdded, this );
                this.families.forEach( function( nodeObject, family ) {
                    family.addIfMatch( entity );
                } );
            },
            removeEntity : function( entity ) {
                entity.componentAdded.remove( this.componentAdded, this );
                this.families.forEach( function( nodeObject, family ) {
                   family.remove( entity ); 
                });
                this.entities.remove( entity );
            },
            removeAllEntities : function() {
                while( entities.head ) {
                    removeEntity( entities.head );
                }
            },
            componentAdded : function( entity, componentClass ) {
                this.families.forEach( function( nodeObject, family ) {
                    family.addIfMatch( entity );
                });
            },
            getNodeList : function( nodeObject ) {
                if( this.families.has( nodeObject ) ) {
                    return this.families.retrieve( nodeObject ).nodes;
                }
                var family = Object.create( Family ).initialise( nodeObject, this );
                this.families.add( nodeObject, family );
                for( var entity = this.entities.head; entity; entity = entity.next ) {
                    family.addIfMatch( entity );
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
                system.addToGame( this );
                this.systems.add( system );
            },
            getSystem : function( type ) {
                return systems.get( type );
            },
            removeSystem : function( system ) {
                this.systems.remove( system );
                system.removeFromGame( this );
            },
            removeAllSystems : function() {
                while( systems.head ) {
                    removeSystem( systems.head );
                }
            },
            update : function( time ) {
                this.updating = true;
                for( var system = this.systems.head; system; system = system.next ) {
                    system.update( time );
                }
                this.updating = false;
                this.updateComplete.dispatch();
            }
        };
    }
);