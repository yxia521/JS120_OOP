/*

Walk The Cat
Using the following code, create a mixin named walkMixin that contains a method named walk. 
This method should return Let's go for a walk! when invoked. 
Include walkMixin in Cat and invoke walk on kitty.

*/

class Cat {
  constructor(name) {
    this.name = name;
  }

  greet() {
    return `Hello! My name is ${this.name}!`;
  }
}

const walkMixin = {
  walk() {
    return "Let's go for a walk!";
  }
};

Object.assign(Cat.prototype, walkMixin); // Note we add walkMixin to the PROTOTYPE object of class Cat

let kitty = new Cat("Sophie");
console.log(kitty.greet());
console.log(kitty.walk());

/*
Expected output:

Hello! My name is Sophie!
Let's go for a walk!

------- ls sol --------

class Cat {
  constructor(name) {
    this.name = name;
    Object.assign(this, walkMixin);      // different than mine
  }

  greet() {
    return `Hello! My name is ${this.name}!`;
  }
}

*/

