// 利用栈来匹配括号
function matchBrackets(s) {
  let bracketsMap = {
    "(": -1,
    ")": 1,
    "[": -2,
    "]": 2,
    "{": -3,
    "}": 3
  };
  let stack = [];
  for (var i = 0; i < s.length; i++) {
    if (bracketsMap[s[i]] < 0) {
      stack.push(bracketsMap[s[i]]);
    }
    if (bracketsMap[s[i]] > 0) {
      let last = stack.pop();
      if (!last || last + bracketsMap[s[i]] !== 0) {
        return false;
      }
    }
  }
  if (stack.length !== 0) {
    return false;
  }
  return true;
}

// 循环队列

class CircularQueue {
  constructor() {
    this.head = 0;
    this.tail = 0;
    this._data = [];
  }
  enQueue() {
    return;
  }
  deQueue() {}
}

// 单向链表
class Node {
  constructor(value, next = null, last = null) {
    this.value = value;
    this.next = next;
    this.last = last;
  }
  toString() {
    return this.value;
  }
}
class NodeList {
  constructor() {
    this.size = 0;
    this.dummyNode = new Node("", null); // 虚拟头节点
    this.tail = null;
  }
  findNode(currentIndex = -1, index = this.size - 1, node = this.dummyNode) {
    if (index === currentIndex) {
      return node;
    } else {
      return this.findNode(currentIndex + 1, index, node.next);
    }
  }
  addNode(value, index) {
    if (index < 0 || index > this.size) {
      throw new Error("index error");
    }
    let preNode = this.findNode(-1, index - 1);
    let newNode = new Node(value, preNode.next, preNode);
    preNode.next = newNode;
    if (newNode.next === null) {
      this.tail = newNode;
    }
    this.size++;
  }
  removeNode(index = this.size - 1) {
    if (index < 0 || index >= this.size) {
      throw new Error("index error");
    }
    let preNode = this.findNode(-1, index - 1);
    let currentNode = preNode.next;
    preNode.next = currentNode.next;
    currentNode.next.last = preNode;
    this.size--;
    return currentNode.value;
  }

  insertNode(value, index = this.size) {
    this.addNode(value, index);
  }
  pop() {
    return this.findNode().value;
  }
  push(value) {
    this.addNode(value, this.size);
  }
  toString() {
    let currentNode = this.dummyNode.next;
    let str = "header";
    function loadNode(node) {
      str += "==>" + node.value;
      if (node.next) {
        loadNode(node.next);
      }
      return str;
    }
    return loadNode(this.dummyNode.next);
  }
}

// let a = new NodeList();
// a.push(1);
// a.push(12);
// a.push(123);
// a.insertNode(1231, 0);
// console.log(a.toString());
// console.log(a.pop());

// 双向链表

getSubStr("adcadc");
