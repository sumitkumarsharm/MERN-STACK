// Problem 07: give a number form 1 to 7 and return the crosponding day of the week;
// Dis: write a function that takes a number from 1 to 7 and returns the corresponding day of the week.

function getDayOfWeek(day) {
  // Return the corresponding day of the week based on the input number
  switch (day) {
    case 1:
      return "Monday";
      break;
    case 2:
      return "Tuesday";
      break;
    case 3:
      return "Wednesday";
      break;
    case 4:
      return "Thursday";
      break;
    case 5:
      return "Friday";
      break;
    case 6:
      return "Saturday";
      break;
    case 7:
      return "Sunday";
      break;
    default:
      return "Invalid input. Please enter a number between 1 and 7.";
  }
}
console.log(getDayOfWeek(5)); // Output: Wednesday
