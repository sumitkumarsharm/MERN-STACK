// Problem 08 : Determine if a number is Postive, Negative or Zero
// Dis : write a function that use if-else to casify a number
function checkNumberType(num) {
  if (num === 0) {
    return "Zero";
  } else if (num < 0) {
    return "Negative";
  } else {
    return "Positive";
  }
}

console.log(checkNumberType(6));
console.log(checkNumberType(-4));
console.log(checkNumberType(0));
