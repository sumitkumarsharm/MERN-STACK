// Problem 06 : you need to determine. if a persion is Eligible to vote (age 18 or above )
// Dis : write a function that return if a persion is above 18 rerturn "Eligible" otherwise "Not Eligible"

function checkVotingEligibility(age) {
  // Return "Eligible" if age is 18 or more, otherwise return "Not Eligible"
  if (age >= 18) {
    return "Eligible";
  } else {
    return "Not Eligible";
  }
}
console.log(checkVotingEligibility(20)); // Output: Eligible
