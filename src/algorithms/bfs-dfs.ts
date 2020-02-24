/* * * *
*   DFS - BFS graph traversal
*/

import { Queue } from "../data-structures/queue";

class GraphNode {
    constructor(public value){}
    children: GraphNode[] = [];
    orderOfDiscovery?: number = Infinity;
    distance?: number = Infinity;
}

function dfs(start: GraphNode, target: GraphNode, visited: Set<GraphNode> = new Set(), orderRef = {order: 0}, distance = 0) {
    if (visited.has(start)) {
        return false;
    }
    visited.add(start);
    start.distance = distance;
    start.orderOfDiscovery = orderRef.order++;
    console.log(`{value: ${start.value}, order: ${start.orderOfDiscovery}, distance: ${start.distance}`);
    if (start === target) {
        return target;
    }
    for (const child of start.children) {
        const node = dfs(child, target, visited, orderRef, distance + 1);
        if (node) {
            return node;
        }
    }
    return false;
}

function bfs(start: GraphNode, target: GraphNode) {
    const visited = new Set();
    const queue = new Queue<GraphNode>();
    let orderOfDiscovery = 0;
    let distance = 0;
    let currentChildrenForDistance = 1;
    queue.enqueue(start);
    visited.add(start);
    while (queue.length > 0) {
        const current = queue.dequeue();
        current.orderOfDiscovery = orderOfDiscovery++;
        current.distance = distance;
        console.log(`{value: ${current.value}, order: ${current.orderOfDiscovery}, distance: ${current.distance}`);
        if (current === target) {
            return current;
        }
        for (const child of current.children) {
            if (!visited.has(child)) {
                visited.add(child);
                queue.enqueue(child);
            }
        }
        currentChildrenForDistance--;
        if (currentChildrenForDistance <= 0) {
            currentChildrenForDistance = queue.length;
            distance++;
        }
    }
    return false;
}

/*
test case:
    start------A
    |   \     /
    |    B---E---target
    |    |   |
    C----D---F
*/
(function testBFS() {
    const start = new GraphNode("START");
    const A = new GraphNode("A");
    const B = new GraphNode("B");
    const C = new GraphNode("C");
    const D = new GraphNode("D");
    const E = new GraphNode("E");
    const F = new GraphNode("F");
    const target = new GraphNode("TARGET");
    start.children = [A, B, C];
    // own cycle A-A
    A.children = [start, E, A];
    B.children = [start, E, D];
    C.children = [start, D];
    D.children = [B, C, F];
    E.children = [A, B, F, target];
    F.children = [D, E];
    target.children = [E];
    console.log(dfs(start, target));
})();