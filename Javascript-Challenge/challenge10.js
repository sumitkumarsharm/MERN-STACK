// let n = 4;
// let str = "*";
// let result = "";
// for (let i = n; i > 0; i--) {
//   for (let j = 0; j < i; j++) {
//     result += str;
//   }
//   result += "\n";
// }
// console.log(result);

// i don't want print after the end of the line
function printStar(n) {
  let result = "";
  for (let i = n; i >= 1; i--) {
    for (let j = 1; j <= i; j++) {
      result += "*";
    }
    result += "\n";
  }
  return result;
}

console.log(printStar(4));
