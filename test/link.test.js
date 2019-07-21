const Link = require("../lib/link");

describe("link -> addAtTail()", function() {
  it("add one Node to tail", () => {
    var link = new Link();
    link.addAtTail("1", { value: 10 });
    expect(link.head.next).toBeTruthy();
    expect(link.head.next.value.value).toBe(10);
  });

  it("add two Node to tail", () => {
    var link = new Link();
    link.addAtTail("1", { value: 1 });
    link.addAtTail("2", { value: 2 });
    expect(link.head.next).toBeTruthy();
    expect(link.head.next.value.value).toBe(1);
    expect(link.head.next.next.value.value).toBe(2);
    expect(link.head.next.next.prev.value.value).toBe(
      link.head.next.value.value
    );
    expect(link.head.next.next.prev.value.value).toBe(1);
  });

  it("add three Node to tail", () => {
    var link = new Link();
    link.addAtTail("1", { value: 1 });
    link.addAtTail("2", { value: 2 });
    link.addAtTail("3", { value: 3 });
    expect(link.head.next.next.next.value.value).toBe(3);
  });

  it("add key equal '' of node", () => {
    var link = new Link();
    expect(() => {
      link.addAtTail("", { value: 1 });
    }).toThrow();
  });
});

describe("link -> addAtHead()", () => {
  it("add one Node to Head", () => {
    let link = new Link();
    link.addAtHead("1", { value: 1 });

    expect(link.head.next.value.value).toBe(1);
  });

  it("add tow Node to Head", () => {
    let link = new Link();
    link.addAtHead("2", { value: 2 });
    link.addAtHead("1", { value: 1 });

    expect(link.head.next.value.value).toBe(1);
  });

  it("first call addAtTail() then call addAtHead()", () => {
    let link = new Link();
    link.addAtTail("2", { value: 2 });
    link.addAtHead("1", { value: 1 });

    expect(link.head.next.value.value).toBe(1);
  });

  it("add key equal '' of node", () => {
    var link = new Link();
    expect(() => {
      link.addAtHead("", { value: 1 });
    }).toThrow();
  });
});

describe("link -> find()", () => {
  it("find node of key equal 1", () => {
    let link = new Link();
    link.addAtTail("1", { value: 1 });
    let node = link.find("1");
    expect(node).toBeTruthy();
  });

  it("find node of key equal 2", () => {
    let link = new Link();
    link.addAtTail("1", { value: 1 });
    link.addAtTail("2", { value: 2 });

    let node = link.find("1");
    expect(node).toBeTruthy();
  });

  it("not find node of not exist", () => {
    let link = new Link();
    let node = link.find("1");
    expect(node).toBeUndefined();
  });
});

describe("link -> delete()", () => {
  it("delete node of not exist", () => {
    let link = new Link();
    expect(() => {
      link.delete();
    }).toThrow();
  });

  it("delete one node ", () => {
    let link = new Link();
    link.addAtTail("1", { value: 1 });
    let node = link.find("1");
    link.delete(node);
    expect(link.find("1")).toBeUndefined();
  });

  it("delete two node", () => {
    let link = new Link();
    link.addAtTail("1", { value: 1 });
    link.addAtTail("2", { value: 2 });
    let nodeA = link.find("1");
    link.delete(nodeA);
    expect(link.find("1")).toBeUndefined();
    let nodeB = link.find("2");
    link.delete(nodeB);
    expect(link.find("2")).toBeUndefined();
  });
});

describe("link -> deleteAtTail()", () => {
  it("delete one node", () => {
    let link = new Link();
    link.addAtTail("1", { value: 1 });

    link.deleteAtTail();
    expect(link.find("1")).toBeUndefined();
  });

  it("delete two node", () => {
    let link = new Link();
    link.addAtTail("1", { value: 1 });
    link.addAtTail("2", { value: 2 });

    link.deleteAtTail();
    expect(link.find("2")).toBeUndefined();
    expect(link.find("1")).toBeTruthy();
    link.deleteAtTail();
    expect(link.find("1")).toBeUndefined();
  });
});
