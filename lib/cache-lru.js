const Link = require("./link");

module.exports = class CacheLRU {
  constructor(maxSize = 10) {
    this._link = new Link();
    this._maxSize = maxSize;
    this._size = 0;
  }

  isFull() {
    return this._size >= this._maxSize;
  }

  // 如果存在数据,那么先删除，然后放到链表头部
  // 如果不存在数据：并且 size 没满  直接插入到头部
  // 如果不存在数据：并且 size 满了  删除尾部的 node ，把当前数据插入到头部
  set(key, value) {
    let node = this._link.find(key);
    if (node) {
      this._link.delete(node);
      this._link.addAtHead(key, value);
    } else {
      if (this.isFull()) {
        this._link.deleteAtTail();
      } else {
        this._size++;
      }
      this._link.addAtHead(key, value);
    }
  }

  // 如果存在数据
  // 把数据的位置放到链表头部
  // 如果没有这个数据 返回 undefined
  get(key) {
    let node = this._link.find(key);
    if (node) {
      this._link.delete(node);
      this._link.addAtHead(key, node.value);
    }
    return node;
  }

  keys() {
    let arr = [];
    this.forEach(node => {
      arr.push(node.key);
    });

    return arr;
  }

  values() {
    let arr = [];
    this.forEach(node => {
      arr.push(node.value);
    });

    return arr;
  }

  entries() {
    let arr = [];
    this.forEach(node => {
      arr.push([node.key, node.value]);
    });

    return arr;
  }

  forEach(callback) {
    let node = this._link.head.next;
    while (node) {
      callback && callback(node);
      node = node.next;
    }
  }
};
