// Problem 09 : give a temprature and a scale (C, F),convert it to the Other scale
// Dis : write the function that use switch-case to convert the temprature

function convertTemperature(temp, scale) {
  switch (scale) {
    case "C":
      return (temp * 9) / 5 + 32; // Convert Celsius to Fahrenheit
    case "F":
      return ((temp - 32) * 5) / 9; // Convert Fahrenheit to Celsius
    default:
      return "Invalid scale";
  }
}
