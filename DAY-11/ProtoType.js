Array.prototype.Sumit = function (a, b) {
  return a + b;
};

const Arr = [1, 2, 3, 4, 6];
const result = Arr.Sumit(1, 4);
console.log(result);

// creating our own PollyFill like forEach
if (!Array.prototype.myForEach) {
  Array.prototype.myForEach = function (callback) {
    let OriginalArr = this;
    for (let i = 0; i < OriginalArr.length; i++) {
      callback(OriginalArr[i], i);
    }
  };
}

// this is my myMap function
if (!Array.prototype.MyMap) {
  Array.prototype.MyMap = function (callback) {
    let resultArr = [];
    for (let i = 0; i < this.length; i++) {
      const value = callback(this[i], i);
      resultArr.push(value);
    }
    return resultArr;
  };
}

let Arr2 = [1, 2, 3, 4, 5, 67];
const result3 = Arr2.MyMap(function (item) {
  return item * 5;
});

console.log(result3);

// Push method polyFills
// itm liya array me bhej diya
// usi item ko retun bhi kta hai
let Arrs = [1];
// const items = Arrs.push(2);
// console.log(items); // 2

// Own Pollyfills
if (!Array.prototype.myPush) {
  Array.prototype.myPush = function (...cb) {
    let len = this.length;
    for (let i = 0; i < cb.length; i++) {
      this[len] = cb[i];
      len++;
    }
    return len;
  };
}

Arrs.myPush(2, 3, 5, 7, 89);
console.log(Arrs);
