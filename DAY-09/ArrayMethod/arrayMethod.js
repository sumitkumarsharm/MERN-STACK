// how to create An Array in js
// 1. Using Array Literal
// 2. Using Array Constructor
// -----------------------------------------------

// // 2. Using Array Constructor
// const BjpLeadersName = new Array(
//   "Narendra Modi",
//   "Amit Shah",
//   "Rajnath Singh",
//   "Nitin Gadkari",
//   "Yogi Adityanath",
//   "JP Nadda",
//   "Nirmala Sitharaman",
//   "Dr Subrahmanyam Jaishankar",
//   "Shivraj Singh Chouhan",
//   " Piyush Goyal"
// );
// console.log(bjpLeaders);
// console.log(BjpLeadersName);

// isko add krna hai veere niche -------------------------------------------------------------------------------------------------------

// bjpLeaders.forEach((SinglebjpLeaders,index) => {
//   if (SinglebjpLeaders === "Nirmala Sitharaman") {
//     console.log(`Nirmala Sitharaman ke Upar Chalan banao 101 rupye ka ${SinglebjpLeaders}`);
//   }
// });

// here lets console the inddex wise ledersName
// bjpLeaders.forEach((SinglebjpLeaders, index) => {
//   console.log(`Index ${index} : ${SinglebjpLeaders}`);
// });

// 1. Using Array Literal
const bjpLeaders = [
  "Narendra Modi",
  "Amit Shah",
  "Rajnath Singh",
  "Nitin Gadkari",
  "Yogi Adityanath",
  "JP Nadda",
  "Nirmala Sitharaman",
  "Dr Subrahmanyam Jaishankar",
  "Shivraj Singh Chouhan",
  " Piyush Goyal",
];

const bjpLeadersName = bjpLeaders.map((singleLeders) => {
  return singleLeders + " is a BJP Leader";
});
console.log(bjpLeadersName);
