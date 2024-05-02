function arrayProblem1(l, r) {
  let answer = [];
  let num = "5";

  let whileToggle = true;
  // while 문은 조건이 참일 때 계속해서 반복되는 반복문이다.
  // while의 continue는 반복문의 처음으로 돌아가게 한다.
  // while의 break는 반복문을 끝내게 한다.

  while (whileToggle) {
    if (answer[answer.length - 1] < l) {
      continue;
    }
    if (answer[answer.length - 1] > r) {
      whileToggle = false;
    }

    let copy = num;
    copy.toString();

    if (answer.length === 0) {
      answer.push(copy);
    }

    num = num + "0";
    let numberFind = answer[answer.length - 1].indexOf("0");
    console.log(numberFind);
    if (numberFind < 0) {
      answer.push(num);
    }
    if (numberFind > 0) {
      let copy2 = answer[answer.length - 1];
      copy2.toString();
      copy2.replace(0, 5);
      console.log("copy2 : ", copy2);
      answer.push(copy2);
    }

    if (num === "50000") {
      break;
    }
  }

  if (!answer.length) {
    console.log("answer is empty");
    return -1;
  }

  return answer;
}

console.log(arrayProblem1(5, 555));
