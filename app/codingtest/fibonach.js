function solution(n) {
  let answer = 0;

  if (n <= 0) return 0;
  if (n < 2) return 1;

  return (solution(n - 1) + solution(n - 2)) % 1234567;
}

function solution2(n) {
  console.log("파라미터", n);

  let answer = [0, 1];
  if (n <= 0) return 0;
  if (n < 2) return 1;

  console.log("for in: ", answer[0]);
  console.log("for in: ", answer[1]);
  console.log("for in: ", answer[2]);

  for (let i = 0; i < n; i++) {
    answer.push(answer[i] + answer[i - 1]);
  }

  return answer[n - 1] % 1234567;
}

console.log(solution2(0));
console.log(solution2(1));
console.log(solution2(2));
console.log(solution2(3));
// console.log(solution2(4));
// console.log(solution2(5));
// console.log(solution2(6));
// console.log(solution2(7));
// console.log(solution2(8));
// console.log(solution2(9));
// console.log(solution2(10));
// console.log(solution2(11));
// console.log(solution2(12));
// console.log(solution2(30));
