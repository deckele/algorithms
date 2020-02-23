import { Queue } from "./queue";
/* * * *
*   DFS - BFS graph traversal
*/

class GraphNode {
    constructor(public value){}
    children: GraphNode[] = [];
    orderOfDiscovery?: number = Infinity;
    distance?: number = Infinity;
}

function dfs() {
    const stack = [];
}

function bfs(start: GraphNode, target: GraphNode) {
    const visited = new Set();
    const queue = new Queue<GraphNode>();
    let distance = 0;
    let orderOfDiscovery = 0;
    let childCount = 1;
    queue.enqueue(start);
    while (queue.length > 0) {
        const current = queue.dequeue();
        childCount--;
        if (visited.has(current)) {
            continue;
        }
        visited.add(current);
        current.orderOfDiscovery = orderOfDiscovery++;
        current.distance = distance;
        if (current === target) {
            return current;
        }
        for (const child of current.children) {
            queue.enqueue(child);
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
    console.log(bfs(start, target));
})();