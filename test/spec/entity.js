/**
 * Testing Entity
 */
define ([
    'ash-framework',
    'brejep/class',
], function(Ash, Class) {
    'use strict';

    // prepare Mock components
    var MockComponent = Class.extend({
        value: 0
    });

    var MockComponent2 = Class.extend({
        value: ''
    });

    var MockComponentExtended = MockComponent.extend({
        other: 2
    });

    var entity;

    module("Test Entities", {
        setup : function() {
            entity = new Ash.Entity();
        },
        teardown : function() {
            entity = null;
        }
    });

    test("addReturnsReferenceToEntity", function() {
        var component = new MockComponent();
        var e = entity.add( component );
        strictEqual(entity, e);
    });

    test("willRetrieveJustAddedComponent", function() {
        var component = new MockComponent();
        entity.add(component);
        var all = entity.getAll();
        equal(all.length, 1);
        strictEqual(all[0], component);
    });

    test("canStoreAndRetrieveComponent", function() {
        var component = new MockComponent();
        entity.add( component );
        strictEqual(entity.get( MockComponent ), component);
    });

    test("canStoreAndRetrieveMultipleComponents", function() {
        var component1 = new MockComponent();
        entity.add( component1 );
        var component2 = new MockComponent2();
        entity.add( component2 );
        strictEqual(entity.get( MockComponent ), component1);
        strictEqual(entity.get( MockComponent2 ), component2);
    });

    test("canReplaceComponent", function() {
        var component1 = new MockComponent();
        entity.add( component1 );
        var component2 = new MockComponent();
        component2.value = 2;
        entity.add( component2 );
        strictEqual(entity.get( MockComponent ), component2);
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
        strictEqual(entity.get( MockComponent ), null);
    });

    test("willRetrieveAllComponents", function() {
        var component1 = new MockComponent();
        entity.add( component1 );
        var component2 = new MockComponent2();
        entity.add( component2 );
        var all = entity.getAll();
        equal(all.length, 2);
        notEqual(all.indexOf(component1), -1);
        notEqual(all.indexOf(component2), -1);
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
        var component = new MockComponent();
        var callback = function() {
            ok(true, 'added signal is triggered');
            // TODO check the component
            
            start();
        };
        entity.componentAdded.add( callback );
        entity.add(component);
    });

    test("removingComponentTriggersRemovedSignal", 1, function() {
        var component = new MockComponent();
        var callback = function() {
            ok(true, 'removed signal is triggered');
            // TODO check the component
            
            start();
        };
        entity.componentRemoved.add(callback);
        entity.add(component);
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
});
