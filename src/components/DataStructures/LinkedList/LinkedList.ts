export class Node {
  public data: number | null;
  public next: Node | null;
  public isHead:boolean;
  public isTail:boolean;
  constructor(data: number | null = null, next: Node | null = null) {
    this.data = data;
    this.next = next;
    this.isHead = false
    this.isTail = false
  }
}
export class LinkedList {
  private _head: Node;
  private _tail: Node;
  private _size: number;

  constructor() {
    this._head = this._tail = new Node();
    this._size = 0;
  }

  public get head(): Node {
    return this._head;
  }
  public get tail(): Node {
    return this._tail;
  }
  public get size(): number {
    return this._size;
  }

  public append(num: number): true {
    if (this._head.data === null) {
      this._head.data = this._tail.data = num;
    } else {
      const newNode = new Node(num);
      this._tail.next = newNode;
      this._tail = newNode;
    }
    this._size++;
    return true;
  }

  public prepend(num: number): true {
    if (this._head.data === null) {
      this._head.data = this._tail.data = num;
    } else {
      const newNode = new Node(num, this._head);
      this._head = newNode;
    }
    this._size++;
    return true;
  }

  public removeHead(): number | false {
    if (this._head.data === null) return false;

    const removed = this._head.data;
    const newHead = this._head.next;

    this._head.data = this._head.next = null;
    newHead && (this._head = newHead);

    this._size--;
    return removed;
  }

  public removeTail(): number | false {
    if (this._tail.data === null) return false;
    const removed = this._tail.data;

    let currNode = this._head;
    while (currNode.next) {
      if (currNode.next.next === null) break;
      currNode = currNode.next;
    }

    this._tail.data = currNode.next = null;
    this._tail = currNode;

    this._size--;
    return removed;
  }

  public clear(): true {
    while (this._head.data) this.removeHead();
    return true;
  }

  private _getNode(num: number): Node | null {
    if (this._tail.data === num) return this._tail;

    let currNode = this._head;
    while (currNode.next) {
      if (currNode.data === num) return currNode;
      currNode = currNode.next;
    }

    return null;
  }

  public find(num: number) {
    return this._getNode(num);
  }
  public contains(num: number): boolean {
    return !!this._getNode(num);
  }
}
