// "/dev/stdin" 경로가 백준 사이트의 표준 입력 경로이므로 로컬에서는 작동하지 않습니다.

const fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString();
let input = fs.readFileSync("./baekjoon/ageSorting.txt").toString();
let [number, ...inputArray] = input.trim().split("\r\n");

function arrayProblem1(data) {
  let answer = [];

  for (let i = 0; i < data.length; i++) {
    const item = data[i].split(" ")[0];

    if (!answer.length) {
      answer.push(data[i]);
      continue;
    }

    const lastAge = answer[answer.length - 1].split(" ")[0];

    if (lastAge <= item) {
      answer.push(data[i]);
      continue;
    }

    // for (let j = 0; j < answer.length + 1; j++) {
    //   const answerItem = answer[j].split(" ")[0];
    //
    //   if (answerItem > item) {
    //     answer.splice(j, 0, data[i]);
    //     break;
    //   }
    // }

    let start = 0;
    let end = answer.length;
    const age = data[i].split(" ")[0];

    while (start < end) {
      const mid = Math.floor((start + end) / 2);
      const midAge = answer[mid].split(" ")[0];
      if (midAge < age) {
        start = mid;
      } else {
        end = mid;
      }
    }

    answer.splice(start, 0, data[i]);
  }

  console.log(answer.join("\n"));
}

arrayProblem1(inputArray);
