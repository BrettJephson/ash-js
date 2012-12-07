var entity;

module("Test Entities", {
    setup : function() {
        entity = Object.create( Entity ).initialise();
    },
    teardown : function() {
        entity = null;
    }
});

test("addReturnsReferenceToEntity", function() {
    var component = Object.create( MockComponent() ).initialise();
    var e = entity.add( component, MockComponent );
    ok( entity === e );
});

test("canStoreAndRetrieveComponent", function() {
    var component = Object.create( MockComponent() ).initialise();
    entity.add( component, MockComponent );
    ok( entity.get( MockComponent ) === component );
});

test("canStoreAndRetrieveMultipleComponents", function() {
    var component1 = Object.create( MockComponent() ).initialise();
    entity.add( component1, MockComponent );
    var component2 = Object.create( MockComponent2() ).initialise();
    entity.add( component2, MockComponent2 );
    ok( entity.get( MockComponent ) === component1 );
    ok( entity.get( MockComponent2 ) === component2 );
});

test("canReplaceComponent", function() {
    var component1 = Object.create( MockComponent() ).initialise();
    entity.add( component1, MockComponent );
    var component2 = Object.create( MockComponent() ).initialise();
    entity.add( component2, MockComponent );
    ok( entity.get( MockComponent ) === component2 );
});

test("canStoreBaseAndExtendedComponents", function() {
    var component1 = Object.create( MockComponent() ).initialise();
    entity.add( component1, MockComponent );
    var component2 = Object.create( MockComponentExtended() ).initialise();
    entity.add( component2, MockComponentExtended );
    ok( entity.get( MockComponent ) === component1 );
    ok( entity.get( MockComponentExtended ) === component2 );
});

test("canStoreExtendedComponentAsBaseType", function() {
    var compnent = Object.create( MockComponentExtended() ).initialise();
    entity.add( component, MockComponent );
    ok( entity.get( MockComponent ) === component );
});

test("getReturnNullIfNoComponent", function() {
    ok( entity.get( MockComponent ) === null );
});

test("willRetrieveAllComponents", function() {
    var component1 = Object.create( MockComponent() ).initialise();
    entity.add( component1, MockComponent );
    var component2 = Object.create( MockComponent2() ).initialise();
    entity.add( component2, MockComponent2 );
    var all = entity.getAll();
    ok( all.length == 2);
    //ok( all.reduce( function( component ){ return component === component1; }, false ) );
});

test("hasComponentIsFalseIfComponentTypeNotPresent", function() {
    var component2 = Object.create( MockComponent2() ).initialise();
    entity.add( component2, MockComponent2 );
    ok( entity.has( MockComponent ) === false );
});

test("canRemoveComponent", function() {
    var component = Object.create( MockComponent() ).initialise();
    entity.add( component, MockComponent );
    entity.remove( MockComponent );
    ok( entity.has( MockComponent ) === false );
});

test("storingComponentTriggersAddedSignal", function() {
   ///TODO async test
});

test("removingComponentTriggersRemovedSignal", function() {
    ///TODO async test
});

test("cloneIsNewReference", function() {
    var component = Object.create( MockComponent() ).initialise();
    entity.add( component, MockComponent );
    var clone = entity.clone();
    ok( clone != entity );
});

test("cloneHasChildComponent", function() {
    var component = Object.create( MockComponent() ).initialise();
    entity.add( component, MockComponent );
    var clone = entity.clone();
    ok( clone.has( MockComponent ) );
});

test("cloneChildComponentIsNewReference", function() {
    var component = Object.create( MockComponent() ).initialise();
    entity.add( component, MockComponent );
    var clone = entity.clone();
    ok( clone.get( MockComponent ) != entity.get( MockComponent ) );
});

test("cloneChildComponentHasSameProperties", function() {
    var component = Object.create( MockComponent() ).initialise();
    component.value = 5;
    entity.add( component, MockComponent );
    var clone = entity.clone();
    ok( clone.get( MockComponent ).value == 5 );
});

function MockComponent() {
    return {
        value : 0,
        initialise : function() {
            return this;
        }
    };
}

function MockComponent2() {
    return {
        value : "",
        initialise : function() {
            return this;
        }
    };
}

function MockComponentExtended() {
    return Object.extend( MockComponent(), {
        other : ""
    } )
}