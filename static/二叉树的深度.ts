/**
 * 求二叉树的最大深度
 */

interface NodeList {
    value: any,
    left: NodeList
    right: NodeList
}

// 递归实现 DFS   
function maxDepth(root): number {
    if (!root) return 0;
    return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1
}

// BFS + 队列 实现

function maxDepthBFS(root: NodeList): number {
    if (!root) return 0;
    if (!root.left && !root.right) {
        return 1;
    }

    let currentQueue = [root];
    let depth = 0
    let nextQueue = [];

    while (currentQueue.length > 0) {
        var node = currentQueue.pop();
        node.left && nextQueue.push(node.left)
        node.left && nextQueue.push(node.left);
        if (currentQueue.length === 0) {
            depth++;
            if (nextQueue.length !== 0) {
                currentQueue = nextQueue;
                nextQueue = []
            }
            else {
                return depth;
            }
        }

    }
}
