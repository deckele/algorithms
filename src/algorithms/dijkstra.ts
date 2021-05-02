import { Queue } from "../data-structures/queue";
class GraphNode {
    previous: GraphNode = null;
    children: [Edge, GraphNode][] = [];
    constructor(public value: string, public distance = Infinity) {}
}

class Edge {
    constructor(public value: number) {}
}

function dijkstra(start: GraphNode, target: GraphNode): string | false {
    if (start === target) return `0-${start.value}`;
    const visited = new Set<GraphNode>();
    const queue = new Queue<GraphNode>([start]);
    while (!queue.isEmpty()) {
        const current = queue.dequeue();
        // if (visited.has(current)) continue;
        visited.add(current);
        for (const [edge, graphNode] of current.children) {
            if (!visited.has(graphNode)) queue.enqueue(graphNode);
            const newDistance = current.distance + edge.value;
            if (newDistance < graphNode.distance) {
                graphNode.distance = newDistance;
                graphNode.previous = current;
            }
        }
    }
    const shortestPath: [number, string][] = [];
    let current = target;
    while (current.previous) {
        shortestPath.push([
            current.distance - current.previous.distance,
            current.value,
        ]);
        current = current.previous;
    }
    shortestPath.push([0, current.value]);
    if (current !== start) return false;
    shortestPath.reverse();
    return shortestPath.flat().join("-");
}

/*
test case: 
    START--5---A ** has own cycle 0
    |   \2   1/ \13
    |7   B-3-E-5-TARGET
    |   2|   |2 /2
    C-8--D-1-F
*/
(function testDijkstra() {
    const start = new GraphNode("START", 0);
    const A = new GraphNode("A");
    const B = new GraphNode("B");
    const C = new GraphNode("C");
    const D = new GraphNode("D");
    const E = new GraphNode("E");
    const F = new GraphNode("F");
    const target = new GraphNode("TARGET");
    const Start_A = new Edge(5);
    const Start_B = new Edge(2);
    const Start_C = new Edge(7);
    // test for own cycle A-A
    const A_A = new Edge(0);
    const A_E = new Edge(1);
    const A_Target = new Edge(13);
    const B_E = new Edge(3);
    const B_D = new Edge(2);
    const C_D = new Edge(8);
    const D_F = new Edge(1);
    const E_F = new Edge(2);
    const E_Target = new Edge(5);
    const F_Target = new Edge(2);

    start.children = [
        [Start_A, A],
        [Start_B, B],
        [Start_C, C],
    ];
    A.children = [
        [Start_A, start],
        [A_E, E],
        [A_A, A],
        [A_Target, target],
    ];
    B.children = [
        [Start_B, start],
        [B_E, E],
        [B_D, D],
    ];
    C.children = [
        [Start_C, start],
        [C_D, D],
    ];
    D.children = [
        [B_D, B],
        [C_D, C],
        [D_F, F],
    ];
    E.children = [
        [A_E, A],
        [B_E, B],
        [E_F, F],
        [E_Target, target],
    ];
    F.children = [
        [D_F, D],
        [E_F, E],
        [F_Target, target],
    ];
    target.children = [
        [A_Target, A],
        [E_Target, E],
        [F_Target, F],
    ];
    console.log(dijkstra(start, target).toString());
})();
