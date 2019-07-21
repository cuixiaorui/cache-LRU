const CacheLRU = require("../lib/cache-lru.js");
let Link = require("../lib/link");
jest.mock("../lib/link");

describe("cache-lru", () => {
  describe("constructor", () => {
    it("link is exist", () => {
      let lru = new CacheLRU();
      expect(lru._link).toBeTruthy();
    });

    it("maxSize is 10", () => {
      let lru = new CacheLRU();

      expect(lru._maxSize).toBe(10);
    });

    it("maxSize is 20", () => {
      const maxSize = 20;
      let lru = new CacheLRU(maxSize);
      expect(lru._maxSize).toBe(maxSize);
    });

    it("size is 0", () => {
      let lru = new CacheLRU();
      expect(lru._size).toBe(0);
    });
  });

  describe("isFull()", () => {
    it("if size >= maxSize ,return true", () => {
      let lru = new CacheLRU();
      lru._size = 10;
      lru._maxSize = 10;
      expect(lru.isFull()).toBe(true);

      lru._maxSize = 9;
      expect(lru.isFull()).toBe(true);
    });

    it("if size < maxSize , return false", () => {
      let lru = new CacheLRU();
      lru._size = 9;
      lru._maxSize = 10;
      expect(lru.isFull()).toBe(false);
    });
  });

  describe("set()", () => {
    it("node is exist", () => {
      let findFn = Link.prototype.find.mockReturnValue(true);
      let deleteFn = Link.prototype.delete.mockReturnValue(true);
      let addAtHead = Link.prototype.addAtHead.mockReturnValue(true);
      let lru = new CacheLRU();
      console.log(lru.set);
      lru.set("1", 1);

      expect(findFn.mock.calls.length).toBe(1);
      expect(deleteFn.mock.calls.length).toBe(1);
      expect(addAtHead.mock.calls.length).toBe(1);

      expect(findFn).toBeCalledWith("1");
      expect(deleteFn).toBeCalledWith(true);
      expect(addAtHead).toBeCalledWith("1", 1);
    });

    it("node is not exist and size is fulled", () => {
      let findFn = Link.prototype.find.mockReturnValue(false);
      let isFull = (CacheLRU.prototype.isFull = jest.fn(() => true));
      let deleteAtTail = Link.prototype.deleteAtTail.mockReturnValue(true);
      let addAtHead = Link.prototype.addAtHead.mockReturnValue();

      let lru = new CacheLRU();
      lru.set("1", 1);
      expect(findFn).toBeCalled();
      expect(isFull).toBeCalled();
      expect(deleteAtTail).toBeCalled();
      expect(addAtHead).toBeCalled();

      expect(addAtHead).toBeCalledWith("1", 1);
    });

    it("node is not exist and size is not fulled", () => {
      let findFn = Link.prototype.find.mockReturnValue(false);
      let isFull = (CacheLRU.prototype.isFull = jest.fn(() => false));
      let addAtHead = Link.prototype.addAtHead.mockReturnValue();

      let lru = new CacheLRU();
      lru.set("1", 1);

      expect(findFn).toBeCalled();
      expect(isFull).toBeCalled();
      expect(addAtHead).toBeCalled();
      expect(lru._size).toBe(1);
      expect(addAtHead).toBeCalledWith("1", 1);
    });
  });

  describe("get()", () => {
    it("node is exist", () => {
      let node = { value: 1 };
      let findFn = Link.prototype.find.mockReturnValue(node);
      let deleteFn = Link.prototype.delete.mockReturnValue();
      let addAtHeadFn = Link.prototype.addAtHead.mockReturnValue();

      let lru = new CacheLRU();
      lru.get("1");

      expect(findFn).toBeCalled();
      expect(deleteFn).toBeCalled();
      expect(addAtHeadFn).toBeCalled();

      expect(findFn).toBeCalledWith("1");
      expect(deleteFn).toBeCalledWith(node);
      expect(addAtHeadFn).toBeCalledWith("1", node.value);
    });

    it("node is not exist", () => {
      Link.prototype.find.mockReturnValue(undefined);
      let lru = new CacheLRU();
      expect(lru.get("2")).toBeUndefined();
    });
  });
});
