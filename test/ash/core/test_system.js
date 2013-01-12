var async,
    asyncCallback,
    engine,
    system1,
    system2;

module("Test Systems", {
    setup : function() {
        engine = new Engine();
    },
    teardown : function() {
        engine = null;
        asyncCallback = null;
    }
});

test("systemsGetterReturnsAllTheSystems", function() {
    var system1 = new System();
    engine.addSystem( system1, 1 );
    var system2 = new System();
    engine.addSystem( system2, 1 );
    equal( engine.systems.length, 2 );
    ok( hasItems( engine.systems, [ system1, system2 ] ) );
});

test("addSystemCallsAddToEngine", 2, function() {
    stop();
    var system = new MockSystem();
    asyncCallback = addedCallbackMethod;
    engine.addSystem( system, 0 );
    setTimeout(function(){
        start();
    }, 10);
});

test("removeSystemCallsRemovedFromEngine", 2, function() {
    stop();
    var system = new MockSystem();
    engine.addSystem( system, 0 );
    asyncCallback = removedCallbackMethod;
    engine.removeSystem( system );
    setTimeout(function(){
        start();
    }, 10);
});

test("engineCallsUpdateOnSystems", 2, function() {
    stop();
    var system = new MockSystem();
    engine.addSystem( system, 0 );
    asyncCallback = updateCallbackMethod;
    engine.update( 0.1 );
    setTimeout(function() {
        start();
    }, 10);
});

test("defaultPriorityIsZero", function() {
    var system = new MockSystem();
    equal( system.priority, 0 );
});

test("canSetPriorityWhenAddingSystem", function() {
    var system = new MockSystem();
    engine.addSystem( system, 10 );
    equal( system.priority, 10 );
});

test("systemsUpdatedInPriorityOrderIfSameAsAddOrder", 2, function() {
    system1 = new MockSystem();
    engine.addSystem( system1, 10 );
    system2 = new MockSystem();
    engine.addSystem( system2, 20 );
    asyncCallback = updateCallbackMethod1;
    engine.update( 0.1 );
});

test("systemsUpdatedInPriorityOrderIfReverseOfAddOrder", 2, function() {
    system2 = new MockSystem();
    engine.addSystem( system2, 20 );
    system1 = new MockSystem();
    engine.addSystem( system1, 10 );
    asyncCallback = updateCallbackMethod1;
    engine.update( 0.1 );
});

test("systemsUpdatedInPriorityOrderIfPrioritiesAreNegative", 2, function() {
    system2 = new MockSystem();
    engine.addSystem( system2, 10 );
    system1 = new MockSystem();
    engine.addSystem( system1, -20 );
    asyncCallback = updateCallbackMethod1;
    engine.update( 0.1 );
});

test("updatingIsFalseBeforeUpdate", function() {
   ok( engine.updating === false );
});

test("updatingIsTrueDuringUpdate", 1, function() {
    stop();
    var system = new MockSystem();
    engine.addSystem( system, 0 );
    asyncCallback = assertsUpdatingIsTrue;
    engine.update( 0.1 );
    start();
});

test("updatingIsFalseAfterUpdate", function() {
    engine.update(0.1);
    ok( engine.updating === false );
});

test("completeSignalIsDispatchedAfterUpdate", 1, function() {
    var system = new MockSystem();
    engine.addSystem( system, 0 );
    asyncCallback = listensForUpdateComplete;
    engine.update(0.1);
});

test("getSystemReturnsTheSystem", function(){
    var system1 = new MockSystem();
    engine.addSystem( system1, 0 );
    engine.addSystem( new System(), 0 );
    strictEqual( engine.getSystem( MockSystem ), system1 );
});

test("getSystemReturnsNullIfNoSuchSystem", function() {
    engine.addSystem( new System(), 0 );
    strictEqual( engine.getSystem( MockSystem ), null );
});

test("removeAllSystemsDoesWhatItSays", function() {
    engine.addSystem( new System(), 0 );
    engine.addSystem( new MockSystem(), 0 );
    engine.removeAllSystems();
    strictEqual( engine.getSystem( MockSystem ), null );
    strictEqual( engine.getSystem( System ), null );
});

test("removeSystemAndAddItAgainDoesNotCauseInvalidLinkedList", function() {
    var systemB = new System();
    var systemC = new System();
    engine.addSystem( systemB, 0 );
    engine.addSystem( systemC, 0 );
    engine.removeSystem( systemB );
    engine.addSystem( systemB, 0 );
    strictEqual( systemC.previous, null );
    strictEqual( systemB.next, null );
});

function addedCallbackMethod( system, action, systemEngine ) {
    equal( action, "added" );
    strictEqual( systemEngine, engine );
}

function removedCallbackMethod( system, action, systemEngine ) {
    equal( action, "removed" );
    strictEqual( systemEngine, engine );
}

function updateCallbackMethod( system, action, time ) {
    equal( action, "update" );
    equal( time, 0.1 );
}

function updateCallbackMethod1( system, action, time ) {
    asyncCallback = updateCallbackMethod2;
    strictEqual( system, system1 );
}

function updateCallbackMethod2( system, action, time ) {
    strictEqual( system, system2 );
}

function assertsUpdatingIsTrue( system, action, time ) {
    ok( engine.updating === true );
}

function updateComplete() {
    ok( true );
	engine.updateComplete.remove(updateComplete);
}

function listensForUpdateComplete( system, action, time ) {
    engine.updateComplete.add(updateComplete);
}

function MockSystem() {}
MockSystem.prototype.initialise = function() {
    return this;
};
MockSystem.prototype.addToEngine = function( engine ) {
    if( typeof asyncCallback == "function" ) {
        asyncCallback( this, "added", engine );
	}
};
MockSystem.prototype.removeFromEngine = function( engine ) {
    if( typeof asyncCallback == "function" ) {
        asyncCallback( this, "removed", engine );
	}
};
MockSystem.prototype.update = function( time ) {
    if( typeof asyncCallback == "function" ) {
        asyncCallback( this, "update", time );
    }
};
Object.extend(MockSystem.prototype, System.prototype);