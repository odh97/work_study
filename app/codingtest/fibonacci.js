// 재귀형식
function fibonacci(n) {
  if (n <= 0) return 0;
  if (n < 2) return 1;

  return (fibonacci(n - 1) + fibonacci(n - 2)) % 1234567;
}

// 반복문 형식
function fibonacci2(n) {
  console.log("fibonacci2 start / pram:", n);

  let answer = [0, 1];
  if (n <= 0) return 0;
  if (n < 2) return 1;

  for (let i = 1; i < n; i++) {
    let num = (answer[i - 1] + answer[i]) % 1234567;
    answer.push(num);
  }

  return answer[n];
}

console.log(fibonacci2(0));
console.log(fibonacci2(1));
console.log(fibonacci2(2));
console.log(fibonacci2(3));
// console.log(fibonacci2(4));
// console.log(fibonacci2(5));
// console.log(fibonacci2(6));
// console.log(fibonacci2(7));
// console.log(fibonacci2(8));
// console.log(fibonacci2(9));
// console.log(fibonacci2(10));
// console.log(fibonacci2(11));
// console.log(fibonacci2(12));
// console.log(fibonacci2(30));
