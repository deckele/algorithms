/* * * *
* Count how many unival sub trees are there for a given tree?
*/

class TreeNode {
    constructor(
        public value: number,
        public left?: TreeNode,
        public right?: TreeNode
    ){}
}
interface UnivalResult {
    count: number;
    isUnival: boolean;
}

function countUnivalSubTrees(root?: TreeNode): UnivalResult {
    if (!root) {
        return {count: 0, isUnival: false};
    }
    // All leaf nodes are univals
    if (!root.left && !root.right) {
        return {count: 1, isUnival: true};
    }
    const right = countUnivalSubTrees(root.right);
    const left = countUnivalSubTrees(root.left);
    const isUnival = 
        right.isUnival 
        && left.isUnival 
        && root.value === root?.right.value 
        && root.value === root?.left.value;
    const count = right.count + left.count + (isUnival ? 1 : 0);
    return {count, isUnival};
}
/*
*           3
*      2          3
*   1    2      3    3
*
*   expected count: 5
*/   
(function test() {
    const root: TreeNode = new TreeNode(3);
    root.left = new TreeNode(2);
    root.left.left = new TreeNode(1);
    root.left.right = new TreeNode(2);
    root.right = new TreeNode(3);
    root.right.right = new TreeNode(3);
    root.right.left = new TreeNode(3);
    console.log("Expected Number of unival subtrees: 5. Result is:", countUnivalSubTrees(root).count);
})();