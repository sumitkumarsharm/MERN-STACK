// // Problem: create an array containing different types of teas.
const teas = [
  "Green Tea",
  "Black Tea",
  "Oolong Tea",
  "White Tea",
  "Herbal aaTea",
];
// console.log(teas);

// Problem: Add "Chamomile Tea" to the existing array of teas.
teas.push("Chamomile Tea");
console.log(teas);
// Problem: Remove "Olang Tea" from the list of array od teas
teas.splice(teas.indexOf("Oolong Tea"), 1);
console.log(teas);
// Problem: filter the list to only include teas that are cafiniated
const aa = teas.filter((teas) => {
  if (teas.includes("Herbal Tea")) {
    return teas;
  }
});
console.log(aa);
// Problem: sort the list of teas in alphabetical order
teas.sort();
console.log(teas);
let UpdatedArray = [];
// Problem: use a for loop to print each type of tea in the array
for (let i = 0; i < teas.length; i++) {
  UpdatedArray.push(teas[i]);
}
console.log(UpdatedArray);

// Problem: use a for loop to count how many teas are cafinated
let count = 0;
for (let i = 0; i < teas.length; i++) {
  if (teas[i].includes("Herbal Tea")) {
  } else {
    count++;
  }
}
console.log(count);

// Problem : use a for loop to create a new array with all teas name isn uppercase
let upperCaseArray = [];
for (let i = 0; i < teas.length; i++) {
  upperCaseArray.push(teas[i].toUpperCase());
}
console.log(upperCaseArray);
// Problem: use a for loop to find the teas name with the most characters.
let max = "";
for (let i = 0; i < teas.length; i++) {
  let current = teas[i];

  if (current.length > max.length) {
    max = current;
  }
}
console.log(max);

// Problem: use a for loop to reverse the teas in the array.
let reversArray = [];
for (let i = teas.length - 1; i >= 0; i--) {
  reversArray.push(teas[i]);
}
console.log(reversArray);
