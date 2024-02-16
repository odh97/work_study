// 재귀형식
function hanoiTop(n) {
  if (n === 0) return [[]];
  if (n === 1) return [[1, 3]];

  let answer = [[]];

  return answer;
}

console.log(hanoiTop(1));
console.log(hanoiTop(2));
console.log(hanoiTop(3));
console.log(hanoiTop(4));
//
// ===1===
// 1  2 3
// 2  3
// 3
//
//
// ===2===
// x  1 1
//
// ===3===
// x  x 2
