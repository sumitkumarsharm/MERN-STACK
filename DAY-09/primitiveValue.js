// // Data Type and Processing
// // why we need to learn type and processing of data
// // 1. To understand the data type and how to process it
// //  we want to check emial is valid or not and we want to convert any name to upper case or lower case

// // Data Type
// let Name = "Sumit"; //  let se banaye huye variable ko ham chnage kr skte hai
// let Age = 24;
// let isPaid = true;
// let favouriteClass = null; // null is a special value which means no value
// let homeTown; // undefined is a special value which means we dosn't know the value yet
// let skills = ["HTML", "CSS", "JavaScript"]; // array is a collection of datas

// let student = {
//   name: "Sumit",
//   age: 24,
//   isPaid: true,
//   favouriteClass: null,
//   homeTown: undefined,
//   skills: ["HTML", "CSS", "JavaScript"],
// };

// // conditional Statment
// // several call ranny cloudy and sunny
// let weather = "Sunny";
// if (weather === "Sunny") {
//   console.log("Go to the park");
// } else if (weather === "Rainy") {
//   console.log("Don't go without umbralla");
// } else {
//   console.log("Go to the park and take umbralla with you");
// }

// // Processing

// // valadation of Email

// const email = "Sumit134@gmail.com";
// if (
//   email.includes("@") &&
//   email.includes("gmail.com") &&
//   email.includes(1, 2, 3, 4, 5, 6, 7, 8, 9, 0)
// ) {
//   console.log("Valid Emial");
// } else {
//   console.log("Invalid Email");
// }

// // Number of guest and order Pizza for them

// let numberGuest = 5;
// let pizzSize;
// // Statment : small <= 2, medium <=5, large
// if (numberGuest <= 0) {
//   pizzSize = "Bhai koi nhi Aaya Order mat kr";
// } else if (numberGuest <= 2) {
//   pizzSize = "Small";
// } else if (numberGuest <= 5) {
//   pizzSize = "Medium";
// } else {
//   pizzSize = "Large or Order multipal Pizza";
// }

// console.log(pizzSize);

// I want to Print. the marks of students
// marks > 90 = A+
// marks > 80 = A
// marks > 70 = B+
// marks > 60 = B
// marks > 50 = C+
// marks > 40 = C
// marks < 40 = fail
let marks = 90;

function showResult(marks) {
  if (marks > 90) {
    return "A+";
  } else if (marks > 80 && marks <= 90) {
    return "A";
  } else if (marks > 70 && marks <= 80) {
    return "B+";
  } else if (marks > 60 && marks <= 70) {
    return "B";
  } else if (marks > 50 && marks <= 60) {
    return "C+";
  } else {
    return "Fail";
  }
}
console.log(showResult(marks));

// checking type of data
console.log(typeof marks); // number
console.log(typeof showResult); // function
console.log(typeof "Sumit"); // string
console.log(typeof true); // boolean
console.log(typeof null); // object
console.log(typeof undefined); // undefined
console.log(typeof []); // object
console.log(typeof {}); // object
console.log(typeof NaN); // number
console.log(typeof Infinity); // number
console.log(typeof -Infinity); // number
console.log(typeof BigInt(12345678901234567890)); // bigint
