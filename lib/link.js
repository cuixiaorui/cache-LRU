const Node = require("./link-node");
module.exports = class Link {
  constructor() {
    this.head = new Node();
  }

  find(key) {
    let currentNode = this.head.next;
    while (currentNode && currentNode.key !== key) {
      currentNode = currentNode.next;
    }

    return currentNode && currentNode.key === key ? currentNode : null;
  }

  /**
   * 添加到头部
   */
  addAtHead(key, value) {
    if (!key) {
      throw new Error("Key must be required");
    }
    let firstNode = this.head.next;
    let newNode = new Node(key, value);

    if (firstNode) {
      firstNode.prev = newNode;
      newNode.next = firstNode;
      this.head.next = newNode;
    } else {
      this.head.next = newNode;
      newNode.prev = this.head;
    }
  }

  /**
   * 添加到尾部
   */
  addAtTail(key, value) {
    if (!key) {
      throw new Error("Key must be required");
    }
    // todo 待优化
    let tailNode = this.head;
    while (tailNode.next) {
      tailNode = tailNode.next;
    }

    tailNode.next = new Node(key, value, tailNode, null);
  }

  delete(node) {
    if (!node) {
      throw new Error("Node must be required");
    }
    let prevNode = node.prev;
    let nextNode = node.next;
    prevNode.next = nextNode;
    if (nextNode) nextNode.prev = prevNode;
  }

  deleteAtTail() {
    // todo 待优化
    let tailNode = this.head;
    while (tailNode.next) {
      tailNode = tailNode.next;
    }
    if (tailNode) {
      this.delete(tailNode);
    }
  }
};
