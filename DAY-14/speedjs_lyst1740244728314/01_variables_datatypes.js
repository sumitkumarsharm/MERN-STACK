let name = "hitesh";
const pi = 3.14;

let number = 42.4; // Number
let text = "Hello"; //String
let isTrue = true; // Boolean
let nothing = null; // Object
let undefinedVar = undefined; // undefined
let symbolVar = Symbol(); // Symbol

let person = {
  name: "hitesh",
  age: 19,
  isStudent: true,
};

let num = "42";
// let convertedNum = Number(num);
// let convertedNum = +num;
let convertedNum = parseInt(num);

let str = 123;
let convertedString = String(str);

let a = 10;
let b = 3;

let sum = a + b;
let difference = a - b;
let product = a * b;
let quotient = a / b;
let remainder = a % b;
let power = a ** b;

let x = 10;
let y = 10;

// console.log(x == y); // Equal to
// console.log(x != y); // Not Equal to
// console.log(x > y);
// console.log(x < y);
// console.log(x <= y);

// console.log(Math.max(5, 10));
// console.log(Math.min(5, 10));

console.log(Math.random() * 10);


let firstName = "hitesh"
let lastName = "Choudhary"

let fullName = firstName + " " + lastName //hiteshchoudhary

let message = "Hello World"

console.log(message.toUpperCase());
console.log(message.indexOf("W"));
console.log(message.slice(0, 5));

let myName = "Hitesh"

let greeting = `Hello ${myName}, from chaicode`