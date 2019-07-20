const Node = require("./link-node");
module.exports = class Link {
  constructor() {
    this.head = new Node();
    this.tail = null;
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
      this.tail = newNode;
    }
  }

  /**
   * 添加到尾部
   */
  addAtTail(key, value) {
    if (!key) {
      throw new Error("Key must be required");
    }

    let newNode = new Node(key, value);
    if (this.tail) {
      this.tail.next = newNode;
      newNode.prev = this.tail;
    } else {
      this.head.next = newNode;
      newNode.prev = this.head;
    }
    this.tail = newNode;
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
    if (this.tail) {
      this.tail.prev.next = null;
      this.tail = this.tail.prev;
    }
  }
};
