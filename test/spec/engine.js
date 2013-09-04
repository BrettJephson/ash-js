/**
 * Testing Component Matching Family
 */
define ([
    'ash-framework',
    'point',
    'point3',
    'brejep/dictionary'
], function(Ash, Point, Point3, Dictionary) {
    'use strict';

    // prepare MockNodes
    var MockNode = Ash.Node.extend({
        point: null,
        types: {
            point: Point
        },
        constructor: function (x, y) {
            x = x || 0;
            y = y || 0;
            this.point = new Point(x, y);
        }
    });

    var MockNode2 = MockNode.extend({
        point: null,
        matrix: null,
        types: {
            point: Point
        },
        constructor: function () {
            MockNode.super.constructor.call(this);
        }
    });

    var MockFamily = Ash.Family.extend({
        newEntityCalls: 0,
        removeEntityCalls: 0,
        componentAddedCalls: 0,
        componentRemovedCalls: 0,
        cleanUpCalls: 0,

        constructor: function (nodeObject, engine) {
            MockFamily.super.constructor.call(this, nodeObject, engine);

            this.nodes = new Ash.NodeList();
            this.entities = new Dictionary();
            this.components = new Dictionary();
            this.nodeObject = nodeObject;
            this.engine = engine;
            this.nodePool = new Ash.NodePool( nodeObject, this.components );
            this.nodePool.dispose( this.nodePool.get() );
            for( var property in nodeObject ) {
                if(nodeObject.hasOwnProperty(property) &&
                    property != "next" &&
                    property != "previous" &&
                    property != "constructor" &&
                    property != "super" &&
                    property != "extend" &&
                    property != "entity") {
                    var componentObject = nodeObject.types[property];
                    this.components.add(componentObject, property);
                }
            }

            MockFamily.instances.push( this );
        },

        nodeList: function() {
            return null;
        },

        newEntity: function( entity ) {
            this.newEntityCalls++;
        },

        removeEntity: function( entity ) {
            this.removeEntityCalls++;
        },

        componentAddedToEntity: function( entity, componentClass ) {
            this.componentAddedCalls++;
        },

        componentRemovedFromEntity: function( entity, componentClass ) {
            this.componentRemovedCalls++;
        },

        cleanUp: function() {
            this.cleanUpCalls++;
        }
    });

    // static variables & methods
    MockFamily.instances = [];
    MockFamily.reset = function() {
        MockFamily.instances = [];
    };

    var engine;

    module("Test Engine", {
        setup : function() {
            engine = new Ash.Engine();
            engine.familyClass = MockFamily;
            MockFamily.reset();
        },
        teardown : function() {
            engine = null;
        }
    });

    test("entitiesGetterReturnsAllTheEntities", function() {
        var entity1 = new Ash.Entity();
        engine.addEntity( entity1 );
        var entity2 = new Ash.Entity();
        engine.addEntity( entity2 );
        equal(engine.entities.length, 2);
        notEqual(engine.entities.indexOf(entity1), -1);
        notEqual(engine.entities.indexOf(entity2), -1);
    });

    test("addEntityChecksWithAllFamilies", function() {
        engine.getNodeList( MockNode );
        engine.getNodeList( MockNode2 );
        var entity = new Ash.Entity();
        engine.addEntity( entity );
        equal( MockFamily.instances[0].newEntityCalls, 1 );
        equal( MockFamily.instances[1].newEntityCalls, 1 );
    });

    test("removeEntityChecksWithAllFamilies", function() {
        engine.getNodeList( MockNode );
        engine.getNodeList( MockNode2 );
        var entity = new Ash.Entity();
        engine.addEntity( entity );
        engine.removeEntity( entity );
        equal( MockFamily.instances[0].removeEntityCalls, 1 );
        equal( MockFamily.instances[1].removeEntityCalls, 1 );
    });

    test("removeAllEntitiesChecksWithAllFamilies", function() {
        engine.getNodeList( MockNode );
        engine.getNodeList( MockNode2 );
        var entity = new Ash.Entity();
        var entity2 = new Ash.Entity();
        engine.addEntity( entity );
        engine.addEntity( entity2 );
        engine.removeAllEntities();
        equal( MockFamily.instances[0].removeEntityCalls, 2 );
        equal( MockFamily.instances[1].removeEntityCalls, 2 );
    });

    test("componentAddedChecksWithAllFamilies", function() {
        engine.getNodeList( MockNode );
        engine.getNodeList( MockNode2 );
        var entity = new Ash.Entity();
        engine.addEntity( entity );
        entity.add( new Point() );
        equal( MockFamily.instances[0].componentAddedCalls, 1 );
        equal( MockFamily.instances[1].componentAddedCalls, 1 );
    });

    test("componentRemovedChecksWithAllFamilies", function() {
        engine.getNodeList( MockNode );
        engine.getNodeList( MockNode2 );
        var entity = new Ash.Entity();
        engine.addEntity( entity );
        entity.add( new Point() );
        entity.remove( Point );
        equal( MockFamily.instances[0].componentAddedCalls, 1 );
        equal( MockFamily.instances[1].componentAddedCalls, 1 );
    });

    test("getNodeListCreatesFamily", function() {
        engine.getNodeList( MockNode );
        equal( MockFamily.instances.length, 1 );
    });

    test("getNodeListChecksAllEntities", function() {
        engine.addEntity( new Ash.Entity() );
        engine.addEntity( new Ash.Entity() );
        engine.getNodeList( MockNode );
        equal( MockFamily.instances[0].newEntityCalls, 2 );
    });

    test("releaseNodeListCallsCleanUp", function() {
        engine.getNodeList( MockNode );
        engine.releaseNodeList( MockNode );
        equal( MockFamily.instances[0].cleanUpCalls, 1 );
    });
});
