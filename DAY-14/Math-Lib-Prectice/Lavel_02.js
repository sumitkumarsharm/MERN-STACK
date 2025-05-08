// Q6. 64 ka square root nikaalo.
let num1 = 64;
let sqrt = Math.sqrt(num1);
// console.log(sqrt);

// Q7. 3.14159 ko 2 decimal places tak round karo.
let num2 = 3.14159;
let result1 = num2.toFixed(2);
// console.log(result1);

// Q8. Math.random() ka use karke 1 se 100 ke beech ka random integer generate karo.
let num3 = Math.round(Math.random() * 100);
// console.log(num3);

// Q9. Math.trunc() ka use karke 5.9876 ka integer part nikaalo.
let num4 = 5.3434;
let result4 = Math.trunc(num4);
// console.log(result4);

// Q10. Math.sign() ka use karke -50, 0, aur 20 ke sign check karo.
console.log(Math.sign(0)); // agr negative hai to -1 hoga postive hai 1
console.log(Math.sign(-50)); // agr negative hai to -1 hoga postive hai 1
console.log(Math.sign(20)); // agr negative hai to -1 hoga postive hai 1
