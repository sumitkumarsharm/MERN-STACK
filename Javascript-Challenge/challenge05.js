// Problem 05 : you have given three number. Determine the Largest number among them.
// Dis : write the function that returns the Largest number among them using if-else.

function findLargest(a, b, c) {
  // Return the largest among a, b, and c
  if (a > b && a > c) {
    return a;
  } else if (b > a && b > c) {
    return b;
  } else {
    return c;
  }
}
console.log(findLargest(10, 55, 43));
