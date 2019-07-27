<h1 align="center">Welcome to cache-LRU 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
</p>

> 高效的缓存淘汰策略（LRU）
> 使用 hashMap + double linked list 实现所有操作时间复杂度为 O(1) 的 LRU

## Install

```sh
npm install cache-LRU
```

## API

### new CacheLRU(maxSize:number = 10)

构造函数
maxSize 默认值为 10

### set(key:string,value:any)

设置缓存的数据

### get(key:string)

获取缓存的数据

### keys()

同 array.keys()

### values()

同 array.values()

### forEach(callback:Function)

按照缓存的顺序遍历

## Example

```js
let lru = new CacheLRU();

lru.set("1", { value: 1 });
lru.set("2", { value: 2 });
lru.set("3", { value: 3 });
lru.set("4", { value: 4 });
lru.set("5", { value: 5 });

//[ '5', { value: 5 } ] [ '4', { value: 4 } ] [ '3', { value: 3 } ] [ '2', { value: 2 } ] [ '1', { value: 1 } ]
console.log(...lru.entries());
```

```js
//设置最大的缓存数
//最早的数据被抛弃掉
let lru = new CacheLRU(5);
lru.set("1", { value: 1 });
lru.set("2", { value: 2 });
lru.set("3", { value: 3 });
lru.set("4", { value: 4 });
lru.set("5", { value: 5 });
lru.set("6", { value: 6 });

// {value:6},{value:5},{value:4},{value:3},{value:2},
console.log(...lru.values());
```

```js
 // get 之后数据被放到最前面
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
```

```js
// forEach()
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
```

## Run tests

```sh
npm run test
```

## Author

👤 **cuixiaorui**

- Github: [@cuixiaorui](https://github.com/cuixiaorui)

## Show your support

Give a ⭐️ if this project helped you!

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
