module.exports = class LinkNode {
    constructor(key = '',value = null,prev = null, next = null) {
        this._key = key;
        this._prev = prev;
        this._next = next;
        this._value = value;
    }

    get key(){
        return this._key;
    }

    set key(key){
        return this._key = key;
    }

    get prev() {
        return this._prev;
    }

    set prev(node) {
        this._prev = node;
    }

    get next() {
        return this._next;
    }

    set next(node) {
        this._next = node
    }

    get value(){
        return this._value;
    }

    set value(value){
        this._value = value;
    }
}