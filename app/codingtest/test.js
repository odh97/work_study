// var isValid = function(s) {
//     let stack = [];
//     let characters ={
//         '(':')',
//         '[':']',
//         '{':'}'
//     }
//     let keys = Object.keys(characters);
//
//     for(let i = 0; i<s.length; i++) {
//         const c = s[i];
//         if(keys.includes(c)) {
//             stack.push(c);
//         }else if(characters[stack.pop()] !== c) {
//             return false;
//         }
//     }
//     return true;
// };
//
// console.log(isValid('()[{}][][][]{}[]()'));

console.log("==== start ====");
console.log(123.456);
// ()를 사용하면 Nubmer 객체로 인식한다 123.toString()은 에러가 발생한다.
// 이유는 123.toString()은 .을 소수점으로 인식하기 때문이다.
console.log((123).toString());
console.log(123);
console.log((123)[0]);
console.log((123)[""]);
// 주로 대괄호의 역할은 배열을 만들고 배열의 특정 인덱스에 접근하는 것이다.
// 대괄호의 또 다른 사용법은 객체의 속성에 접근하는 것이다.
// 객체의 속성에 접근할 때는 대괄호와 속성 이름을 함께 사용한다.
// property로 접근할 때는 대괄호를 사용하며
console.log((123)["toString"]);
console.log((123)["toString"]().length + 123);

function Parent() {
  this.age = 27; // Parent 함수 스코프 내의 public 변수
  let privateVar = "Private"; // Parent 함수 스코프 내의 private 변수

  this.getPrivateVar = function () {
    // 클로저를 통해 privateVar에 접근
    return privateVar;
  };
}

let parent = new Parent();
console.log(parent.getPrivateVar()); // "Private"
console.log(parent.privateVar); // undefined
console.log(parent.age); // 27

class Parent2 {
  constructor() {
    this.age = 27;
    let privateVar = "Private";
    this.getPrivateVar = function () {
      return privateVar;
    };
  }
}

let parent2 = new Parent2();
console.log(parent2.getPrivateVar()); // "Private"
console.log(parent2.privateVar); // undefined
console.log(parent2.age); // 27
