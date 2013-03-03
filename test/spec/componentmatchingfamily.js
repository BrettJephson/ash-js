/**
 * Testing Component Matching Family
 */
define ([
    'ash-framework',
    'brejep/point',
    'brejep/point3',
], function(Ash, Point, Point3) {
    'use strict';

    var engine, family;

    // prepare MockNode
    var MockNode = Ash.Node.extend({
        point: null,
        types: {
            point: Point
        }
    });

    module("Test Component Matching Family", {
        setup: function() {
            engine = new Ash.Engine();
            family = new Ash.ComponentMatchingFamily(MockNode, engine);
        },
        teardown: function() {
            family = null;
            engine = null;
        }
    });

    test("nodeListIsInitiallyEmpty", function() {
        var nodes = family.nodeList;
        strictEqual( nodes.head, null );
    });

    test("matchingEntityIsAddedWhenAccessNodeListFirst", function() {
        var nodes = family.nodeList;
        var entity = new Ash.Entity();
        entity.add( new Point() );
        family.newEntity( entity );
        strictEqual( nodes.head.entity, entity );
    });

    test("matchingEntityIsAddedWhenAccessNodeListSecond", function() {
        var entity = new Ash.Entity();
        entity.add( new Point() );
        family.newEntity( entity );
        var nodes = family.nodeList;
        strictEqual( nodes.head.entity, entity );
    });

    test("nodeContainsEntityProperties", function() {
        var entity = new Ash.Entity();
        var point = new Point();
        entity.add( point );
        family.newEntity( entity );
        var nodes = family.nodeList;
        strictEqual( nodes.head.point, point );
    });

    test("matchingEntityIsAddedWhenComponentAdded", function() {
        var nodes = family.nodeList;
        var entity = new Ash.Entity();
        entity.add( new Point() );
        family.componentAddedToEntity( entity, Point );
        strictEqual( nodes.head.entity, entity );
    });

    test("nonMatchingEntityIsNotAdded", function() {
        var entity = new Ash.Entity();
        family.newEntity( entity );
        var nodes = family.nodeList;
        strictEqual( nodes.head, null );
    });

    test("nonMatchingEntityIsNotAddedWhenComponentAdded", function() {
        var entity = new Ash.Entity();
        entity.add( new Point3() );
        family.componentAddedToEntity( entity, Point3 );
        var nodes = family.nodeList;
        strictEqual( nodes.head, null );
    });

    test("entityIsRemovedWhenAccessNodeListFirst", function() {
        var entity = new Ash.Entity();
        entity.add( new Point() );
        family.newEntity( entity );
        var nodes = family.nodeList;
        family.removeEntity( entity );
        strictEqual( nodes.head, null );
    });

    test("entityIsRemovedWhenAccessNodeListSecond", function() {
        var entity = new Ash.Entity();
        entity.add( new Point() );
        family.newEntity( entity );
        family.removeEntity( entity );
        var nodes = family.nodeList;
        strictEqual( nodes.head, null );
    });

    test("entityIsRemovedWhenComponentRemoved", function() {
        var entity = new Ash.Entity();
        entity.add( new Point() );
        family.newEntity( entity );
        entity.remove( Point );
        family.componentRemovedFromEntity( entity, Point );
        var nodes = family.nodeList;
        strictEqual( nodes.head, null );
    });

    test("nodeListContainsOnlyMatchingEntities", function() {
        var entities = [],
            i = 0;
        for( i; i < 5; ++i )
        {
            var entity = new Ash.Entity();
            entity.add( new Point() );
            entities.push( entity );
            family.newEntity( entity );
            family.newEntity( new Ash.Entity() );
        }

        var nodes = family.nodeList,
            node;

        for( node = nodes.head; node; node = node.next )
        {
            notEqual( entities.indexOf( node.entity ), -1 );
        }
    });

    test("nodeListContainsAllMatchingEntities", function() {
        var entities = [],
            i = 0;

        for( i; i<5; ++i ) {
            var entity = new Ash.Entity();
            entity.add( new Point() );
            entities.push( entity );
            family.newEntity( entity );
            family.newEntity( new Ash.Entity() );
        }
        equal( entities.length, 5 );
        var nodes = family.nodeList,
            node;

        for( node = nodes.head; node; node = node.next )
        {
            var index = entities.indexOf( node.entity );
            if( index > -1 ) { entities.splice( index, 1 ) }
        }
        equal( entities.length, 0 );
    });

    test("cleanUpEmptiesNodeList", function() {
        var entity = new Ash.Entity();
        entity.add( new Point() );
        family.newEntity( entity );
        var nodes = family.nodeList;
        family.cleanUp();
        strictEqual( nodes.head, null );
    });

    test("cleanUpSetsNextNodeToNull", function() {
        var entities = [],
            i = 0;

        for( i; i < 5; ++i ) {
            var entity = new Ash.Entity();
            entity.add( new Point() );
            entities.push( entity );
            family.newEntity( entity );
        }

        var nodes = family.nodeList,
            node = nodes.head.next;
        family.cleanUp();
        strictEqual( node.next, null );
    });

});
