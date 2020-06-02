// Fake Cat
// Without calling the Cat constructor, create an object that looks and acts like a Cat instance that doesn't have a defined name.

class Cat {
  constructor(name) {
    this.name = name;
  }
  speaks() {
    return `${this.name} says meowwww.`;
  }
}

let fakeCat = Object.create(Cat.prototype); // your implementation
console.log(fakeCat instanceof Cat); // logs true
console.log(fakeCat.name);           // logs undefined
console.log(fakeCat.speaks());       // logs undefined says meowwww.

// Object.create uses an exisiting object - Cat.prototype as the prototype of newly created object fakeCat
