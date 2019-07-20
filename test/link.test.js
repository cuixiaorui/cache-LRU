const Link = require("../lib/link");
const assert = require("assert");

describe("link -> addAtTail()", function() {
  it("add one Node to tail", () => {
    var link = new Link();
    link.addAtTail("1", { value: 10 });
    assert(link.head.next);
    assert.equal(link.head.next.value.value, 10);
  });

  it("add two Node to tail", () => {
    var link = new Link();
    link.addAtTail("1", { value: 1 });
    link.addAtTail("2", { value: 2 });
    assert(link.head.next);
    assert.equal(link.head.next.value.value, 1);
    assert(link.head.next.next.value.value, 2);

    assert.equal(
      link.head.next.next.prev.value.value,
      link.head.next.value.value
    );
    assert.equal(link.head.next.next.prev.value.value, 1);
  });

  it("add three Node to tail", () => {
    var link = new Link();
    link.addAtTail("1", { value: 1 });
    link.addAtTail("2", { value: 2 });
    link.addAtTail("3", { value: 3 });
    assert.equal(link.head.next.next.next.value.value, 3);
  });

  it("add key equal '' of node", () => {
    var link = new Link();
    assert.throws(() => {
      link.addAtTail("", { value: 1 });
    });
  });
});

describe("link -> addAtHead()", () => {
  it("add one Node to Head", () => {
    let link = new Link();
    link.addAtHead("1", { value: 1 });

    assert.equal(link.head.next.value.value, 1);
  });

  it("add tow Node to Head", () => {
    let link = new Link();
    link.addAtHead("2", { value: 2 });
    link.addAtHead("1", { value: 1 });

    assert.equal(link.head.next.value.value, 1);
  });

  it("first call addAtTail() then call addAtHead()", () => {
    let link = new Link();
    link.addAtTail("2", { value: 2 });
    link.addAtHead("1", { value: 1 });

    assert.equal(link.head.next.value.value, 1);
  });

  it("add key equal '' of node", () => {
    var link = new Link();
    assert.throws(() => {
      link.addAtHead("", { value: 1 });
    });
  });
});

describe("link -> find()", () => {
  it("find node of key equal 1", () => {
    let link = new Link();
    link.addAtTail("1", { value: 1 });
    let node = link.find("1");
    assert(node);
  });

  it("find node of key equal 2", () => {
    let link = new Link();
    link.addAtTail("1", { value: 1 });
    link.addAtTail("2", { value: 2 });

    let node = link.find("1");
    assert(node);
  });

  it("not find node of not exist", () => {
    let link = new Link();
    let node = link.find("1");
    assert(!node);
  });
});

describe("link -> delete()", () => {
  it("delete node of not exist", () => {
    let link = new Link();
    assert.throws(() => {
      link.delete();
    });
  });

  it("delete one node ", () => {
    let link = new Link();
    link.addAtTail("1", { value: 1 });
    let node = link.find("1");
    link.delete(node);
    assert(!link.find("1"));
  });

  it("delete two node", () => {
    let link = new Link();
    link.addAtTail("1", { value: 1 });
    link.addAtTail("2", { value: 2 });
    let nodeA = link.find("1");
    link.delete(nodeA);
    assert(!link.find("1"));
    let nodeB = link.find("2");
    link.delete(nodeB);
    assert(!link.find("2"));
  });
});

describe("link -> deleteAtTail()", () => {
  it("delete one node", () => {
    let link = new Link();
    link.addAtTail("1", { value: 1 });

    link.deleteAtTail();
    assert(!link.find("1"));
  });

  it("delete two node", () => {
    let link = new Link();
    link.addAtTail("1", { value: 1 });
    link.addAtTail("2", { value: 2 });

    link.deleteAtTail();
    assert(!link.find("2"));
    assert(link.find("1"));
    link.deleteAtTail();
    assert(!link.find("1"));
  });
});
