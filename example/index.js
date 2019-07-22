const CacheLRU = require("../lib/index");

/**
 * 默认最大缓存数为10
 */
function example1() {
  let lru = new CacheLRU();

  lru.set("1", { value: 1 });
  lru.set("2", { value: 2 });
  lru.set("3", { value: 3 });
  lru.set("4", { value: 4 });
  lru.set("5", { value: 5 });

  //[ '5', { value: 5 } ] [ '4', { value: 4 } ] [ '3', { value: 3 } ] [ '2', { value: 2 } ] [ '1', { value: 1 } ]
  console.log(...lru.entries());
}

example1();

/**
 * 设置最大的缓存数
 * 最早的数据被抛弃掉
 */
function example2() {
  let lru = new CacheLRU(5);
  lru.set("1", { value: 1 });
  lru.set("2", { value: 2 });
  lru.set("3", { value: 3 });
  lru.set("4", { value: 4 });
  lru.set("5", { value: 5 });
  lru.set("6", { value: 6 });

  // {value:6},{value:5},{value:4},{value:3},{value:2},
  console.log(...lru.values());
}
example2();

/**
 * get 之后数据被放到最前面
 */
function example3() {
  let lru = new CacheLRU();
  lru.set("1", { value: 1 });
  lru.set("2", { value: 2 });
  lru.set("3", { value: 3 });
  lru.set("4", { value: 4 });
  lru.set("5", { value: 5 });

  lru.get("2");
  // 2,5,4,3,1
  console.log(...lru.keys());
}
example3();

/**
 * forEach
 */
function example4() {
  let lru = new CacheLRU();
  lru.set("1", { value: 1 });
  lru.set("2", { value: 2 });
  lru.set("3", { value: 3 });
  lru.set("4", { value: 4 });
  lru.set("5", { value: 5 });

  lru.get("2");
  lru.forEach(node => {
    console.log(node.key);
  });
}

example4();
