/**
 * Testing NodeList
 */
define ([
    'ash-framework',
    'brejep/point',
    'brejep/point3',
    'brejep/class'
], function(Ash, Point, Point3, Class) {
    'use strict';

    var nodes, tempNode;

    // prepare mock node
    var MockNode = Ash.Node.extend({
        pos: undefined,
        init: function (value) {
            this.pos = value || 0;
        },
    });

    module("Test Nodelist", {
        setup: function() {
            nodes = new Ash.NodeList();
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
        };
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

    test("insertionSortCorrectlySortsSortedNodes", function() {
        var node1 = new MockNode( 1 ),
            node2 = new MockNode( 2 ),
            node3 = new MockNode( 3 ),
            node4 = new MockNode( 4 );
        nodes.add( node1 );
        nodes.add( node2 );
        nodes.add( node3 );
        nodes.add( node4 );
        nodes.insertionSort( sortFunction );
        ok( testNodeOrder( nodes, [node1, node2, node3, node4] ) );
    });

    test("insertionSortCorrectlySortsReversedNodes", function() {
        var node1 = new MockNode( 1 ),
            node2 = new MockNode( 2 ),
            node3 = new MockNode( 3 ),
            node4 = new MockNode( 4 );
        nodes.add( node4 );
        nodes.add( node3 );
        nodes.add( node2 );
        nodes.add( node1 );
        nodes.insertionSort( sortFunction );
        ok( testNodeOrder( nodes, [node1, node2, node3, node4] ) );
    });

    test("insertionSortCorrectlySortsMixedNodes", function() {
        var node1 = new MockNode( 1 ),
            node2 = new MockNode( 2 ),
            node3 = new MockNode( 3 ),
            node4 = new MockNode( 4 ),
            node5 = new MockNode( 5 );
        nodes.add( node3 );
        nodes.add( node4 );
        nodes.add( node1 );
        nodes.add( node5 );
        nodes.add( node2 );
        nodes.insertionSort( sortFunction );
        ok( testNodeOrder( nodes, [node1, node2, node3, node4, node5] ) );
    });

    test("insertionSortRetainsTheOrderOfEquivalentNodes", function() {
        var node1 = new MockNode( 1 ),
            node2 = new MockNode( 2 ),
            node3 = new MockNode( 3 ),
            node4 = new MockNode( 4 ),
            node5 = new MockNode( 4 );
        nodes.add( node3 );
        nodes.add( node4 );
        nodes.add( node1 );
        nodes.add( node5 );
        nodes.add( node2 );
        nodes.insertionSort( sortFunction );
        ok( testNodeOrder( nodes, [node1, node2, node3, node4, node5] ) );
    });

    test("mergeSortCorrectlySortsSortedNodes", function() {
        var node1 = new MockNode( 1 ),
            node2 = new MockNode( 2 ),
            node3 = new MockNode( 3 ),
            node4 = new MockNode( 4 );
        nodes.add( node1 );
        nodes.add( node2 );
        nodes.add( node3 );
        nodes.add( node4 );
        nodes.mergeSort( sortFunction );
        ok( testNodeOrder( nodes, [node1, node2, node3, node4] ) );
    });

    test("mergeSortCorrectlySortsReversedNodes", function() {
        var node1 = new MockNode( 1 ),
            node2 = new MockNode( 2 ),
            node3 = new MockNode( 3 ),
            node4 = new MockNode( 4 );
        nodes.add( node4 );
        nodes.add( node3 );
        nodes.add( node2 );
        nodes.add( node1 );
        nodes.mergeSort( sortFunction );
        ok( testNodeOrder( nodes, [node1, node2, node3, node4] ) );
    });

    test("mergeSortCorrectlySortsMixedNodes", function() {
        var node1 = new MockNode( 1 ),
            node2 = new MockNode( 2 ),
            node3 = new MockNode( 3 ),
            node4 = new MockNode( 4 ),
            node5 = new MockNode( 5 );
        nodes.add( node3 );
        nodes.add( node4 );
        nodes.add( node1 );
        nodes.add( node5 );
        nodes.add( node2 );
        nodes.mergeSort( sortFunction );
        ok( testNodeOrder( nodes, [node1, node2, node3, node4, node5] ) );
    });

    function sortFunction( node1, node2 ) {
        return node1.pos - node2.pos;
    }

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
});
