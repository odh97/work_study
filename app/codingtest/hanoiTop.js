// 다시 한번 풀어보기

function solution(n) {
  const result = [];

  const hanoi = (n, from, via, to) => {
    if (n === 1) {
      result.push([from, to]);
    }
    if (n === 2) {
      result.push([from, via], [from, to], [via, to]);
      return;
    }

    hanoi(n - 1, from, to, via);
    result.push([from, to]);
    hanoi(n - 1, via, from, to);
  };

  hanoi(n, 1, 2, 3);

  return result;
}

console.log(solution(4));
