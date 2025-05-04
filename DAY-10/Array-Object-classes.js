const StudentProfile = {
  firstName: "Sumit",
  lastName: "Sharma",
  age: 24,
  hobbies: ["Reading", "Travelling", "Coding"],
  isStudent: true,
  address: {
    city: "bhopal",
    state: "Madhya Pradesh",
    pinCode: 462022,
    country: "India",
  },
  getFullName: function () {
    return `${this.firstName} ${this.lastName}`;
  },
};

// this is called Shallow copy becasue it copy only the object not nested object
const Profile = {
  ...StudentProfile,
};
// console.log(Profile);
// console.log(StudentProfile);

// lets create a deep copy then we have some method to do that.
let profile2 = JSON.stringify(StudentProfile);
console.log(profile2);
profile2 = JSON.parse(profile2);
console.log(profile2);
profile2.address.city = "Siwan";

console.log(profile2.address.city);
console.log(Profile.address.city);

// create a function that conver the non-primitive to primitive
function converToPrimitive(data) {
  return JSON.parse(JSON.stringify(data));
}
console.log(converToPrimitive(StudentProfile));
