// Linked list

const data = {
  head: {
    value: 6,
    next: {
      value: 10,
      next: {
        value: 12,
        next: {
          value: 3,
          next: null,
        },
      },
    },
  },
};

class ListNode {
  data;
  next;

  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  head;

  constructor(head = null) {
    this.head = head;
  }

  addNode(num) {
    let node = new ListNode(num);
    let current;

    if (this.head == null) {
      this.head = node;
    } else {
      current = this.head;

      while (current.next) {
        current = current.next;
      }

      current.next = node;
    }
  }
}

let node1 = new ListNode(2);
let node2 = new ListNode(5);

// 다음 링크 노드를 연결
node1.next = node2;

let list = new LinkedList(node1);

console.info(list.head.next);
