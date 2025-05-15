// function greet(name) {
//   //   console.log(`Hello, ${name}`);
// }
// greet("Sumit");
// greet("Ajay");

// let globelScope = "I am Golbal";
// function modifyGlobal() {
//   globelScope = "I am modified";
//   let scopeVariable = "I am block-scope variable";
//   console.log(scopeVariable);
// }

// // modifyGlobal();

const person1 = {
  name: "Sumit",
  age: 22,
  greet: function () {
    console.log(
      `Hello, my name is ${this.name} and I am ${this.age} years old`
    );
  },
};

const person2 = {
  name: "Ajay",
  age: 20,
};
person1.call(person2.greet());
person1.greet.bind(person1);

// read about  Call bind and Apply

// 1st
const user1 = {
  name: "Ravi",
};

function sayHello() {
  console.log("Hello, " + this.name);
}

sayHello.call(user1); // output Hello, Ravi

// 2nd
const person3 = { name: "Rahul" };

function welcome() {
  console.log("Welcome, ");
}

welcome.call(); //welcome

// 3rd
const obj1 = { name: "Aman" };
const obj2 = { name: "Neha" };

function greet(message) {
  console.log(message + ", " + this.name);
}

greet.call(obj2, "Good Morning"); //output  Good Morning neha

// 4th
const car = {
  brand: "Toyota",
};

function showBrand(model) {
  console.log(`Brand: ${this.brand}, Model: ${model}`);
}

showBrand.call(car, "Innova"); // Toyata innova

// 5th
function showInfo(age, city) {
  console.log(`${this.name} is ${age} years old and lives in ${city}.`);
}

const person = { name: "Karan" };

showInfo.call(person, 25, "Delhi"); // karan is 25 year old and lives in Delhi

const person4 = {
  name: "Riya",
  greet: function () {
    console.log("Hello, " + this.name);
  },
};

const person5 = { name: "Simran" };

// Borrow greet method from person1 using call
// 👇 Yahan kya likhoge?
person4.greet.call(person5); // Hello. Simran

function info(city, country) {
  console.log(`${this.name} lives in ${city}, ${country}.`);
}

const user = { name: "Kabir" };

info.call(user, "Mumbai", "India"); // Output: Kabir lives in Mumbai, India

const Arr = [1, 2, 3, 4, 5, 7, 8];
Arr.push(56);
console.log(Arr);

setTimeout(() => {
  console.log("sumit");
}, 2000);
