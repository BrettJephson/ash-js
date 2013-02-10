(function() {
    var entity;

    module("Test Entities", {
        setup : function() {
            entity = new Entity();
        },
        teardown : function() {
            entity = null;
        }
    });

    test("addReturnsReferenceToEntity", function() {
        var component = new MockComponent();
        var e = entity.add( component );
        ok( entity === e );
    });

    test("canStoreAndRetrieveComponent", function() {
        var component = new MockComponent();
        entity.add( component );
        ok( entity.get( MockComponent ) === component );
    });

    test("canStoreAndRetrieveMultipleComponents", function() {
        var component1 = new MockComponent();
        entity.add( component1 );
        var component2 = new MockComponent2();
        entity.add( component2 );
        ok( entity.get( MockComponent ) === component1 );
        ok( entity.get( MockComponent2 ) === component2 );
    });

    test("canReplaceComponent", function() {
        var component1 = new MockComponent();
        entity.add( component1 );
        var component2 = new MockComponent();
        component2.value = 2;
        entity.add( component2 );
        ok( entity.get( MockComponent ) === component2 );
    });

    test("canStoreBaseAndExtendedComponents", function() {
        var component1 = new MockComponent();
        entity.add( component1 );
        var component2 = new MockComponentExtended();
        entity.add( component2 );
        strictEqual( entity.get( MockComponent ), component1 );
        strictEqual( entity.get( MockComponentExtended ), component2 );
    });

    test("canStoreExtendedComponentAsBaseType", function() {
        var component = new MockComponentExtended();
        entity.add( component, MockComponent );
        strictEqual( entity.get( MockComponent ), component );
        ok( entity.has( MockComponent ) );
    });

    test("getReturnNullIfNoComponent", function() {
        ok( entity.get( MockComponent ) === null );
    });

    test("willRetrieveAllComponents", function() {
        var component1 = new MockComponent();
        entity.add( component1 );
        var component2 = new MockComponent2();
        entity.add( component2 );
        var all = entity.getAll();
        ok( all.length == 2);
        ok( hasItems( all, [component1, component2] ) );
    });

    test("hasComponentIsFalseIfComponentTypeNotPresent", function() {
        var component2 = new MockComponent2();
        entity.add( component2 );
        strictEqual( entity.has( MockComponent ), false );
    });

    test("canRemoveComponent", function() {
        var component = new MockComponent();
        entity.add( component );
        entity.remove( MockComponent );
        strictEqual( entity.has( MockComponent ), false );
    });

    test("storingComponentTriggersAddedSignal", 1, function() {
        stop();
        var component = new MockComponent();
        var callback = function() {
            ok( true );
            entity.componentAdded.remove( callback );
            start();
        };
        entity.componentAdded.add( callback );
        entity.add( component );
    });

    test("removingComponentTriggersRemovedSignal", 1, function() {
        stop();
        var component = new MockComponent();
        var callback = function() {
            ok( true );
            entity.componentRemoved.remove( callback );
            start();
        };
        entity.add( component );
        entity.componentRemoved.add( callback );
        entity.remove( MockComponent );
    });

    test("cloneIsNewReference", function() {
        var component = new MockComponent();
        entity.add( component );
        var clone = entity.clone();
        ok( clone != entity );
    });

    test("cloneHasChildComponent", function() {
        var component = new MockComponent();
        entity.add( component );
        var clone = entity.clone();
        ok( clone.has( MockComponent ) );
    });

    test("cloneChildComponentIsNewReference", function() {
        var component = new MockComponent();
        entity.add( component );
        var clone = entity.clone();
        ok( clone.get( MockComponent ) !== entity.get( MockComponent ) );
    });

    test("cloneChildComponentHasSameProperties", function() {
        var component = new MockComponent();
        component.value = 5;
        entity.add( component );
        var clone = entity.clone();
        equal( clone.get( MockComponent ).value, 5 );
    });

    function MockComponent() {};
    MockComponent.prototype.value = 0;
    MockComponent.prototype.initialise = function() {
        return this;
    };

    function MockComponent2() {};
    MockComponent2.prototype.value = "";
    MockComponent2.prototype.initialise = function() {
        return this;
    };

    function MockComponentExtended() {};
    MockComponentExtended.prototype.other = 2;
    Object.extend( MockComponentExtended.prototype, MockComponent.prototype );
}());