var engine;

module("Test Engine", {
    setup : function() {
        engine = new Engine();
        engine.familyClass = MockFamily;
        MockFamily.reset();
    },
    teardown : function() {
        engine = null;
    }
});

test("entitiesGetterReturnsAllTheEntities", function() {
	var entity1 = new Entity();
    engine.addEntity( entity1 );
    var entity2 = new Entity();
    engine.addEntity( entity2 );
    equal( engine.entities.length, 2 );
    ok( hasItems( engine.entities, [ entity1, entity2 ] ) );
});

test("addEntityChecksWithAllFamilies", function() {
    engine.getNodeList( MockNode );
    engine.getNodeList( MockNode2 );
    var entity = new Entity();
    engine.addEntity( entity );
	equal( MockFamily.instances[0].newEntityCalls, 1 );
	equal( MockFamily.instances[1].newEntityCalls, 1 );
});

test("removeEntityChecksWithAllFamilies", function() {
    engine.getNodeList( MockNode );
    engine.getNodeList( MockNode2 );
    var entity = new Entity();
    engine.addEntity( entity );
    engine.removeEntity( entity );
    equal( MockFamily.instances[0].removeEntityCalls, 1 );
    equal( MockFamily.instances[1].removeEntityCalls, 1 );
});

test("removeAllEntitiesChecksWithAllFamilies", function() {
    engine.getNodeList( MockNode );
    engine.getNodeList( MockNode2 );
    var entity = new Entity();
    var entity2 = new Entity();
    engine.addEntity( entity );
    engine.addEntity( entity2 );
    engine.removeAllEntities();
    equal( MockFamily.instances[0].removeEntityCalls, 2 );
    equal( MockFamily.instances[1].removeEntityCalls, 2 );
});

test("componentAddedChecksWithAllFamilies", function() {
    engine.getNodeList( MockNode );
    engine.getNodeList( MockNode2 );
    var entity = new Entity();
    engine.addEntity( entity );
    entity.add( new Point() );
    equal( MockFamily.instances[0].componentAddedCalls, 1 );
    equal( MockFamily.instances[1].componentAddedCalls, 1 );
});

test("componentRemovedChecksWithAllFamilies", function() {
    engine.getNodeList( MockNode );
    engine.getNodeList( MockNode2 );
    var entity = new Entity();
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
    engine.addEntity( new Entity() );
    engine.addEntity( new Entity() );
    engine.getNodeList( MockNode );
    equal( MockFamily.instances[0].newEntityCalls, 2 );
});

test("releaseNodeListCallsCleanUp", function() {
    engine.getNodeList( MockNode );
    engine.releaseNodeList( MockNode );
    equal( MockFamily.instances[0].cleanUpCalls, 1 );
});

function MockNode() {}
MockNode.prototype.point = null;
Object.extend( MockNode.prototype, Node );

function MockNode2() {}
MockNode2.prototype.matrix = null;
Object.extend( MockNode2.prototype, Node );

function MockFamily( nodeObject, engine ) {
	Object.extend( MockFamily.prototype, Family.prototype );
	this.initialise( nodeObject, engine );
}
MockFamily.prototype.initialise = function( nodeObject, engine ) {
	this.nodes = new NodeList();
	this.entities = new Dictionary();
	this.components = new Dictionary();
	this.nodeObject = nodeObject;
	this.engine = engine;
	this.nodePool = new NodePool( nodeObject );
	this.nodePool.dispose( this.nodePool.get() );
	for( var property in nodeObject ) {
		if( nodeObject.hasOwnProperty( property ) && property != "types" ) {
			var componentObject = nodeObject["types"][property];
			this.components.add( componentObject, property );
		}
	}
    MockFamily.instances.push( this );
	return this;
}
MockFamily.instances = [];
MockFamily.reset = function() {
    MockFamily.instances = [];
};
MockFamily.prototype.newEntityCalls = 0;
MockFamily.prototype.removeEntityCalls = 0;
MockFamily.prototype.componentAddedCalls = 0;
MockFamily.prototype.componentRemovedCalls = 0;
MockFamily.prototype.cleanUpCalls = 0;
MockFamily.prototype.nodeList = function() {
    return null;
};
MockFamily.prototype.newEntity = function( entity ) {
    this.newEntityCalls++;
};
MockFamily.prototype.removeEntity = function( entity ) {
    this.removeEntityCalls++;
};
MockFamily.prototype.componentAddedToEntity = function( entity, componentClass ) {
    this.componentAddedCalls++;
};
MockFamily.prototype.componentRemovedFromEntity = function( entity, componentClass ) {
    this.componentRemovedCalls++;
};
MockFamily.prototype.cleanUp = function() {
    this.cleanUpCalls++;
};