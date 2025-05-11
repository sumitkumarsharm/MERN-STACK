let date = new Date();
// console.log(
//   `${date.setFullYear(2025)}-${date.setMonth(5) + 1}-${date.setDate(11)}`
// );
// console.log(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);
// console.log(date.getTime());

// Q.1
console.log(
  `${date.setFullYear(2025)}-${date.getMonth() + 1}-${date.getDate()}`
);
console.log(date.toDateString());
console.log(date.toTimeString());
console.log(date.toISOString());
