// Ek customer ne chai order ki agr chai masala chai hai to massala add kro or chai do wrna regular chai de do
// function OrderPlease(Type) {
//   //   console.log(Type.toLowerCase());
//   if (Type.toLowerCase() === "masala chai") {
//     console.log("Add massala Please");
//   } else {
//     console.log("Regular tea de do");
//   }
// }
// OrderPlease("Masala Chai");
// OrderPlease("Chai");

// Ek store hai koi coustomer aaya hai agr uska shopping bill 1000 se jayada ho gai to 10% ka discount do agr nhi hua to usko Pura amount pay krna hoga

function checkDiscount(bill) {
  if (bill > 1000) {
    return;
  } else {
    return "Pay full bill";
  }
}
console.log(checkDiscount(10000));

// check truthy value using function
// check password and username and loginIp is same or not
