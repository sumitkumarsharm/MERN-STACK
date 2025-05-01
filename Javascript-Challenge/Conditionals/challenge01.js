// Problem 04 : you are given anumber you need to determine that number is Even or odd
// Dis : create a function that return true if number is even otherwise false
function checkEvenOdd(num) {
  // Return "Even" if num is even, otherwise return "Odd"
  if (num % 2 === 0) {
    return "Even";
  } else {
    return "Odd";
  }
}
console.log(checkEvenOdd(5));
