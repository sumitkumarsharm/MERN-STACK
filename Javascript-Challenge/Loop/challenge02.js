// Problem 02 : you have a basket of apples you need to count how many apples in the basket
// Dis : write the function that returns the number of apples in the basket

// You just need to implement the countApples function
function countApples(apples) {
  let count = 0;
  for (let i = 0; i < apples; i++) {
    count++;
  }

  return count;
}
console.log(countApples(19));
