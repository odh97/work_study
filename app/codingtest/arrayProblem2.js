function solution(array, commands) {
  let answer = [];

  for (let i = 0; i < commands.length; i++) {
    const data = commands[i];

    const arraySlice = array.slice(data[0] - 1, data[1]);
    const arraySliceSort = arraySlice.sort((a, b) => a - b);

    const result = arraySliceSort[data[2] - 1];
    answer.push(result);
  }
  return answer;
}

const arrayData2 = [10, 2];
const commandsData2 = [[1, 2, 1]];
console.log("log 결과 :", solution(arrayData2, commandsData2));
// 기댓값 〉 [2]

const arrayData = [1, 5, 2, 6, 3, 7, 4];
const commandsData = [
  [2, 5, 3],
  [4, 4, 1],
  [1, 7, 3],
];
console.log("log 결과 :", solution(arrayData, commandsData));
