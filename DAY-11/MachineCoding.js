// Problem: Create an object representing a type of tea with properties for name, type, and caffeine content.
const tea = {
  name: "Earl Grey",
  type: "Black",
  caffeineContent: "40-70 mg per cup",
};

// Problem: Access and print the name and type properties of the tea object.
console.log(tea);

// //Problem: Add a new property origin to the tea object
tea.Origin = "China";
console.log(tea);

// Problem: Change the caffeine level of the tea object to "Medium".
tea.caffeineContent = "Medium";
console.log(tea);

// /Problem: Remove the type property from the tea object.
delete tea.type;
console.log(tea);

// Problem: Check if the tea object has a property origin
for (const item in tea) {
  if (item === "Origin") {
    console.log("true");
  }
}
// Problem: Use a for...in loop to print all properties of the tea object.
for (const key in tea) {
  console.log(`${key} : ${tea[key]}`);
}
// Problem: Create a nested object representing different types of teas and their properties.
const teas = {
  name: "Earl Grey",
  type: "Black",
  caffeineContent: "40-70 mg per cup",
  AnotherTes: {
    Name: "Lemon Tea",
    Type: "Red",
    Caffined: "low",
  },
};

//Problem: Create a copy of the tea object
const CpoyTea = { ...teas };
console.log(CpoyTea);

//Problem: Add a custom method describe to the tea object that returns a description string.

// Problem: Merge two objects representing different teas into one
