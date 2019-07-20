const assert = require("assert");
const CacheLRU = require("../lib/cache-lru.js");
describe("cache-lru", () => {
  describe("constructor", () => {
    it("link is exist", () => {
      let lru = new CacheLRU();
      assert(lru._link);
    });

    it("maxSize is 10", () => {
      let lru = new CacheLRU();
      assert.equal(lru._maxSize, 10);
    });

    it("maxSize is 20", () => {
      let lru = new CacheLRU(20);
      assert.equal(lru._maxSize, 20);
    });

    it("size is 0", () => {
      let lru = new CacheLRU();
      assert.equal(lru._size, 0);
    });
  });

  describe("set()", () => {
    it("node is exist", () => {
      let lru = new CacheLRU();
    });
  });
});
