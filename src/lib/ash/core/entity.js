define( "ash/entity",
    [ "libs/signals", "brejep/dictionary" ],
    function( signals, Dictionary ) {
        return {
            componentAdded : new signals.Signal(),
            componentRemoved : new signals.Signal(),
            previous : null, /* Entity */
            next : null, /* Entity */
            components : null,
            initialise : function()  {
                this.components = Object.create( Dictionary ).initialise();
                return this;
            },
            add : function( component, componentObject ) {
                if ( !componentObject ) {
                    componentObject = component.prototype.constructor;
                }
                if ( this.components.has( componentObject ) ) {
                    remove( componentObject );
                }
                this.components.add( componentObject, component );
                this.componentAdded.dispatch( this, componentObject );
                return this;
            },
            remove : function( componentObject ) {
                var component = this.components.retrieve( componentObject );
                if ( component ) {
                    this.components.remove( componentObject );
                    this.componentRemoved.dispatch( this, componentObject );
                    return component;
                }
                return null;
            },
            get : function( componentObject ) {
                return this.components.retrieve( componentObject );
            },
            has : function( componentObject ) {
                return this.components.has( componentObject );
            },
            clone : function() {
                var copy = Object.create( Entity );
                this.components.forEach( function( componentObject, component ) {
                    var newComponent = Object.create( componentObject ).initialise();
                    for( var property in component ) {
                        if( component.hasOwnProperty( property ) ) {
                            newComponent[property] = component[property];
                        }
                    }
                    copy.add( newComponent );
                } );
                return copy;
            }
        };
    }
);