const chaiArray = [
  "lemon tea",
  "Green tea",
  "Chamomile tea",
  "Oolong tea",
  "White tea",
  "Herbal tea",
];
// console.log(chaiArray);
// console.log(`total type of tea : ${chaiArray}`);

let index = chaiArray.indexOf("Green tea");
if (index !== -1) {
  chaiArray.splice(index, 1);
}
// console.log(chaiArray);

// // push
// chaiArray.push("Black tea");
// console.log(chaiArray);

// // pop
// chaiArray.pop();
// console.log(chaiArray);

// // shift
// chaiArray.shift();
// console.log(chaiArray);

// // unshift
// chaiArray.unshift("Chamomile tea");
// console.log(chaiArray);

const ChaiRecip = {
  Name: "Massala Chai",
  Origin: "India",
  Type: "Spiced",
  Caffeine: "High",
  Ingrident: {
    teaLeves: "Assam tea",
    milk: "Full cream Milk",
    suger: "Jaggery",
    spices: ["cardamom", "cinnamon", "clove"],
  },
  Instruction: "Boil water, add tea leaves, add spices, add milk, add suger",
};

console.log(ChaiRecip.Ingrident.spices[0]);

const UpdatedChaiRecipe = {
  ...ChaiRecip,
  Instruction:
    "Boil water, add tea leaves, add spices, add milk, add suger with some love",
};
console.log(UpdatedChaiRecipe);
