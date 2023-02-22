// 使用栈实现

function preOrder(node){
    var result = []
    var stack = [node];
    while(stack.length) {
        var currentNode = stack.pop();
        result.push(node.val);
        stack.push(currentNode.right)
        stack.push(currentNode.left)
    }
}
function inOrder(node){
    var result = []
    var stack = [];
    var head = node;
    while(head) {
        stack.push(head);
        head = head.left;

        if(stack.length) {
            var head = stack.pop();
            result.push(head.val);
            head = head.right
        }
    }

}

function afterOrder(node) {
    var result = [];
    var stack = [];
    var head = node;
    while(head) {
        stack.push(head);
        head = head.left;
        if(stack.length) {
            head = stack[stack.length-1];
            head = head.right;
        }
    }
}