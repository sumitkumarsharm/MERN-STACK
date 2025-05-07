class Person {
  constructor(Name, Age) {
    this.Name = Name;
    this.Age = Age;
  }

  getFullName = function () {
    return `${this.Name} ${this.Age}`;
  };
}

const Obj2 = {
  fname: "Sumit",
  lName: "Sharma",
};

const p1 = new Person("Hitesh", 29);
console.log(p1.getFullName());

// how to null the prototype

// const Arr = [1, 2, 3, 4, 5, 6, 7, 8];
// Arr.__proto__ = null; //Don't do this

// Arr.push(1);
// console.log(Arr);
(function(){
  console.log("sumit");
  
})