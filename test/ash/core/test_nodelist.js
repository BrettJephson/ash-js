var nodes,
	tempNode;

module("Test Nodelist", {
	setup: function() {
		nodes = new NodeList();
	},
	teardown: function() {
		nodes = null;
	}
});

test("addingNodeTriggersAddedSignal", 1, function() {
	stop();
	var node = new MockNode();
	var callback = function() {
		ok(true);
		nodes.nodeAdded.remove( callback );
		start();
	};
	nodes.nodeAdded.add( callback );
	nodes.add( node );
});

test("removingNodeTriggersRemovedSignal", 1, function() {
	stop();
	var node = new MockNode();
	var callback = function() {
		ok(true);
		nodes.nodeRemoved.remove( callback );
		start();
	}
	nodes.add( node );
	nodes.nodeRemoved.add( callback );
	nodes.remove( node );
});

test("allNodesAreCoveredDuringIteration", function() {
	var nodeArray = [],
		node;
	for( var i = 0; i<5; ++i )
	{
		node = new MockNode();
		nodeArray.push( node );
		nodes.add( node );
	}
	for( node = nodes.head; node; node = node.next ) {
		var index = nodeArray.indexOf( node );
		if( index > -1 ) {
			nodeArray.splice( index, 1 );
		}
	}
	equal(nodeArray.length, 0);
});

test("removingCurrentNodeDuringIterationIsValid", function() {
	var nodeArray = [],
		node,
		count = 0;
		
	for( var i = 0; i<5; ++i ) {
		node = new MockNode();
		nodeArray.push( node );
		nodes.add( node );
	}
	for( node = nodes.head; node; node = node.next )
	{
		var index = nodeArray.indexOf( node );
		if( index > -1 ) {
			nodeArray.splice( index, 1 );
		}
		if( ++count == 2 ) {
			nodes.remove( node );
		}
	}
	equal( nodeArray.length, 0 );
});

test("removingNextNodeDuringIterationIsValid", function() {
	var nodeArray = [],
		node,
		count = 0;
		
	for( var i = 0; i < 5; ++i ) {
		node = new MockNode();
		nodeArray.push( node );
		nodes.add( node );
	}
	for( node = nodes.head; node; node = node.next )
	{
		var index = nodeArray.indexOf( node );
		if( index > -1 ) {
			nodeArray.splice( index, 1 );
		}
		if( ++count == 2 )
		{	
			nodes.remove( node.next );
		}
	}
	equal( nodeArray.length, 1 );
});

test("componentAddedSignalContainsCorrectParameters", 1, function() {
	stop();
	tempNode = new MockNode();
	var callback = function( signalNode ) {
		strictEqual( tempNode, signalNode );
		nodes.nodeAdded.remove( callback );
		start();
	};
	nodes.nodeAdded.add( callback );
	nodes.add( tempNode );
});

test("componentRemovedSignalContainsCorrectParameters", 1, function() {
	stop();
	tempNode = new MockNode();
	var callback = function( signalNode ) {
		strictEqual( tempNode, signalNode );
		nodes.nodeRemoved.remove( callback );
		start();
	};
	nodes.add( tempNode );
	nodes.nodeRemoved.add( callback );
	nodes.remove( tempNode );
});

test("nodesInitiallySortedInOrderOfAddition", function() {
	var node1 = new MockNode(),
		node2 = new MockNode(),
		node3 = new MockNode();
		nodes.add( node1 );
		nodes.add( node2 );
		nodes.add( node3 );
		ok( testNodeOrder( nodes, [node1, node2, node3] ) );
});

test("swappingOnlyTwoNodesChangesTheirOrder", function() {
	var node1 = new MockNode(),
		node2 = new MockNode();
	nodes.add( node1 );
	nodes.add( node2 );
	nodes.swap( node1, node2 );
	ok( testNodeOrder( nodes, [node2, node1] ) );
});

test("swappingAdjacentNodesChangesTheirPositions", function() {
	var node1 = new MockNode(),
		node2 = new MockNode(),
		node3 = new MockNode(),
		node4 = new MockNode();
	nodes.add( node1 );
	nodes.add( node2 );
	nodes.add( node3 );
	nodes.add( node4 );
	nodes.swap( node2, node3 );
	ok( testNodeOrder( nodes, [node1, node3, node2, node4] ) );
});

test("swappingNonAdjacentNodesChangesTheirPositions", function() {
	var node1 = new MockNode(),
		node2 = new MockNode(),
		node3 = new MockNode(),
		node4 = new MockNode(),
		node5 = new MockNode();
	nodes.add( node1 );
	nodes.add( node2 );
	nodes.add( node3 );
	nodes.add( node4 );
	nodes.add( node5 );
	nodes.swap( node2, node4 );
	ok( testNodeOrder( nodes, [node1, node4, node3, node2, node5] ) );
});

test("swappingEndNodesChangesTheirPositions", function() {
	var node1 = new MockNode(),
		node2 = new MockNode(),
		node3 = new MockNode();
	nodes.add( node1 );
	nodes.add( node2 );
	nodes.add( node3 );
	nodes.swap( node1, node3 );
	ok( testNodeOrder( nodes, [node3, node2, node1] ) );
});

function testNodeOrder( nodes, nodeArray ) {
	var node,
		index = 0,
		testResult = true;
	for( node = nodes.head; node; node = node.next )
	{
		if( node !== nodeArray[index] ) {
			testResult = false;
		}
		++index;
	}
	return testResult;
}

function MockNode() {}
MockNode.prototype.point = undefined;
MockNode.prototype.matrix = undefined;
Object.extend(MockNode.prototype, Node.prototype);